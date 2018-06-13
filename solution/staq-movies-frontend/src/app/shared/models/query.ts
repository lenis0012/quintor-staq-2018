import {Movie, User} from './types';

export type Query = {
  movies: Movie[];
  movieCount: number;
  movie: Movie;
  user: User;
};
