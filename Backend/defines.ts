import {IBasicNeighborhoodDTO} from "./models/Neighborhood";

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

export interface INeighborhoodFilter {
    distanceFromCityCenter?: {
        $gte?: number;
        $lte?: number;
    };
    averageAge?: {
        $gte?: number;
        $lte?: number;
    };
}


