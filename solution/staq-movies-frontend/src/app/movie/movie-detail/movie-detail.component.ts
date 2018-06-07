import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../shared/models/types';
import { Query } from '../../shared/models/query';
import { Pageable } from '../../shared/models/pageable';

import { Apollo } from 'apollo-angular';
import 'rxjs/add/operator/map';

import gql from 'graphql-tag';

@Component({
  selector   : 'staq-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls  : [ './movie-detail.component.scss' ]
})
export class MovieDetailComponent implements OnInit {

  public movie: Movie;
  public ratingsPageOptions: Pageable = {};

  constructor( private route: ActivatedRoute, private router: Router, private apollo: Apollo ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(( params: any ) => this.getMovie(params.id));
  }

  getMovie( id: number ) {
    const movieQuery = gql`
      query movie($movieId: Int){
        movie(id: $movieId) {
          id
          title
          genres
          ratings {
            user {
              id
            }
            rating
            timestamp
          }
          links {
            imdbId
            tmdbId
          }
        }
      }
    `;

    this.apollo.query<Query>({ query: movieQuery, variables: { movieId: id } })
        .map(result => result.data.movie)
        .subscribe(( movie ) => this.movie = movie);
  }

}
