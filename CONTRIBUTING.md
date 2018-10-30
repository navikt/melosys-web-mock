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
