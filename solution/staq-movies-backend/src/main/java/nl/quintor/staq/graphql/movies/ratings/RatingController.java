package nl.quintor.staq.graphql.movies.ratings;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
public class RatingController {

    private final RatingRepository ratingRepository;

    public RatingController(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    @GetMapping("/movies/{movieId}/ratings")
    public Page<Rating> getMovieRatings(@PathVariable int movieId, Pageable pageable) {
        return ratingRepository.findAllByMovieId(movieId, pageable);
    }

    @GetMapping("/users/{userId}/ratings")
    public Page<Rating> getUserRatings(@PathVariable int userId, Pageable pageable) {
        return ratingRepository.findAllByUserId(userId, pageable);
    }
}
