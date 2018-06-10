package nl.quintor.staq.graphql.movies.graphql;

import com.coxautodev.graphql.tools.GraphQLResolver;
import nl.quintor.staq.graphql.movies.movielinks.Link;
import org.springframework.stereotype.Component;

@Component
public class LinkResolver implements GraphQLResolver<Link> {
}
