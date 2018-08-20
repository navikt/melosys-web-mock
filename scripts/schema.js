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
const { faktaavklaring } = require('./test/faktaavklaring');

const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const GLOBBER = `${MOCK_DATA_DIR}/*/*.json`;
const watcher = require('chokidar').watch(GLOBBER, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

const testAll = () => {
  demo.test();
  kodeverk.test();
  person.testAll();
  soknad.testAll();
  vurdering.testAll();
  fagsak.testAll();
  SokFagsak.testAll();
  Saksbehandler.testAll();
  organisasjon.testAll();
  inngang.testAll();
  journalforing.testAll();
  SokOppgaver.testAll();
  oppgaver.testAll();
  faktaavklaring.testAll();
};
// Something to use when events are received.
const log = console.log.bind(console);
// See https://www.npmjs.com/package/chokidar
/*
watcher
.on('add', path => {
  const txt = path.slice(MOCK_DATA_DIR.length);
  log(`Watching ${txt}`);
})
*/
watcher.on('change', path => {
  log(`File ${path} has been changed`);
  testAll();
});
/*
.on('raw', (event, path) => {
  //log('Raw event info:', event, path, details);
  const txt = path.slice(MOCK_DATA_DIR.length);
  log('--------------------------------');
  log(`Touched ${txt}`);
  testAll();
});
*/
testAll();
console.log('\nSchema validation completed.');
