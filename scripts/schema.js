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


const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const GLOBBER = `${MOCK_DATA_DIR}/*/*.json`;
const watcher = require('chokidar').watch(GLOBBER, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

const testAll = () => {
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
};

// Something to use when events are received.
const log = console.log.bind(console);
// See https://www.npmjs.com/package/chokidar
watcher
.on('add', path => {
  const txt = path.slice(MOCK_DATA_DIR.length);
  log(`Watching ${txt}`);
})
.on('change', path => {
  log(`File ${path} has been changed`);
  testAll();
})
.on('raw', (event, path) => {
  //log('Raw event info:', event, path, details);
  const txt = path.slice(MOCK_DATA_DIR.length);
  log('--------------------------------');
  log(`Touched ${txt}`);
  testAll();
});

testAll();
console.log('\nSchema validation completed.');
