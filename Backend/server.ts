import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import neighborhoodsRouter from "./routes/neighborhoods-route";


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const MONGO_URL = 'mongodb://localhost:27017/noy';

mongoose.connect(MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

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

app.use (neighborhoodsRouter);
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));



