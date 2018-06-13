package nl.quintor.staq.graphql.movies.graphql;

import lombok.*;
import nl.quintor.staq.graphql.movies.movies.Movie;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter @AllArgsConstructor
public class PageResult<T> {
    private int totalPages;
    private int currentPage;
    private int pageSize;
    private List<T> contents;

    public static MoviePageResult movies(Page<Movie> page) {
        return new MoviePageResult(page.getTotalPages(), page.getNumber(), page.getSize(), page.getContent());
    }

    public static class MoviePageResult extends PageResult<Movie> {
        public MoviePageResult(int totalPages, int currentPage, int size, List<Movie> contents) {
            super(totalPages, currentPage, size, contents);
        }
    }
}
