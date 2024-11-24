import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighborhoodCardComponent } from './neighborhood-card.component';

describe('NeighborhoodCardComponent', () => {
  let component: NeighborhoodCardComponent;
  let fixture: ComponentFixture<NeighborhoodCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeighborhoodCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeighborhoodCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
