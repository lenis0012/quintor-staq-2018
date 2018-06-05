<!--
What, Who, Where, When, Why, How
-->

## Reactive Programming

* Bart Kerkvliet
* Tim Sijstermans

---

## Wie zijn Bart en Tim?

Quintor Den Haag bla bla KPN IoT bla bla

---

## Reactive what!?

> Readily responsive to a stimulus -- Merriam Webster

---

## Reactive what!?

* Datastreams <!-- .element: class="fragment" -->
* Asynchronous/Non-blocking <!-- .element: class="fragment" -->
* Design principle <!-- .element: class="fragment" -->

Note:
Wat is reactive programming?

In reactive programming staan datastreams en asynchrone verwerking voorop.
- Datastreams -> Reageren op data, dus push en geen pull meganisme.
- Asynchrone verwerking -> Betere user experience en beter gebruik van threads (resources)
- Reactive Programming vergt een andere manier van denken en is dan ook meer een
andere design stijl.

--

## Reactive Manifesto

* Responsive <!-- .element: class="fragment" -->
* Resilient <!-- .element: class="fragment" -->
* Elastic <!-- .element: class="fragment" -->
* Message Driven <!-- .element: class="fragment" -->

Note:
Reactive Manifesto is voor systemen, maar veel geldt ook voor reactive programming.

Het systeem reageert op een tijdige manier.

Bij fouten blijft het systeem reageren, dit kan door extra replicas, toe te
voegen. In de core is het vooral isolatie van taken. Lose coupling is dan ook
belangrijk om resilient en schaalbaar te zijn. Door de lose coupling blijven
fouten ook binnen de "container" en beinvloeden ze niet het hele systeem.

Door de losse koppeling is het makkelijk om het aantal replica's te schalen.
Hierdoor blijft het systeem responsive onder verschillende loads. Verder kan
met behulp van backpressure de source worden gecontroleerd. Hiermee kan de
source verteld worden om berichten langzamer door te sturen. Dit vereist
uiteraard wel dat er geen centrale bottleneck is waar alles gaat ophopen.

De losse koppeling wordt gerealiseerd met asynchrone berichten en verwerking
in apparte threads. 

---

## Reactive who?

* End-user <!-- .element: class="fragment" -->
* Scalable <!-- .element: class="fragment" -->
* Data processing <!-- .element: class="fragment" -->
* Everyone? <!-- .element: class="fragment" -->

Note:
Als eerst is er een voordeel voor de eindgebruiker, omdat deze een betere
ervaring krijgt als de applicatie soepel loopt en geen "freezes" heeft.

Reactive Programming is message based en daarom ook makkelijk te schalen.
Inputs kunnen over meerdere instanties worden gespreid. Dit zorgt dus voor een
systeem dat altijd responsive KAN zijn.

Verder is reactive programming ideaal voor het verwerken van data. Met
behulp van backpressure is bijvoorbeeld te bepalen hoe snel data verwerkt wordt.

---

## Reactive where?

### Everywhere <!-- .element: class="fragment" -->

Note:
Reactive programming is overal toe te passen, maar is niet in elke situatie de
juiste tool.

---

## Reactive when?

* Highly interactive systems <!-- .element: class="fragment" -->
* Data processing is a central part of your application <!-- .element: class="fragment" -->

Note:
Dus wanneer pas je het toe?

Als er veel interactie is met het systeem. Gebruikers zijn tegenwoordig gewent
aan real-time feedback.

Door het gebruik van messages is het uitermate geschikt voor data processing

---

## Reactive why?

* Better abstraction of code <!-- .element: class="fragment" -->
* Solves a problem <!-- .element: class="fragment" -->
* Better utilize resources <!-- .element: class="fragment" -->

---

## Reactive how?

* Frameworks <!-- .element: class="fragment" -->
    * RxJava <!-- .element: class="fragment" -->
    * Project Reactor <!-- .element: class="fragment" -->
    * Akka <!-- .element: class="fragment" -->
    * Vert.x <!-- .element: class="fragment" -->

Note:
Nu wordt het interessant en gaan we over naar het HOE. HOE werkt reactive programming?
Maar eerst welke frameworks zijn er?

--

## Data Types

|          | RxJava   | Reactor | Akka   |
|----------|----------|---------|--------|
| **One**  | Single   | Mono    | Source |
| **Many** | Flowable | Flux    | Source |   

--

## Java 9 Flow API

* Only interfaces and no implementation <!-- .element: class="fragment" -->

Note:
Al die Frameworks, maar hoe zit het dan met de Java 9 Flow API?

--

## Marble Diagrams

* Easy way to explain functions

![Marble Diagram](images/marble-filter.png)

--

## Streams vs Reactive Programming

* Java Streams Pull
* Reactive Programming Push

--

## Examples

example

--

## Opdrachten

--

##### Opdracht 1

```
package demo 
 
fun main(args : Array<String>) { 
  println("Hello, world!") 
}
```

---

## Tips

Beware of legacy Spring example and make sure to copy StackOverflow examples using Spring 5 or up ;)

---

### Bedankt

* Slides zijn beschikbaar op quintor.info
