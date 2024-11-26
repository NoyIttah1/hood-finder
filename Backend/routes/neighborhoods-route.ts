import {NextFunction, Request, Response} from 'express';
import * as express from 'express';
import { NeighborhoodController } from '../controllers/neighborhoods-controller';

 const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) =>
        Promise.resolve(fn(req, res, next)).catch(next);

const neighborhoodsRouter = express.Router();

neighborhoodsRouter.get(
    '/neighborhoods',
    asyncHandler(async (req: Request, res: Response) => {
        await NeighborhoodController.getNeighborhoodsAsync(req, res); // Static call
    })
);

export default neighborhoodsRouter;
