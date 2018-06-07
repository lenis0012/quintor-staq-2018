import { NgModule } from '@angular/core';
import { MovieService } from './services/movie.service';
import { UserService } from './services/user.service';
import { RatingService } from './services/rating.service';
import { BsDropdownModule, ModalModule, TooltipModule } from 'ngx-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './components/pagination/pagination.component';


@NgModule({
  declarations: [ NavbarComponent, PaginationComponent ],
  imports     : [
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    CommonModule
  ],
  providers   : [ MovieService, UserService, RatingService ],
  exports     : [ NavbarComponent, PaginationComponent ]
})
export class SharedModule {}
