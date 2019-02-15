# melosys-web-mock
##### Express mock server
```
cd ~/Dev/NAV/Dev/melosys-web-mock (develop)
$ npm run happycase

> melosys-web-mock@0.1.0 amock C:\Users\B150245\Dev\NAV\BitBucket\melosys-web-mock
> node scripts/mock_api_server.js

Test MeloSys mock API server running on http://localhost:3002/api
```
**Proxy Routes**
/api

**Endpoints**

*Saksbehandler*

[GET] http://localhost:3002/api/saksbehandler

*Sok Fagsaker*

[GET] http://localhost:3002/api/sok/fagsaker?fnr=05056335023

Alle fagsaker

http://localhost:3002/api/sok/fagsaker

*Opprett ny fagsak*

[GET] http://localhost:3002/api/fagsaker/ny/:fnr

*Fagsaker*

[GET] http://localhost:3002/api/fagsaker/:snr

*Søknader*

[GET] http://localhost:3002/api/soknader/:bid

[POST] http://localhost:3002/api/soknader/:bid

```
{"soknadDokument":{"id":"12345","arbeidUtland":{"arbeidsland":["ES","DK"],"arbeidsperiode":{"fom":"2018-01-01","tom":"2018-06-01"},"arbeidsandelNorge":33.3,"arbeidsandelUtland":66.6,"arbeidsstedUtland":null,"bostedsland":"SE","erstatterTidligereUtsendt":false},"foretakUtland":{"foretakUtlandNavn":"Volkswagen AG","foretakUtlandOrgnr":"1122334444","foretakUtlandAdresse":null},"oppholdUtland":{"oppholdsland":"DE","oppholdsPeriode":{"fom":"2018-01-01","tom":"2018-06-01"},"studentIEOS":false,"studentFinansiering":"Beskrivelse av hvordan studiene finansieres","studentSemester":"2018/2019","studieLand":"SE"},"arbeidNorge":{"arbeidsforholdOpprettholdIHelePerioden":true,"brukerErSelvstendigNæringsdrivende":true,"selvstendigFortsetterEtterArbeidIUtlandet":true,"brukerArbeiderIVikarbyrå":"123456789","vikarOrgnr":"Ola Nordmann 22334455","flyendePersonellHjemmebase":"Flybasen Int. Airport, ....","ansattPaSokkelEllerSkip":"sokkel | skip","navnSkipEllerSokkel":"Trym-sokkelen","sokkelLand":"SE","skipFartsomrade":"Europeisk fart","skipFlaggLand":"SE"},"juridiskArbeidsgiverNorge":{"antallAnsatte":350,"antallAdminAnsatte":250,"antallAdminAnsatteEOS":75,"andelOmsetningINorge":78.5,"andelKontrakterINorge":50.5,"erBemanningsbyra":false,"hattDriftSiste12Mnd":true,"antallUtsendte":30},"arbeidsinntekt":{"inntektNorskIPerioden":5500,"inntektUtenlandskIPerioden":2000,"inntektNaeringIPerioden":0,"inntektNaturalYtelser":["Fri bolig","Fri bil"],"inntektErInnrapporteringspliktig":true,"inntektTrygdeavgiftBlirTrukket":true},"ovrig":{"tilleggsopplysninger":"Lang utgreiing om utsendelsen som egentlig ikke er relevant for saksbehandlingen..."}}}
```

*Faktaavklaring*

[GET] http://localhost:3002/api/faktaavklaring/:bid

[POST] http://localhost:3002/api/faktaavklaring/:bid
```
{"faktaavklaring":{"periode":{"land":["FR"],"periodeFraOgMed":"01.01.2018","periodeTilOgMed":"01.01.2019"},"aktivitet":{"aktivitetLand":["DE"]},"sysselsetting":{"sysselsettingType":"ARBEIDSTAKER"},"utsending":{"ansattINorskSelskap":true,"erstatterTidligereUtsendt":false,"utsendingMindreEnn24Mnd":true},"bostedsland":{"bekrefterFamiliebosted":null,"bekrefterDisponering":null,"bostedsLand":[]},"sektor":{"ansattISektor":"INGEN_AV_DISSE"},"virksomhet":{"antallLand":"ETT_LAND_IKKE_NORGE","aktivitetINorge":"OVER_25_PROSENT","marginaltArbeid":"MARGINALT_JA","vekslingMellomLand":"EN_ELLER_BEGGE"}},"status":{"periode":"OK","aktivitet":"OK","sysselsetting":"OK","utsending":"OK","sektor":"OK","virksomhet":"OK"}}
```


*Vurdering*

[GET] http://localhost:3002/api/vurdering/:bid

[POST] http://localhost:3002/api/vurdering/:bid
```
{"vurdering":{"lovvalgsbestemmelser":[{"artikkel":"Artikkel 12.1","betingelser":[{"krav":"Arbeidsgiver har virksomhet i landet arbeidstakeren sendes fra","resultat":"OPPFYLT"},{"krav":"Arbeidstakeren sendes til en annen medlemsstat for å utføre arbeid for arbeidsgiveren","resultat":"OPPFYLT"},{"krav":"Utenlandsoppholdet er ikke lengre enn 24 måneder","resultat":"OPPFYLT"},{"krav":"Arbeidstakeren er utsendt for å erstatte en annen person","resultat":"OPPFYLT"}]}]}}
```

*Oppgaver*

[GET] http://localhost:3002/api/oppgaver/hentMineOppgaver

[GET] http://localhost:3002/api/oppgaver/plukkoppgave
