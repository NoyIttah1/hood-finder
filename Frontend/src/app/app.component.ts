import { Component, OnInit } from '@angular/core';
import { NeighborhoodService } from './services/neighborhood.service';
import { INeighborhood } from './defines';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  neighborhoods: INeighborhood[] = [];

  constructor(private neighborhoodService: NeighborhoodService) {}

  ngOnInit(): void {
    this.fetchNeighborhoods();
  }

  private fetchNeighborhoods(): void {
    this.neighborhoodService.getNeighborhoods().subscribe({
      next: (response) => {
        this.neighborhoods = response; // Fetch data once
      },
      error: (error) => {
        console.error('Failed to fetch neighborhoods:', error);
      },
    });
  }
  //
  // getNeighborhoodNames(): string[] {
  //   return this.neighborhoods.map((n) => n.neighborhood || 'Unknown');
  // }

  onSearch(query: string): void {
    console.log('Search query:', query);
    // You can implement further actions here, e.g., filter or navigate
  }
}
