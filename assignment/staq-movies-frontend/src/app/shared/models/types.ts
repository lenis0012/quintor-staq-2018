export interface Movie {
  id: number;
  title: string;
  genres: string[];
}

export interface User {
  userId: number;
}

export interface Rating {
  userId: number;
  movieId: number;
  rating: number;
  timestamp: number;
}

export interface Link {
  movieId: number;
  imdbId: number;
  tmdbId: number;
}

export interface Tags {
  movieId: number;
  userId: number;
  tag: string;
  timestamp: number;
}
