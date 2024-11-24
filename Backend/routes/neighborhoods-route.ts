import  { Request, Response } from 'express';
import * as express from 'express';
import Neighborhood from '../models/Neighborhood'; // Import the model

const neighborhoodsRouter = express.Router();

// Fetch the list of neighborhoods
neighborhoodsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const neighborhoods = await Neighborhood.find({});
        res.json(neighborhoods);
    } catch (error) {
        console.error('Error fetching neighborhoods:', error);
        res.status(500).json({ message: 'Failed to fetch neighborhoods' });
    }
});

export default neighborhoodsRouter;
