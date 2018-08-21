const argv = require('yargs').argv;
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

const Utils = require('./modules/utils');

const katalogMap = new Map([
  ['demo', demo],
  ['kodeverk', kodeverk],
  ['personer', person],
  ['soknader', soknad],
  ['vurdering', vurdering],
  ['fagsaker', fagsak],
  ['sok/fagsaker', SokFagsak],
  ['saksbehandler', Saksbehandler],
  ['organisasjoner', organisasjon],
  ['inngang', inngang],
  ['journalforing', journalforing],
  ['oppgaver/sok', SokOppgaver],
  ['oppgaver', oppgaver],
  ['faktaavklaring', faktaavklaring],
]);

const testAll = () => {
  katalogMap.forEach((katalog) => katalog.testAll());
};
const testOne = path => {
  const katalog = Utils.katalogNavn(path);
  katalogMap.get(katalog).testOne(path);
};

if (argv.watch) {
  console.log('Watching all mock_data files for changes. CTRL-C to quit, monitoring.');
  const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
  const GLOBBER = `${MOCK_DATA_DIR}/*/*.json`;
  const watcher = require('chokidar').watch(GLOBBER, {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });
  watcher.on('change', path => {
    testOne(path);
  });
}

testAll();
console.log('\nSchema validation completed.\n');
