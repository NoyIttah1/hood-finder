import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {MatDialog} from "@angular/material/dialog";
import {FilterDialogComponent} from "../../dialogs/components/filter-dialog/filter-dialog.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() neighborhoods: string[] = [];
  @Output() search = new EventEmitter<string>();
  @Output() filter = new EventEmitter<string>();
  control = new FormControl('');
  filteredNeighborhoods$: Observable<string[]> | undefined;
  filteredNeighborhoods: Observable<string[]> | undefined;


  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // Filter neighborhoods as the user types
    // this.filteredNeighborhoods = this.control.valueChanges.pipe(
    //   startWith(''),
    //   map((query) => this.filterNeighborhoods(query || ''))
    // );
  }

  openFilterDialog() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((filters) => {
      if (filters) {
        console.log('Applied Filters:', filters);
        // Pass filters to parent or service for backend queries
      }
    });}

  filterNeighborhoods(query: string): string[] {
    return this.neighborhoods.filter((name) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
  }

}
