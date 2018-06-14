import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Rating} from '../models/types';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RatingService {

  constructor(private http: HttpClient) { }

  public getRatingsForMovie(movieId: number): Observable<Rating[]> {
    return <Observable<Rating[]>> this.http.get(`api/movies/${movieId}/ratings`);
  }
}
