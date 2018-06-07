package nl.quintor.staq.graphql.movies.movielinks;

import org.bson.types.ObjectId;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MovieLinkRepository extends CrudRepository<MovieLink, ObjectId> {

    List<MovieLink> findAllByMovieId(int movieId);
}
