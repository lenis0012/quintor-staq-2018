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
  public query: Observable<Query>;
  public movies: Observable<Movie[]>;
  public totalPages: Observable<number>;
  public page = 1;

  constructor( private router: Router, private apollo: Apollo ) {
  }

  ngOnInit() {
    this.getMovies();
  }

  updatePage( page: number ) {
    // this.getMovies(page - 1);
    // this.page = page - 1;
    this.page = page;
    console.log(page);
    this.getMovies();
  }

  getMovies() {
    const moviesQuery = gql`
      query {
        movies(page: ${this.page - 1}) {
          id
          title
          genres
        }
        movieCount
      }
    `;

    this.query = this.apollo.query<Query>({ query: moviesQuery, variables: {}})
                      .map(result => result.data);
    this.movies = this.query.map(q => q.movies);
    this.totalPages = this.query.map(q => Math.ceil(q.movieCount / 20));
  }

  openMovieDetails( movie: Movie ) {
    this.router.navigate([ 'movies', movie.id ]);
  }
}
