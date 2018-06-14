import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../shared/models/types';
import { Query } from '../../shared/models/query';

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
  private pageSize = 30;

  constructor( private router: Router, private apollo: Apollo ) {
  }

  ngOnInit() {
    this.getMovies();
  }

  updatePage( page: number ) {
    this.page = page;
    this.getMovies(page - 1);
  }

  getMovies( pageToShow = 0 ) {
    const moviesQuery = gql`
      query movies($page: Int, $pageSize: Int) {
        movies(page: $page, pageSize: $pageSize) {
          id
          title
          genres
          ratings {
            rating
          }
        }
        movieCount
      }
    `;

    this.query = this.apollo
                     .query<Query>({
                       query    : moviesQuery,
                       variables: { page: pageToShow, pageSize: this.pageSize }
                     })
                     .map(result => result.data);

    this.movies = this.query.map(data => data.movies);
    this.totalPages = this.query.map(data => Math.ceil(data.movieCount / this.pageSize));
  }

  getAverageRating(movie: Movie) {
    const combinedRatings = movie.ratings
                                 .map(rating => rating.rating)
                                 .reduce(( a, b) => a + b);
    return combinedRatings / movie.ratings.length;
  }

  openMovieDetails( movie: Movie ) {
    this.router.navigate([ 'movies', movie.id ]);
  }
}
