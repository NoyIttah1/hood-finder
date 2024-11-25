import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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

  ngOnInit(): void {
    // Filter neighborhoods as the user types
    this.filteredNeighborhoods = this.control.valueChanges.pipe(
      startWith(''),
      map((query) => this.filterNeighborhoods(query || ''))
    );
  }

  filterNeighborhoods(query: string): string[] {
    return this.neighborhoods.filter((name) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
  }

  onOptionSelected(event: any): void {
    this.search.emit(event.option.value);
  }

  applyFilter(filterType: string): void {
    console.log(`Filter applied: ${filterType}`);
    this.filter.emit(filterType); // Emit the selected filter type to the parent
  }
}
