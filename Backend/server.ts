import express, {Request, Response} from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Neighborhood, {
    IBasicNeighborhoodDTO,
    IDBNeighborhoodDTO,
    INeighborhoodOutDTO,
    NeighborhoodDTOConverter
} from "./models/Neighborhood";

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

app.get('/neighborhoods', async (req: Request<{}, {}, {}, INeighborhoodQueries>, res: Response) => {
    await getNeighborhoodsAsync(req, res);
    return;
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

        // Query the database
        const neighborhoods = await Neighborhood.find(filter)
            .sort(sort) // Apply sorting
            .limit(Number(limit)) // Limit the number of results
            .skip(skip)
            .lean<IDBNeighborhoodDTO[]>().exec(); // Skip documents for pagination
        const outNeighborhoods: INeighborhoodOutDTO[] = [];
        for (const neighborhood of neighborhoods) {
            if (!neighborhood) continue;

            const outNeigh = NeighborhoodDTOConverter.convertFromDBToOut(neighborhood);
            outNeighborhoods.push(outNeigh);
        }

        const total = await Neighborhood.countDocuments(filter);
        res.status(200).json({
            data: outNeighborhoods,
            meta: {
                total:total,
                currentPage: Number(page),
                limit: Number(limit),
            },
        });
    } catch (error: any) {
        res.status(500).json({message: error?.message ?? 'An error occurred'});
    }


}