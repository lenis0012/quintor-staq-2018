# GraphQL

## Dependencies

To install all dependencies i've ran 
`npm i apollo-angular apollo-angular-link-http apollo-client apollo-cache-inmemory graphql-tag graphql`
which did install the following packages:

+ apollo-cache-inmemory v1.2.2
+ graphql-tag v2.9.2
+ graphql v0.13.2
+ apollo-client v2.3.2
+ apollo-angular-link-http v1.1.0
+ apollo-angular v1.1.0

## Imports

After adding the dependencies, i've added the appropriate import statements in the shared module (where the services live)

```
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
```

```
@NgModule({
  declarations: [ ... ],
  imports     : [
    ...,
    ApolloModule,
    HttpLinkModule
  ],
  providers   : [ ... ],
  exports     : [ ... ]
})
export class SharedModule {}
```

Continuing on the module, I injected `Apollo` and `HttpLink` into the constructor. After doing so, I've added the following lines of code.

```
this.apollo.create({
  link: this.httpLink.create({ uri: ''}),
  cache: new InMemoryCache()
});
```

I created a launchpad with a mock for the backend. which currently listens on `https://kqpjk3qlz7.lp.gql.zone/graphql`. 
This URL can be used in the uri statement.

## Query

For the next step i created a file called `query.ts` in the models folder under shared. 
This file contains one interface called `Query` with the available queries: 

- `movies: Movie[]`
- `movie: Movie`
- `user: user`

I've also added the relational data to the types in the `types.ts` file.

## Usage

##### Movies list

The first file in which i added GraphQL is `movie-list.component.ts`. I started by adding the import statements

```
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import gql from 'graphql-tag';
```

Next up, I added the Apollo service in the constructor to inject it for later use. I added the grapql query after clearing the `getMovies` method of the code related to REST:

```
const moviesQuery = gql`
  query {
    movies {
      id
      title
      genres
    }
  }
`;
```

Then i called `this.apollo.query<Query>({query: moviesQuery})` which resulted in an observable of the qeury result. With the map operator of rxjs i transformed it into an `Observable<Movie[]>`

``` 
this.movies = this.apollo.query<Query>({query: moviesQuery})
                  .map(result => result.data.movies);
```

I changed to type of the public field `movies` to an `Observable` and in the HTML template i added the `async` key to the `*ngFor`.


##### Movie details

I've added the same imports in the `movie-detail.component.ts` as I did in the list component. I cleared out all the code related to REST and added the graphQL code. I was left with only one variable, namely `public movie: Movie;`. I used the folling query:

```
const movieQuery = gql`
  query movie($movieId: Int){
    movie(id: $movieId) {
      id
      title
      genres
      ratings {
        user {
          id
        }
        rating
        timestamp
      }
      links {
        imdbId
        tmdbId
      }
    }
  }
`;
```

Lastly, I subscribed to the result of the `query` method in Apollo to extract the value from the observable. 

The changes in the controller of the component lead to the removal of the public fields `ratings` and `links`. We must apply those to the HTML file as well. I used a `safe navigator` operator since the data comes in via an async callback. for example: `movie?.title`, `movie?.links.imdbId` and `*ngFor="let rating of movie?.ratings`.

##### User details

Lastly i've rewitten the user component that is still using REST. I removed the UserService and added the Apollo Service with all the necessary imports.
I implemented the follwing query to retrieve the user:

```
query user($userId: Int){
  user(id: $userId) {
    id
    ratings {
      movie {
        id
        title
      }
      rating
      timestamp
    }
  }
}
```

I added a public user variable to be used in the html file and added the apollo code:

```
this.apollo.query<Query>({ query: userQuery, variables: { userId: id } })
  .map(result => result.data.user)
  .subscribe(( user ) => this.user = user);
```
