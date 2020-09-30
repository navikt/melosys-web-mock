# melosys-web-mock
Melosys-web-mock er et mock-api av https://github.com/navikt/melosys-api for lokal testing/kjøring av https://github.com/navikt/melosys-web.

### Kjøring
```
npm install
npm run happycase
```

### Tester
Tester kjøres i github actions ved push på alle brancher.
De kan kjøres lokalt ved å først starte en instanse av mocken med `npm run happycase`, deretter `npm run mock` i nytt terminalvindu.

### Lokal versjon av melosys-schema
Når man jobber med melosys-schema, er det nyttig å kunne teste schema-endringer man har gjort lokalt, uten å måtte publisere schemaet til et registry først.
Dette kan gjøres ved hjelp av `npm link`.

I melosys-schema directory:
```
npm link
```
I melosys-web-mock directory:
```
npm link melosys-schema
```
