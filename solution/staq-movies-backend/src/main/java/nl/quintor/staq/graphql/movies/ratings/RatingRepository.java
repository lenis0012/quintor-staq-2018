package nl.quintor.staq.graphql.movies.ratings;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface RatingRepository extends PagingAndSortingRepository<Rating, ObjectId> {

    Page<Rating> findAllByMovieId(int movieId, Pageable pageable);

    Page<Rating> findAllByUserId(int userId, Pageable pageable);
}
