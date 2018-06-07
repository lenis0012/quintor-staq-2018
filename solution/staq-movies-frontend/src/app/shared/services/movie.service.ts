import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Link, Movie, Rating } from '../models/types';
import { HttpClient } from '@angular/common/http';
import { Pageable } from '../models/pageable';

@Injectable()
export class MovieService {

  private readonly base: string = 'api/movies';

  constructor( private http: HttpClient ) {
  }


  public getAll(page: number = 0, size: number = 15): Observable<Movie[]> {
    return <Observable<Movie[]>> this.http.get(`${this.base}?page=${page}&size=${size}`);
  }


  public getOne(id: number): Observable<Movie> {
    return <Observable<Movie>> this.http.get(this.base + '/' + id);
  }


  public getRatings(id: number, page: number = 0, size: number = 10): Observable<Rating> {
    return <Observable<Rating>> this.http.get(`${this.base}/${id}/ratings?page=${page}&size=${size}`);
  }


  public getLinks(id: number): Observable<Link> {
    return <Observable<Link>> this.http.get(this.base + '/' + id + '/links');
  }

}
