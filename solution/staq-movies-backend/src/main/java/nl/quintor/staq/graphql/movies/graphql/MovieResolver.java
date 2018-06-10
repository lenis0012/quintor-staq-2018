package nl.quintor.staq.graphql.movies.graphql;

import com.coxautodev.graphql.tools.GraphQLResolver;
import nl.quintor.staq.graphql.movies.movielinks.Link;
import nl.quintor.staq.graphql.movies.movielinks.LinkRepository;
import nl.quintor.staq.graphql.movies.movies.Movie;
import nl.quintor.staq.graphql.movies.ratings.Rating;
import nl.quintor.staq.graphql.movies.ratings.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MovieResolver implements GraphQLResolver<Movie> {

    private final RatingRepository ratingRepository;
    private final LinkRepository linkRepository;

    @Autowired
    public MovieResolver(RatingRepository ratingRepository, LinkRepository linkRepository) {
        this.ratingRepository = ratingRepository;
        this.linkRepository = linkRepository;
    }

    public List<Rating> ratings(Movie movie, int page, int pageSize) {
        return ratingRepository.findAllByMovieId(movie.getId(), PageRequest.of(page, pageSize)).getContent();
    }

    public List<Link> links(Movie movie) {
        return linkRepository.findAllByMovieId(movie.getId());
    }
}
