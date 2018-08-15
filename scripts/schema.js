const { demo } = require('./test/demo');
const { kodeverk } = require('./test/kodeverk');
const { person } = require('./test/person');
const { soknad } = require('./test/soknad');
const { vurdering } = require('./test/vurdering');
const { fagsak } = require('./test/fagsak');
const { SokFagsak } = require('./test/sok-fagsak');
const { Saksbehandler } = require('./test/saksbehandler');

demo.test();
kodeverk.test();
person.test();
soknad.test();
vurdering.test();
fagsak.test();
SokFagsak.test();
Saksbehandler.test();

console.log('\nSchema validation completed.');
