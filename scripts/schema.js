const { demo } = require('./test/demo');
const { kodeverk } = require('./test/kodeverk');
const { person } = require('./test/person');
const { soknad } = require('./test/soknad');
const { vurdering } = require('./test/vurdering');

demo.test();
kodeverk.test();
person.test();
soknad.test();
vurdering.test();

console.log('\nSchema validation completed.');
