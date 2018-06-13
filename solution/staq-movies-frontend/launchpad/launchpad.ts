import {makeExecutableSchema} from 'graphql-tools';

const typeDefs = `
  type Query {
    movies: [Movie]z
    movie(id: Int): Movie
		user(id: Int): User
  }

	type Movie {
		id: Int
		title: String
		genres: [String]
		ratings: [Rating]
		links: Link
		tags: [Tag]
	}

	type User {
		id: Int
		ratings: [Rating]
		tags: [Tag]
	}

	type Rating {
		movie: Movie
		user: User
		rating: Int
		timestamp: Int
	}

	type Link {
		movie: Movie
		imdbId: String
		tmdbId: String
	}

	type Tag {
	 movie: Movie
	 user: User
	 tag: String
	 timestamp: Int
	}
`;


const movies = [
  {id: 1, title: 'The Godfather (1972)', genres: ['Crime', 'Drama']},
  {id: 2, title: 'Fight Club (1999)', genres: ['Drama']},
  {id: 3, title: 'Raging Bull (1980)', genres: ['Biography', 'Drama', 'Sport']}
];

const users = [
  {id: 1},
  {id: 2},
  {id: 3}
];

const ratings = [
  {movieId: 1, userId: 1, rating: 4, timestamp: 1528025620},
  {movieId: 1, userId: 2, rating: 5, timestamp: 1528025671},
  {movieId: 2, userId: 1, rating: 2, timestamp: 1528025677},
  {movieId: 2, userId: 3, rating: 3, timestamp: 1528025671},
  {movieId: 3, userId: 3, rating: 5, timestamp: 1528025677}
];

const links = [
  {movieId: 1, imdbId: '0068646', tmdbId: 123},
  {movieId: 2, imdbId: '0137523', tmdbId: 465},
  {movieId: 3, imdbId: '0081398', tmdbId: 789}
];

const tags = [
  {movieId: 1, userId: 1, tag: 'awesome', timestamp: 1528025671},
  {movieId: 2, userId: 1, tag: 'tear giving', timestamp: 1528025671},
  {movieId: 2, userId: 2, tag: 'next level', timestamp: 1528025671},
  {movieId: 2, userId: 3, tag: 'good', timestamp: 1528025671},
  {movieId: 3, userId: 3, tag: 'awesome', timestamp: 1528025671}
];

const moviesResolver = () => {
  movies.forEach(movie => {
    movie.ratings = ratings.filter(rating => rating.movieId === movie.id);
    movie.links = links.filter(link => link.movieId === movie.id)[0];
    movie.tags = tags.filter(tag => tag.movieId === movie.id);
  });
  return movies;
};

const movieResolver = (root, args) => {
  const movie = movies.filter((_movie) => _movie.id === args.id)[0];

  movie.ratings = ratings.filter(rating => rating.movieId === movie.id);
  movie.links = links.filter(link => link.movieId === movie.id)[0];
  movie.tags = tags.filter(tag => tag.movieId === movie.id);

  return movie;
};

const userResolver = (root, args) => {
  const user = users.filter((_user) => _user.id === args.id)[0];

  user.tags = tags.filter(tag => tag.userId === user.id);
  user.ratings = ratings.filter(rating => rating.userId === user.id);

  user.tags.forEach(tag => tag.movie = movies.filter(movie => tag.movieId === movie.id)[0]);
  user.ratings.forEach(rating => rating.movie = movies.filter(movie => rating.movieId === movie.id)[0]);

  return user;
};

const resolvers = {
  Query: {
    movies: moviesResolver,
    movie: movieResolver,
    user: userResolver
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
