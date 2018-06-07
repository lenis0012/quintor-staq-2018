import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../shared/models/types';
import { Query } from '../../shared/models/query';
import { Pageable } from '../../shared/models/pageable';

import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import gql from 'graphql-tag';

@Component({
  selector   : 'staq-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls  : [ './movie-list.component.scss' ]
})
export class MovieListComponent implements OnInit {

  public pageOptions: Pageable = {};
  public movies: Observable<Movie[]>;

  constructor( private router: Router, private apollo: Apollo ) {
  }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    const moviesQuery = gql`
      query {
        movies {
          id
          title
          genres
        }
      }
    `;

    this.movies = this.apollo.query<Query>({ query: moviesQuery, variables: {}})
                      .map(result => result.data.movies);
  }

  openMovieDetails( movie: Movie ) {
    this.router.navigate([ 'movies', movie.id ]);
  }
}
