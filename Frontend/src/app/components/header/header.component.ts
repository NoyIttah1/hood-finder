import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialog} from "@angular/material/dialog";
import {FilterDialogComponent} from "../../dialogs/filter-dialog/filter-dialog.component";
import {INeighborhood, INeighborhoodFilters} from "../../defines";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @ViewChild('searchMenu', { static: true }) searchMenu!: ElementRef; // Reference to the search menu container

  @Input({alias: "allNeighborhoods", required: true}) allNeighborhoods: INeighborhood[] = [];
  @Input({alias: "neighborhoodsNames", required: true}) neighborhoodsNames: string[] = [];

  @Output() search = new EventEmitter<string>();
  @Output() onSearchCardSelected = new EventEmitter<INeighborhood[]>();
  @Output() filterEmitter = new EventEmitter<INeighborhoodFilters>();

  filters: INeighborhoodFilters = {
    minAge: 0,
    maxAge: 120,
    minDistance: 1,
    maxDistance: 100,
    sortField: 'neighborhood',
    sortOrder: 'asc'
  };
  control = new FormControl('');
  filteredOptions$!: Observable<string[]>;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filterNeighborhoodNames(value || ''))
    );
  }

  public selectOption(option: string): void {
    let filteredCards = this.allNeighborhoods.filter(card => card.neighborhood.toLowerCase() === option.toLowerCase());

    this.onSearchCardSelected.emit(filteredCards);
  }
  openFilterDialog() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '600px',
      data: this.filters,
    });

    dialogRef.afterClosed().subscribe((filters: INeighborhoodFilters) => {
      if (!filters) return;
      this.filterEmitter.emit(filters);
      this.filters = filters; /// To save the current filters so when we open the dialog again
    });
  }

  private _filterNeighborhoodNames(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.neighborhoodsNames.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
