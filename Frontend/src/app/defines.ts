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

export interface IFilters {
  minAge: number;
  maxAge: number;
  minDistance: number;
  maxDistance: number ;
}
