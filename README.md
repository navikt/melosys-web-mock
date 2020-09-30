# melosys-web-mock
### Kjøring
```
npm install
npm run happycase
```

### Utvikling av melosys-schema
Når man jobber med melosys-schema, er det nyttig å kunne teste schema-endringer direkte, uten å måtte publisere schemaet til et registry først.
Det kan gjøres ved hjelp av `npm link`.

I melosys-schema directory:
```
npm link
```
I melosys-web-mock directory:
```
npm link melosys-schema
```
