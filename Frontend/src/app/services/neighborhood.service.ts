import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {INeighborhood} from "../defines";

@Injectable({
  providedIn: 'root',
})
export class NeighborhoodService {
  private readonly apiUrl = 'http://localhost:3000/neighborhoods';

  constructor(private http: HttpClient) {}

  // Fetch the list of neighborhoods
  getNeighborhoods(): Observable<INeighborhood[]> {
    return this.http.get<INeighborhood[]>(this.apiUrl);
  }
}
