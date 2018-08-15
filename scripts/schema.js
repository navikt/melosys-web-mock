const { demo } = require('./test/demo');
const { kodeverk } = require('./test/kodeverk');
const { person } = require('./test/person');
const { soknad } = require('./test/soknad');
const { vurdering } = require('./test/vurdering');
const { fagsak } = require('./test/fagsak');
const { SokFagsak } = require('./test/sok-fagsak');
const { Saksbehandler } = require('./test/saksbehandler');
const { organisasjon } = require('./test/organsisasjon');
const { inngang } = require('./test/inngang');
const { journalforing } = require('./test/journalforing');
const { SokOppgaver } = require('./test/sok-oppgaver');
const { oppgaver } = require('./test/oppgaver');

demo.test();
kodeverk.test();
person.test();
soknad.test();
vurdering.test();
fagsak.test();
SokFagsak.test();
Saksbehandler.test();
organisasjon.test();
inngang.test();
journalforing.test();
SokOppgaver.test();
oppgaver.test();

console.log('\nSchema validation completed.');
