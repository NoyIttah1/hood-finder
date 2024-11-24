import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() neighborhoods: string[] = [];
  @Output() search = new EventEmitter<string>();

  control = new FormControl('');
  filteredNeighborhoods: string[] = []; // Filtered data for autocomplete

  ngOnInit(): void {
    // Listen for input changes and filter results
    this.control.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map((value) => this.filterNeighborhoods(value || ''))
    ).subscribe((filtered) => {
      this.filteredNeighborhoods = filtered;
    });
  }

  filterNeighborhoods(query: string): string[] {
    return this.neighborhoods.filter((name) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
  }

  onOptionSelected(event: any): void {
    this.search.emit(event.option.value);
  }
}
