import {Component, OnInit} from '@angular/core';
import {NeighborhoodService} from './services/neighborhood.service';
import {INeighborhood, INeighborhoodFilters} from './defines';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  neighborhoods: INeighborhood[] = [];
  neighborhoodsNamesToSearch: string[] = [];
  searchedCards: INeighborhood[] = [];
  isLoadingData = false;
  paginationData?: {
    total: number,
    page: number,
    limit: number
  } | null

  paginationDATA?: {
    totalPages: number;
  } | null

  paginationFilters = {
    currentPage: 1,
    limit: 20
  }

  constructor(private neighborhoodService: NeighborhoodService) {
  }

  ngOnInit(): void {
    this.fetchNeighborhoods({});
  }

  private fetchNeighborhoods(filters: INeighborhoodFilters): void {
    this.isLoadingData = true;
    filters.limit = this.paginationFilters.limit;
    filters.page = this.paginationFilters.currentPage;
    this.neighborhoodService.getNeighborhoods$(filters).subscribe({
      next: (response) => {
        this.neighborhoods = response.data;


        const existedNames: string [] = []
        for (const neighborhood of this.neighborhoods) {
          const name = neighborhood.neighborhood.toLowerCase();
          if (existedNames.includes(name)) continue;
          existedNames.push(name)
        }
        this.neighborhoodsNamesToSearch = existedNames;

        this.paginationData = response.meta;
        this.paginationDATA = {
          totalPages: response.meta.total / this.paginationFilters.limit
        }
        this.paginationDATA.totalPages = Math.ceil(this.paginationDATA?.totalPages || 0)

      },
      error: (error) => {
        console.error('Failed to fetch neighborhoods:', error);
      },
      complete: () => {
        this.isLoadingData = false;
      }
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

  onFilter(filters: INeighborhoodFilters) {
    if (!filters) return;
    this.fetchNeighborhoods(filters);
  }

  onSelectedSearchCard(cards: INeighborhood[]) {
    if(cards.length <= 0) {
      this.searchedCards = this.neighborhoods;
    }
   this.searchedCards = cards;
  }

  /**
   *
   * @param previousOrNextPage if true - next, otherwise previous
   */
  movePage(previousOrNextPage: boolean) {

    if (previousOrNextPage) {
      this.paginationFilters.currentPage += 1; // Next page
    } else {
      this.paginationFilters.currentPage -= 1; // Previous page
    }
    this.fetchNeighborhoods({})
  }
}
