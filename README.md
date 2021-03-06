# melosys-web-mock
Mock-api av https://github.com/navikt/melosys-api for lokal testing/kjøring av https://github.com/navikt/melosys-web.

## Autentisering til github packages
Github packages krever et token ved npm install. Det kan settes slik:
https://help.github.com/en/github/managing-packages-with-github-packages/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages

## Kjøring
```
npm install
npm start
```

## Tester
Tester kjøres i github actions ved push på alle brancher.
De kan kjøres lokalt ved å først starte en instanse av mocken med `npm start`, deretter `npm test` i nytt terminalvindu.

## Lokal versjon av melosys-schema
Når man jobber med melosys-schema, er det nyttig å kunne teste schema-endringer man har gjort lokalt, uten å måtte publisere schemaet til et registry først.
Dette kan gjøres ved hjelp av `npm link`.

I melosys-schema directory:
```
npm link
```
I melosys-web-mock directory:
```
npm link @navikt/melosys-schema
```
