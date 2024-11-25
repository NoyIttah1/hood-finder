import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module'; // Import the routing module
import {AppComponent} from './app.component';
import {NeighborhoodsComponent} from "./components/neighborhoods/neighborhoods.component";
import {HttpClientModule} from "@angular/common/http";
import {NeighborhoodCardComponent} from "./components/neighborhood-card/neighborhood-card.component";
import {HeaderComponent} from "./components/header/header.component";
import {MatOptionModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {FilterDialogComponent} from "./dialogs/components/filter-dialog/filter-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    NeighborhoodsComponent,
    NeighborhoodCardComponent,
    HeaderComponent,
    FilterDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatSliderModule,
    MatButtonToggleModule,
    MatSelectModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
