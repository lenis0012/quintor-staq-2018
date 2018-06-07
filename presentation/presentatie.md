<!-- .slide: data-background="./images/skyline_light.jpg", data-background-transition="slide" -->
<!-- .slide: data-background="./images/skyline_dark.png", data-background-transition="slide" -->

<br>
<br>
# GraphQL
### A query language for your API

---

## Even voorstellen
<br>

![](images/profile-0.jpg)| ![](images/profile-1.jpg)
:---:|:---:
Lennart ten Wolde|Marcel Hollink

---

## Programma

Tijd|Onderwerp
--- |:---:
10:00 - 10:10|Ontvangst
10:10 - 10:30|Hands-on: Problemen met REST
10:30 - 10:40|Introductie GraphQL
10:40 - 10:50|GraphQL Implementeren
10:50 - 12:00|Hands-on: GraphQL
12:00 - 12:15|Uitloop & vragen

---

<!-- .slide: data-background="./images/keyboard_light.jpg", data-background-transition="slide" -->
<!-- .slide: data-background="./images/keyboard_dark.jpg", data-background-transition="slide" -->

<br>

# Hands-on

### Problemen met REST

<br>
<br>

###### https://git.quintor.nl/Quintor/staq-graphql


--

## Problemen met REST

* API Versioning
* Overbodige informatie
  * Meer bandwith verbruik
  * Langzamere app load time
* Veel API round trips

<aside class="notes">
    * Voor de nieuwe platforms wordt er anders met data omgegaan, dus moest er een nieuwe API komen.
    * API calls geven vaak zo veel mogelijk informatie terug, dit is vaak niet nodig.
    Hierdoor meer bandwith en hogere latency.
    * Veel round trips omdat endpoints opgezet zijn voor enkel 1 doel/functie
</aside>

--

## Facebook 2012


<div style="text-align: center" >

![](images/facebook-users.png)

<br>
1 Miljard gebruikers


</div>

<aside class="notes">
    Facebook extreem gegroeid.  
    Bezig met uitbreiden naar iSO and Android 
</aside>

--

<br>
<br>

# De oplossing?

---


<br>
<br>

# GraphQL!

--

## GraphQL

* Query Language
* Alleen wat je nodig hebt
* Eén request, *n* resources
* Eén endpoint
* Minder data verkeer
* Automatische API Spec.

Note:
GraphQL is een query language voor API's en levert de gebruiker de mogelijkheid om exact de data op te vragen die 
hij/zij nodig heeft. Naast het specefiek vragen van data kan de gebruiker ook referenties op vragen met enkel 1 request.

--

## Gebruikers

<div style="text-align: center" >

![](images/users.png)


https://graphql.org/users/

</div>

--


## Schemas en types

```
type Query {
    movies: [Movie]
    movie(id: Int): Movie
}

type Movie {
    id: Int
    title: String
    ratings: [String]
}


type Rating {
    rating: Int
    timestamp: Int
}
```

--

## Simpel request

[POST] /grahpql

```
{
	movies {
		title
	}
}
```

```json
{
	"data": {
		"movies": [
		    {
		    	"title": "2001: A Space Odyssey" 
		    }
		]
	}
}
```

Note:

In het meest simpele request vraag je een resource op en daarvan een property. 
Dit gaat via een POST request

--

## Argumenten

[POST] /grahpql

```
{
	movie(id: 924) {
		title
	}
}
```

```json
{
	"data": {
		"movie": {
			"title": "2001: A Space Odyssey" 
		}
	}
}
```

Note:

In het meest simpele request vraag je een resource op en daarvan een property. 
Dit gaat via een POST request

--

## Relationele data

[POST] /grahpql

```
{
	movie(id: 924) {
		ratings {
			rating
		}
	}
}
```

```json
{
	"data": {
		"movie": {
			"ratings": [
				{
					"rating": 4.0
				}
			]
		}
	}
}
```

Note:
-

--

## Alias

[POST] /grahpql

```
{
	awesomeMovie: movie(id: 924) {
		title
	}
}
```

```json
{
	"data": {
		"awesomeMovie": {
			"title": "2001: A Space Odyssey" 
		}
	}
}
```

Note:
-

---

<br>
<br>

# Implementatie

--


## GraphQL Server side


* graphql-java
* graphql-dotnet
* graphql-net
* GraphQL.js
* express-graphql
* apollo-server

<div style="text-align:center">
<br>
<br>
https://graphql.org/code/#server-libraries
</div>

Note:


--

## GraphQL & Spring

* com.graphql-java
    * graphql-spring-boot-starter
    * graphql-java-tools

--

## GraphQL & Spring

```
type Query {
    movies: [Movie!]
}

type Movie {
    id: Int!
    title: String!
    genres: [String!]
}
```

```java
@Component
public class RootResolver implements GraphQLQueryResolver { 
    
    private MovieRepository movieRepository;
    
    public List<Movie> movies() { // <= name in query type.
        return movieRepository.findAll();
    }
}
```

--

## GraphQL Client side

* Apollo Client    
* Relay            
* graphql-request  
* Lokka            
* nanogql          

<div style="text-align:center">
<br>
<br>
https://graphql.org/code/#graphql-clients
</div>

Note:

Relay: react (Facebook)
Apollo Client: react (+native), Angular of plain JavaScript, ook Android en iOS variant
graphql-request: "light weight" - browser, node.js & React Native
lokka: "light weight" - browser, node.js & React Native

--

## GraphQL & Angular

* apollo-angular 
* apollo-angular-link-http 
* apollo-client
* apollo-cache-inmemory
* graphql-tag 
* graphql

Note:
-

--

## GraphQL & Angular

In de module:

```typescript
constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
        link: httpLink.create({ uri: '<your_graphql_endpoint>' }),
        cache: new InMemoryCache(),
    });
}
```

In het component: 

```typescript
constructor(apollo: Apollo) {
    apollo.query({
        query: gql`
            {
                <your_query>
            }
        `
     }).subscribe((result) => ... );
}
```

Note:
-


---

<!-- .slide: data-background="./images/keyboard_light.jpg", data-background-transition="slide" -->
<!-- .slide: data-background="./images/keyboard_dark.jpg", data-background-transition="slide" -->

<br>

# Hands-on

### GraphQL

<br>
<br>
###### https://git.quintor.nl/Quintor/staq-graphql

---

<!-- .slide: data-background="./images/skyline_light.jpg", data-background-transition="slide" -->
<!-- .slide: data-background="./images/skyline_dark.png", data-background-transition="slide" -->

<br>
<br>

# Vragen?

