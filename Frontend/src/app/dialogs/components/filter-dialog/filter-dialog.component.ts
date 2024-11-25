import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent {
  ageRange: [number, number] = [18, 65];
  maxDistance: number = 100;

  constructor(public dialogRef: MatDialogRef<FilterDialogComponent>) {}

  applyFilters() {
    this.dialogRef.close({
      ageRange: this.ageRange,
      maxDistance: this.maxDistance,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
