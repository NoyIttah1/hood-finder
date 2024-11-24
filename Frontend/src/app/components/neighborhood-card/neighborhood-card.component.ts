import {Component, Input} from '@angular/core';
import {INeighborhood} from "../../defines";

@Component({
  selector: 'app-neighborhood-card',
  templateUrl: './neighborhood-card.component.html',
  styleUrl: './neighborhood-card.component.css'
})
export class NeighborhoodCardComponent {
  @Input({ required: true, alias: 'neighborhood' })
  neighborhood!: INeighborhood;
}
