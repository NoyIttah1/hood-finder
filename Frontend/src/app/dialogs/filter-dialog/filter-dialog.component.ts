import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {INeighborhoodFilters} from "../../defines";

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent{

  filters: INeighborhoodFilters = {
    minAge: 0,
    maxAge: 120,
    minDistance: 0,
    maxDistance: 100,
    sortField: 'neighborhood',
    sortOrder: 'asc'
  };

  constructor(public dialogRef: MatDialogRef<FilterDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: INeighborhoodFilters
  ) {
    this.filters = data;
  }

  applyFilters() {
    this.dialogRef.close(this.filters);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return `${value}`;
  }

  onSliderChange(event: number): void {
    this.filters.maxDistance = event
  }
}
