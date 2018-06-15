# Opdrachten

## Problems with REST

### Opdracht 1: 

Navigeer naar de pagina waarop de ratings van een gebruiker staan: `/users/{id}`. Deze `id's` lopen tot en met de *671*. Op deze pagina vind je een tabel met daarin het id van de film en de beoordeling van de gebruiker. 

> Verander in de kolom `movie` de id's naar de titel van de film.

### Opdracht 2: 

Navigeer naar de pagina waarop alle filsm staan: `/movies`. Op deze pagina is een tabel met daarin een lijst van de films die terug komen uit de backend. Hierin is het id, de naam en alle genres zichtbaar

> Voeg een extra kolom toe waarin de gemiddelde beoordeling zichtbaar is.


## GraphQL

Tijdens de opdrahten, kun je [SpringBoot + GraphQL](http://www.baeldung.com/spring-graphql) gebruiken voor referentie.

### Opdracht 1: Installation

Allereerst: Backend! Om te beginnen met graphql in spring moeten eerst de dependencies geinstaleerd worden.

> Instaleer de benodigde dependencies om graphql te gebruiken in spring

```gradle
compile group: 'com.graphql-java', name: 'graphql-spring-boot-starter', version: '4.2.0'
compile group: 'com.graphql-java', name: 'graphql-java-tools', version: '5.1.0'
```

Er zijn **2 dependencies**, graphql-spring-boot-starter en graphql-java-tools.  

**graphql-spring-boot-starter** voegt graphql support toe aan spring, en exposed en endpoint op `/graphql`.  

**graphql-java-tools** bevat utilities om boiletplate te verminderen, er wordt automatisch gezocht naar .graphqls files, en deze wordne geregistreerd als schema definition. Ook word er automatisch gezocht naar graphql resolvers en worden mappings voor je schema toegevoegd.

### Opdracht 2: Schema Definition

Om GraphQL te gebruiken is er een schema nodig waarin de GrahpQL API moet voldoen. Hierin worden de type objecten gedefineerd en wordt er beschreven welke queries er gedaan kunnen worden.

[Introductie GrahpQL](https://graphql.github.io/learn/)

> Maak een schema waarin alle domein modellen zitten, noem dit bestand `movies-api.graphqls` (in src/main/resources)

Dit bestand wordt automatisch opgeakt dankzij **graphql-java-tools**.  
Voor het gemakt kun je eerst beginnen met slechts een type/model.  
voorbeeld: 
```
type Query {
  movies: [Movie]!
}

type Movie {
  id: Int!
  title: String!
  genres: [String]!
}
```

GraphQL vereist dat er 1 root query is, waar vanuit alle andere types gequeried kunnen worden, dit type heet Query.  
In query zien we een array van type Rating, met een ! om aan te geven dat de array non-nullable is.

### Opdracht 3: Query Resolvers

Met het gemaakte schema uit opdracht 2 kunnen er geen referenties worden gequeried. Dit komt omdat de graphql server niet weet hoe hij aan een array met ratings kan komen.
Om dit probleem te tackelen moeten we een query resolver gaan toevoegen.

> Maak een nieuwe package met de naam 'graphql' en een class RootResolver, die GraphQLQueryResolver implementeerd.

Dit is je root query resolver, hierin kun je mappings voor `type Query` defineren.  
Maak een method met de naam `movies()`, en return een array met alle movies.  

Maak ook een resolver voor Movie, met de naam MovieResolver, en implementeer `GraphQLResolver<DataClass>`.  
Voor nu kunnen we deze leeg laten, want we hebben nog geen foreign references in de Movie type definition.

### Opdracht 4: GraphIQL

Ok, dit is allemaal leuk en aardig, maar we hebben nog steeds geen flauw idee of het werkt.  
Om zelf queries te maken en testen, is er een tool genaamd `GraphIQL`, I voor Interactive.  
Als je graphIQL toevoegd aan je project, kun je op `/graphiql` queries uittesten.

> Instaleer de benodigde dependencies om graphiql in spring te gebruiken.

```gradle
compile group: 'com.graphql-java', name: 'graphiql-spring-boot-starter', version: '4.2.0'
```

> Start de applicatie op, navigeer naar `/graphiql`, en bekijk je graphql schema in de rechter balk.

> Probeer de volgende query uit.

```
query {
  movies {
    id
    title
  }
}
```


### Opdracht 5: Foreign References

Om de flexabiliteit van onze query iets te verbreden, kunnen we referenties naar andere types toevoegen.  
Maak ook types voor alle andere modellen, maar laat de complex types/referenties voor nu weg.

Om de ratings van een film op te kunnen halen, moeten we een referentie maken.

> Voeg een `ratings` veld toe met als type een array van ratings.

```
type Movies {
  fieds...
  ratings: [Rating]!
}
```

In de MovieResolver kun je nu een method aanmaken met de naam `ratings(Movie movie)`.  
Dankzij **graphql-java-tools** weet spring dat deze bij de movies array hoort, en dat de parameter Movie de movie is waarvan de ratings worden opgevraagd.


### Opdracht 6: Pagination 

We zitten nu wel met een probleem. We hebben erg veel movies, en voor elke movies wordt apart alle ratings opgehaald. Dit zorgt er voor dat de load time heel snel oploopt. Om dit performance probleemp deels op te lossen, kunnen we pagination toepassen.  
Naast simpele fields, kun je met GraphQL ook functies defineren, bijvoorbeeld zo.

```
type Query {
  movies(page: Int = 0, pageSize: Int = 20)
}
```

> Voeg de paginering parameters toe aan de movies query. 

Deze parameters kunnen gebruikt worden om een `PageRequest` instantie te maken. Deze `PageRequest` kan gebruikt worden om hiermee pagination toe te passen op de repository.

> Implementeer het `PageRequest` in de RootResolver. Doe dit ook voor de `ratings` in de `MovieResolver`

*Je kunt de performance nog verder verbeteren door GraphQL DataLoaders toe te passen, maar we gaan eerst naar de frontend kijken.*

### Opdracht 7: Installation

Nu de backend staat, gaan we werken aan de frontend! Om te beginnen met GrahpQL en Apollo in angular moeten er eerst weer dependencies worden geinstaleerd.

[Apollo installatie handleiding](https://www.apollographql.com/docs/angular/basics/setup.html#installation)
 
> Instaleer alle dependecies voor het gebruik van Apollo in de Angular applicatie. 

### Opdracht 8: Create Client

Om Apollo te gebruiken moet er een client worden aangemaakt in de applicatie. Dit wordt gebruikelijk is om dit in de module van de applicatie te doen. In ons geval zullen wij het doen in de `SharedModule`.

[Apollo Create](https://www.apollographql.com/docs/angular/basics/setup.html#creating-client)

> Maak de Apollo client aan in de SharedModule via `apollo.create()`. 
> Voor de URI kan `http://localhost:8080/graphql` gebruikt worden.

### Opdracht 9a: Data Types

Tijdens de opdrachten in de backend is er een graphql schema aangemaakt dat gebruikt wordt in de API. Hierin zijn de verschillende types en uitvoerbare queries benoemd.

> Migreer de data types in `types.ts` naar de types in het schema. 

### Opdracht 9b: Type Query

Na het migreren van de data ontbreekt er nog 1 data type: `Query`. 

> exporter een nieuwe type: `export type Query { }` vanuit het `types.ts` bestand en voeg hier alle mogelijke queries aan toe.

### Opdracht 10: Apollo Queries

Na het aanmaken van de apollo client en het query type kan apollo als service worden gebruikt voor alle calls naar het `/graphql` endpoint. Hiervoor kan Apollo worden geinjecteerd in het component waar hij nodig is om vervolgens met behulp van `.query<Query>()` de data op te vragen.

[Apollo Queries](https://www.apollographql.com/docs/angular/basics/setup.html#connecting-data)

> Verwijder de REST calls in het `movies-list` component en vervang deze met een graphql query die er voorzorgt dat alle data weer beschikbaar is op de pagina.

### Opdracht 11: Query Options

In opdracht 10 hebben we een lijst van films opgehaald. Om een specefieke film op te halen moet er een variable mee worden gegeven, namelijk het `id`. Deze variable kan naast het query object worden mee geven met de `.query<Query>()` methode. 

[Apollo Query options](https://www.apollographql.com/docs/angular/basics/queries.html#options)

> Verwijder alle data die gebruikt wordt in het `movies-detail` component en zorg ervoor dat alle data wordt opgehaald via een graphql query met variabelen.


### Opdracht 12: Finalize Migration

Om de applicatie compleet te maken moet ook het `users` component wordt herschreven. 

> Herschrijf het users component zodat het gebruik maakt van graphql. Zorg er voor dat alle data in de tabel komt te staan.

### Bonus Opdracht

GraphQL is niet alleen voor het ophalen van informatie.  
Je kunt ook mutations uitvoeren met behulp van GraphQL.  
Je kunt dan opgeven wat voor data je terug wilt hebben na het uitvoeren van de Mutation.  

Maak een mutation voor het toevoegen van een movie.  
Lees: https://graphql.org/learn/queries/#mutations voor meer informatie over mutations.

Test je nieuwe mutation met GraphIQL
