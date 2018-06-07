package nl.quintor.staq.graphql.movies.graphql;

import com.coxautodev.graphql.tools.GraphQLResolver;
import nl.quintor.staq.graphql.movies.ratings.Rating;
import nl.quintor.staq.graphql.movies.ratings.RatingRepository;
import nl.quintor.staq.graphql.movies.users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserResolver implements GraphQLResolver<User> {

    private final RatingRepository ratingRepository;

    @Autowired
    public UserResolver(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    public List<Rating> ratings(User user) {
        return ratingRepository.findAllByUserId(user.getId(), PageRequest.of(0, 10)).getContent();
    }
}
