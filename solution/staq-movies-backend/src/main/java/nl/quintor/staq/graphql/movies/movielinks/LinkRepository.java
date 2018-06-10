package nl.quintor.staq.graphql.movies.movielinks;

import org.bson.types.ObjectId;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LinkRepository extends CrudRepository<Link, ObjectId> {

    List<Link> findAllByMovieId(int movieId);
}
