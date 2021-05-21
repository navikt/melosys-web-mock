# User Guide
## Mock web server
Serveren startes med: `npm start`

To request typer er støttet
* [GET] mock data filer fra `mock_data` katalogen
* [POST] tar imot req.body og kjører schema validering på body

## Autentisering til github packages
Github packages krever en token ved npm install. Den kan settes slik:
https://help.github.com/en/github/managing-packages-with-github-packages/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages

## Mock data, Schema og validering
Mock data valideres vha JSON Schema.
* `npm run schema`

Schema skriptet enumerer alle importerte schema, kartlegger alle kataloger i mock_data.
Itererer og validerer alle mock data filer hver katalog med assosiert schema.

## Testing av [POST] body data
* Start mock serveren `npm start`
* Åpnet nytt shell og kjør `npm run post`

Skriptet post, enumerer alle endepunkter med [POST] actions, og leser post mock data, og sender dem til mock serveren og rapporterer success eller failed schema validering.

# Hvordan bidra

I Melosys-prosjektet brukes JSON-schema til å definere kontrakten mellom frontend og backend. Det er derfor viktig å ha et sett med konvensjoner for å opprettholde høy kvalitet og gjøre det enklere å forvalte mock og schema.

### Mock-data

Alle mock-data skal valideres mot JSON-schema. For å oppnå dette, må vi så langt det lar seg gjøre unngå hardkoding av filnavn, slik at det er mulig å dynamisk levere og validere filer per endpoint.

### JSON-schema

* `$id` skal namespaces til `http://melosys.nav.no/schemas/${filnavn}` slik at dynamisk inkludering av schema fungerer frontend og backend
* repeterende subschema defineres i `definitions`
  * lokalt hvis subschema kun brukes i ett schema
  * i `definitions-schema.json` hvis subschema brukes i flere
* ...

## Kodegjennomgang

En PR vurderes i henhold til

* kodekvalitet
* best practice
* prosjektspesifikke konvensjoner
