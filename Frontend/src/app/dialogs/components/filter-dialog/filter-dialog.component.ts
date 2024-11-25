import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {IFilters} from "../../../defines";

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent {
  filters: IFilters = {
    minAge: 0,
    maxAge:120,
    minDistance:0,
    maxDistance: 100
  };

  constructor(public dialogRef: MatDialogRef<FilterDialogComponent>) {}

  applyFilters() {
    this.dialogRef.close({
      minAge: this.filters.minAge,
      maxAge: this.filters.maxAge,
      minDistance: this.filters.minDistance,
      maxDistance: this.filters.maxDistance,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
