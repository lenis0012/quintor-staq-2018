export type Movie = {
  id: number;
  title: string;
  genres: string[];

  ratings: Rating[];
  links: Link;
  tags: Tag[];
};

export type User = {
  id: number;
  ratings: Rating[];
  tags: Tag[];
};

export type Rating = {
  movie: Movie;
  user: User;
  rating: number;
  timestamp: number;
};

export type Link = {
  movie: Movie;
  imdbId: number;
  tmdbId: number;
};

export type Tag = {
  movie: Movie;
  user: User;
  tag: string;
  timestamp: number;
};
