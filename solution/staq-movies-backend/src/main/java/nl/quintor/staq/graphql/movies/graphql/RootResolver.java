package nl.quintor.staq.graphql.movies.graphql;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import nl.quintor.staq.graphql.movies.movies.Movie;
import nl.quintor.staq.graphql.movies.movies.MovieRepository;
import nl.quintor.staq.graphql.movies.users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class RootResolver implements GraphQLQueryResolver {
    private final MovieRepository movieRepository;

    @Autowired
    public RootResolver(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> movies() {
        List<Movie> movies = new ArrayList<>();
        movieRepository.findAll().forEach(movies::add);
        return movies;
    }

    public Optional<Movie> movie(int id) {
        return movieRepository.findById(id);
    }

    public Optional<User> user(int id) {
        return Optional.of(new User(id));
    }
}
