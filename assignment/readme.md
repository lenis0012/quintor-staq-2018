# Opdrachten

## Problems with REST

### Opdracht 1: 

Navigeer naar de pagina waarop de ratings van een gebruiker staan: `/users/{id}`. Deze `id's` lopen tot en met de *671*. Op deze pagina vind je een tabel met daarin het id van de film en de beoordeling van de gebruiker. 

> Verander in de kolom `movie` de id's naar de titel van de film.

### Opdracht 2: 

Navigeer naar de pagina waarop alle filsm staan: `/movies`. Op deze pagina is een tabel met daarin een lijst van de films die terug komen uit de backend. Hierin is het id, de naam en alle genres zichtbaar

> Voeg een extra kolom toe waarin de gemiddelde beoordeling zichtbaar is.


## GraphQL

### Opdracht 1: 

**TODO backend opdracht**

### Opdracht 2: 

**TODO backend opdracht**

### Opdracht n: 

**TODO backend opdracht**

### Opdracht n+1:

Om te beginnen met GrahpQL en Apollo in angular moeten eerst de dependencies worden geinstaleerd.

[Apollo installatie handleiding](https://www.apollographql.com/docs/angular/basics/setup.html#installation)
 
> Instaleer alle dependecies voor het gebruik van Apollo in de Angular applicatie. 

### Opdracht n+2:

Om Apollo te gebruiken moet er een client worden aangemaakt in de applicatie. Dit wordt gebruikelijk is om dit in de module van de applicatie te doen. In ons geval zullen wij het doen in de `SharedModule`.

[Apollo Create](https://www.apollographql.com/docs/angular/basics/setup.html#creating-client)

> Maak de Apollo client aan in de SharedModule via `apollo.create()`. 
> Voor de URI kan `http://localhost:8080/graphql` gebruikt worden.

### Opdracht n+3a:

Tijdens de opdrachten in de backend is er een graphql schema aangemaakt dat gebruikt wordt in de API. Hierin zijn de verschillende types en uitvoerbare queries benoemd.

> Migreer de data types in `types.ts` naar de types in het schema. 

### Opdracht n+3b:

Na het migreren van de data ontbreekt er nog 1 data type: `Query`. 

> exporter een nieuwe type: `export type Query { }` vanuit het `types.ts` bestand en voeg hier alle mogelijke queries aan toe.

### Opdracht n+4:

Na het aanmaken van de apollo client en het query type kan apollo als service worden gebruikt voor alle calls naar het `/graphql` endpoint. Hiervoor kan Apollo worden geinjecteerd in het component waar hij nodig is om vervolgens met behulp van `.query<Query>()` de data op te vragen.

[Apollo Queries](https://www.apollographql.com/docs/angular/basics/setup.html#connecting-data)

> Verwijder de REST calls in het `movies-list` component en vervang deze met een graphql query die er voorzorgt dat alle data weer beschikbaar is op de pagina.

### Opdracht n+5:

In opdracht n+4 hebben we een lijst van films opgehaald. Om een specefieke film op te halen moet er een variable mee worden gegeven, namelijk het `id`. Deze variable kan naast het query object worden mee geven met de `.query<Query>()` methode. 

[Apollo Query options](https://www.apollographql.com/docs/angular/basics/queries.html#options)

> Verwijder alle data die gebruikt wordt in het `movies-detail` component en zorg ervoor dat alle data wordt opgehaald via een graphql query met variabelen.


### Opdracht n+6:

Om de applicatie compleet te maken moet ook het `users` component wordt herschreven. 

> Herschrijf het users component zodat het gebruik maakt van graphql. Zorg er voor dat alle data in de tabel komt te staan.

