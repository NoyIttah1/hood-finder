import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NeighborhoodsComponent } from './components/neighborhoods/neighborhoods.component'; // Adjust the path

const routes: Routes = [
  { path: 'neighborhoods', component: NeighborhoodsComponent },
  { path: '', redirectTo: '/neighborhoods', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
