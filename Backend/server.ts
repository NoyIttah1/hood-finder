import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Neighborhood from "./models/Neighborhood";

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

app.get('/neighborhoods', async (req: Request, res: Response) => {
    try {
        const neighborhoods = await Neighborhood.find();
        res.json(neighborhoods);
    } catch (error) {
        console.error('Error fetching neighborhoods:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Start server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
