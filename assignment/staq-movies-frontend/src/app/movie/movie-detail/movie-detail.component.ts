import { Component, OnInit } from '@angular/core';
import { Link, Movie, Rating } from '../../shared/models/types';
import { MovieService } from '../../shared/services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pageable } from '../../shared/models/pageable';

@Component({
  selector: 'staq-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: [ './movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  public movie: Movie;
  public links: Link;
  public ratings: Rating[] = [];

  public ratingsPageOptions: Pageable = {};


  constructor( private route: ActivatedRoute, private router: Router, private movieService: MovieService ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(( params: any ) => this.getMovie(params.id));
  }

  getMovie( id: number ) {
    this.movieService.getOne(id).subscribe((next: any) => {
      this.movie = next;
      this.getLinks();
      this.getRatings();
    });
  }

  getRatings( page: number = 0 ): void {
    this.movieService.getRatings(this.movie.id, page).subscribe((next: any) => {
      this.ratings = next.content;
      this.ratingsPageOptions = {
        page      : next.number + 1,
        totalPages: next.totalPages,
        size      : next.numberOfElements
      };
    });
  }

  updatePage( page: number ) {
    this.getRatings(page - 1);
  }

  getLinks() {
    this.movieService.getLinks(this.movie.id).subscribe((next: any) => {
      this.links = next[0];
    });
  }

}
