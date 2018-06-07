import { Component, OnInit } from '@angular/core';
import { Movie } from '../../shared/models/types';
import { MovieService } from '../../shared/services/movie.service';
import { Pageable } from '../../shared/models/pageable';
import { Router } from '@angular/router';

@Component({
  selector   : 'staq-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls  : [ './movie-list.component.scss' ]
})
export class MovieListComponent implements OnInit {

  public pageOptions: Pageable = {};
  public movies: Movie[] = [];

  constructor( private router: Router, private movieService: MovieService ) {
  }

  ngOnInit() {
    this.getMovies();
  }

  updatePage( page: number ) {
    this.getMovies(page - 1);
  }

  getMovies( page: number = 0 ) {
    this.movieService.getAll(page).subscribe(( next: any ) => {
      this.movies = next.content;
      this.pageOptions = {
        page      : next.number + 1,
        totalPages: next.totalPages,
        size      : next.numberOfElements
      };
    });
  }

  openMovieDetails( movie: Movie ) {
    this.router.navigate([ 'movies', movie.id ]);
  }
}
