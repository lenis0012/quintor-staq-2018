package nl.quintor.staq.graphql.movies.movielinks;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/movies/{id}/links")
public class MovieLinkController {

    private final MovieLinkRepository movieLinkRepository;

    public MovieLinkController(MovieLinkRepository movieLinkRepository) {
        this.movieLinkRepository = movieLinkRepository;
    }

    @GetMapping("")
    public List<MovieLink> getLinks(@PathVariable int id) {
        return movieLinkRepository.findAllByMovieId(id);
    }
}
