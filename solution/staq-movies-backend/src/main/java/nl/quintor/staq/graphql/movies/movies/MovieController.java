package nl.quintor.staq.graphql.movies.movies;

import nl.quintor.staq.graphql.movies.movielinks.LinkRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/movies")
public class MovieController {

    private final MovieRepository movieRepository;

    public MovieController(MovieRepository movieRepository, LinkRepository linkRepository) {
        this.movieRepository = movieRepository;
    }

    @GetMapping("/{id}")
    public Optional<Movie> get(@PathVariable int id) {
        return movieRepository.findById(id);
    }

    @GetMapping("")
    public Page<Movie> list(Pageable pageable) {
        return movieRepository.findAll(pageable);
    }
}
