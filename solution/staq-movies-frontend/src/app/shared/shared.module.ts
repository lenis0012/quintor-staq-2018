import {NgModule} from '@angular/core';
import {MovieService} from './services/movie.service';
import {UserService} from './services/user.service';
import {RatingService} from './services/rating.service';
import {BsDropdownModule, ModalModule, TooltipModule} from 'ngx-bootstrap';
import {NavbarComponent} from './components/navbar/navbar.component';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {PaginationComponent} from './components/pagination/pagination.component';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

@NgModule({
  declarations: [NavbarComponent, PaginationComponent],
  imports: [
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    CommonModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [MovieService, UserService, RatingService],
  exports: [NavbarComponent, PaginationComponent]
})
export class SharedModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({uri: 'https://kqpjk3qlz7.lp.gql.zone/graphql'}),
      cache: new InMemoryCache()
    });
  }
}
