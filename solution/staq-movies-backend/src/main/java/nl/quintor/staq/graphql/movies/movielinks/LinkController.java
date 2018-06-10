package nl.quintor.staq.graphql.movies.movielinks;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/movies/{id}/links")
public class LinkController {

    private final LinkRepository linkRepository;

    public LinkController(LinkRepository linkRepository) {
        this.linkRepository = linkRepository;
    }

    @GetMapping("")
    public List<Link> getLinks(@PathVariable int id) {
        return linkRepository.findAllByMovieId(id);
    }
}
