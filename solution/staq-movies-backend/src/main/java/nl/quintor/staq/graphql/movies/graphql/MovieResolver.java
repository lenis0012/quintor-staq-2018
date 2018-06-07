package nl.quintor.staq.graphql.movies.graphql;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.coxautodev.graphql.tools.GraphQLResolver;
import nl.quintor.staq.graphql.movies.movies.Movie;
import org.springframework.stereotype.Component;

@Component
public class MovieResolver implements GraphQLResolver<Movie> {
}
