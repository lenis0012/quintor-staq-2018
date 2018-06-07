# Staq - Angular

Dit project is gegenereerd met behulp van de  [Angular CLI](https://github.com/angular/angular-cli) versie 1.6.8.

## Development server

Om het project op te starten run je `ng serve -pc proxy.conf.json`. de `-pc` zorgt er voor dat er een proxy wordt gebruik voor alle api calls naar `/api/*`. Deze zullen, zoals geconfigureerd in `proxy.conf.js`, wordt herleid naar `http://localhost:8080` (waar de backend draait).

##### Meer hulp met de CLI?

Voor meer informatie over de Angular CLI gebruik `ng help` of kijk in de [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
