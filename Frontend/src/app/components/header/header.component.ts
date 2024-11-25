import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialog} from "@angular/material/dialog";
import {FilterDialogComponent} from "../../dialogs/components/filter-dialog/filter-dialog.component";
import {INeighborhoodFilters} from "../../defines";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input({alias: "neighborhoodsNames", required: true}) neighborhoods: string[] = [];
  @Output() search = new EventEmitter<string>();

  filters: INeighborhoodFilters = {
    minAge: 0,
    maxAge: 120,
    minDistance: 1,
    maxDistance: 100,
    sortField: 'neighborhood',
    sortOrder: 'asc'
  };
  @Output() filterEmitter = new EventEmitter<INeighborhoodFilters>();
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

  openFilterDialog() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '300px',
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
    return this.neighborhoods.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
