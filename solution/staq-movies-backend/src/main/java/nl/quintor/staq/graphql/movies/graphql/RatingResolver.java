package nl.quintor.staq.graphql.movies.graphql;

import com.coxautodev.graphql.tools.GraphQLResolver;
import nl.quintor.staq.graphql.movies.movies.Movie;
import nl.quintor.staq.graphql.movies.movies.MovieRepository;
import nl.quintor.staq.graphql.movies.ratings.Rating;
import nl.quintor.staq.graphql.movies.users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RatingResolver implements GraphQLResolver<Rating> {
    private final MovieRepository movieRepository;

    @Autowired
    public RatingResolver(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public User user(Rating rating) {
        return new User(rating.getUserId());
    }

    public Movie movie(Rating rating) {
        return movieRepository.findById(rating.getMovieId()).get();
    }
}
