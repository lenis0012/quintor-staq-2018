import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rating } from '../models/types';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  private readonly base: string = 'api/users';

  constructor( private http: HttpClient ) { }

  public getRatings(id: number, page: number = 0, size: number = 15): Observable<Rating> {
    return <Observable<Rating>> this.http.get(`${this.base}/${id}/ratings?page=${page}&size=${size}`);
  }

}
