import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

@NgModule({
  declarations: [ MovieComponent, MovieListComponent, MovieDetailComponent ],
  imports     : [
    CommonModule,
    SharedModule,
    MovieRoutingModule
  ],
  providers   : [],
  exports     : []
})
export class MovieModule {}
