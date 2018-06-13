package nl.quintor.staq.graphql.movies.graphql;

import com.coxautodev.graphql.tools.GraphQLResolver;
import nl.quintor.staq.graphql.movies.movielinks.Link;
import nl.quintor.staq.graphql.movies.movies.Movie;
import nl.quintor.staq.graphql.movies.movies.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LinkResolver implements GraphQLResolver<Link> {
    private final MovieRepository movieRepository;

    @Autowired
    public LinkResolver(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public Movie movie(Link link) {
        return movieRepository.findById(link.getMovieId()).get();
    }
}
