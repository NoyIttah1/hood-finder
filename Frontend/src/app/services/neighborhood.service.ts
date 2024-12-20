import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {INeighborhood, INeighborhoodFilters, INeighborhoodResponse} from "../defines";

@Injectable({
  providedIn: 'root',
})
export class NeighborhoodService {
  private readonly apiUrl = 'http://localhost:3000/neighborhoods';

  constructor(private http: HttpClient) {
  }


  getNeighborhoods$(queryParams: INeighborhoodFilters) {
    const httpParams = new HttpParams({fromObject: queryParams as any});

    return this.http.get<
      INeighborhoodResponse
    >(this.apiUrl, {
      params: httpParams
    });
  }
}
