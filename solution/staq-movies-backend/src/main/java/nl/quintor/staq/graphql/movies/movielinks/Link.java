package nl.quintor.staq.graphql.movies.movielinks;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "links")
public class Link {
    private int movieId;

    private String imdbId;

    private String tmdbId;

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public String getImdbId() {
        return imdbId;
    }

    public void setImdbId(String imdbId) {
        this.imdbId = imdbId;
    }

    public String getTmdbId() {
        return tmdbId;
    }

    public void setTmdbId(String tmdbId) {
        this.tmdbId = tmdbId;
    }
}
