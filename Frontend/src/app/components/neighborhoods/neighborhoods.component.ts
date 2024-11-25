import {Component, Input} from '@angular/core';
import {INeighborhood} from '../../defines';

@Component({
  selector: 'app-neighborhoods',
  templateUrl: './neighborhoods.component.html',
  styleUrls: ['./neighborhoods.component.css'],
})
export class NeighborhoodsComponent {
  @Input({alias: 'neighborhoods', required: true}) neighborhoods: INeighborhood[] = []; // Receive data from parent
}
