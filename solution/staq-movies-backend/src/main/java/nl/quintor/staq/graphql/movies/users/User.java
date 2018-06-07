package nl.quintor.staq.graphql.movies.users;


public class User {
    private int id;

    public User() {}

    public User(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
