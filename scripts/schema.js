const { demo } = require('./test/demo');
const { kodeverk } = require('./test/kodeverk');
const { person } = require('./test/person');
const { soknad } = require('./test/soknad');
const { vurdering } = require('./test/vurdering');
const { fagsak } = require('./test/fagsak');
const { SokFagsak } = require('./test/sok-fagsak');
const { Saksbehandler } = require('./test/saksbehandler');
const { organisasjon } = require('./test/organsisasjon');
const { journalforing } = require('./test/journalforing');

demo.test();
kodeverk.test();
person.test();
soknad.test();
vurdering.test();
fagsak.test();
SokFagsak.test();
Saksbehandler.test();
organisasjon.test();
journalforing.test();

console.log('\nSchema validation completed.');
