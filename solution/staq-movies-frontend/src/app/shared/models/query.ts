import {Movie, User} from './types';

export type Query = {
  movies: Movie[];
  movie: Movie;
  user: User;
};
