import {Request, Response} from "express";
import {INeighborhoodFilter, INeighborhoodQueries} from "../defines";
import Neighborhood, {IDBNeighborhoodDTO, INeighborhoodOutDTO, NeighborhoodDTOConverter} from "../models/Neighborhood";

export class NeighborhoodController {
    public static async getNeighborhoodsAsync(req: Request<{}, {}, {}, INeighborhoodQueries>, res: Response<{
        data: INeighborhoodOutDTO[],
        meta: {
            total: number,
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
                    total: total,
                    page: Number(page),
                    limit: Number(limit),
                },
            });
        } catch (error: any) {
            res.status(500).json({message: error?.message ?? 'An error occurred'});
        }
    }
}