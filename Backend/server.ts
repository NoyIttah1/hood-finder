import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Neighborhood, {
    IBasicNeighborhoodDTO,
    IDBNeighborhoodDTO,
    INeighborhoodOutDTO,
    NeighborhoodDTOConverter
} from "./models/Neighborhood";

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) =>
        Promise.resolve(fn(req, res, next)).catch(next);
export interface INeighborhoodQueries {
    minAge?: number;
    maxAge?: number;
    minDistance?: number;
    maxDistance?: number;
    sortField?: keyof IBasicNeighborhoodDTO;
    sortOrder?: 'asc' | 'dsc';
    limit?: number;
    page?: number;
}

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URL = 'mongodb://localhost:27017/noy';

mongoose.connect(MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
// Routes
// app.get('/', (req: Request, res: Response) => {
//     res.send('Backend server is running');
// });
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('******* Begin Error *******');
    console.error(err.stack || err.message);
    console.error('******* End Error *******');

    if (res.headersSent) {
        return next(err);
    }

    res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
});

app.get(
    '/neighborhoods',
    asyncHandler(async (req: Request, res: Response) => {
        await getNeighborhoodsAsync(req, res);
        return;
    })
);
// Global error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.stack || err.message);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});
// Start server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

interface INeighborhoodFilter {
    distanceFromCityCenter?: {
        $gte?: number;
        $lte?: number;
    };
    averageAge?: {
        $gte?: number;
        $lte?: number;
    };
    // Add other potential fields if needed
}

async function getNeighborhoodsAsync(req: Request<{}, {}, {}, INeighborhoodQueries>, res: Response<{
    data: INeighborhoodOutDTO[],
    meta: {
        total:number,
        page: number,
        limit: number
    }
} | { message: string }>) {
    const {minDistance, maxDistance, minAge, maxAge} = req.query;
    let {sortField, sortOrder, limit = 20, page = 1} = req.query;

    // Set default values for sortField and sortOrder
    if (!sortField) {
        sortField = 'neighborhood';
    }
    if (!sortOrder) {
        sortOrder = 'asc';
    }

    try {
        // Build the filter query with a specific type
        const filter: INeighborhoodFilter = {};

        if (minDistance !== undefined) {
            filter.distanceFromCityCenter = {
                ...filter.distanceFromCityCenter,
                $gte: Number(minDistance),
            };
        }
        if (maxDistance !== undefined) {
            filter.distanceFromCityCenter = {
                ...filter.distanceFromCityCenter,
                $lte: Number(maxDistance),
            };
        }
        if (minAge !== undefined) {
            filter.averageAge = {
                ...filter.averageAge,
                $gte: Number(minAge),
            };
        }
        if (maxAge !== undefined) {
            filter.averageAge = {
                ...filter.averageAge,
                $lte: Number(maxAge),
            };
        }
        // Build sorting object
        const sort: Record<string, 1 | -1> = {};
        sort[sortField] = sortOrder === 'asc' ? 1 : -1;

        // Handle pagination
        const skip = (Number(page) - 1) * Number(limit);

        const [neighborhoods, total] = await Promise.all([
            Neighborhood.find(filter)
                .sort(sort)
                .limit(Number(limit))
                .skip(skip)
                .lean<IDBNeighborhoodDTO[]>()
                .exec(),
            Neighborhood.countDocuments(filter) // Total count considering filters
        ]);
            const outNeighborhoods: INeighborhoodOutDTO[] = [];
            for (const neighborhood of neighborhoods) {
                if (!neighborhood) continue;

            const outNeigh = NeighborhoodDTOConverter.convertFromDBToOut(neighborhood);
            outNeighborhoods.push(outNeigh);
        }

        res.status(200).json({
            data: outNeighborhoods,
            meta: {
                total:total,
                page: Number(page),
                limit: Number(limit),
            },
        });
    } catch (error: any) {
        res.status(500).json({message: error?.message ?? 'An error occurred'});
    }
}