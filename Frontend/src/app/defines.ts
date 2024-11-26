export interface INeighborhood {
  neighborhood: string;
  city: string;
  averageAge?: number;
  distanceFromCityCenter?: number;
  averageIncome?: number;
  publicTransportAvailability?: string;
  latitude: number;
  longitude: number;
}

export type SortOrder = 'asc' | 'dsc';

export interface INeighborhoodFilters {
  minAge?: number;
  maxAge?: number;
  minDistance?: number;
  maxDistance?: number;
  sortField?: keyof INeighborhood;
  sortOrder?: SortOrder;
  limit?: number;
  page?: number;
}

export interface  INeighborhoodMetaData {
  meta: {
    total:number,
    page: number,
    limit: number
  }
}

export interface  INeighborhoodResponse extends INeighborhoodMetaData {
  data: INeighborhood[],
}
