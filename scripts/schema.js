const argv = require('yargs').argv;
const fs = require('fs');

const { demo } = require('./test/demo');
const { person } = require('./test/person');
const { soknad } = require('./test/soknad');
const { fagsaker, aktoerer } = require('./test/fagsaker');
const { behandlingsresultat } = require('./test/behandlingsresultat');
const { SokFagsak } = require('./test/sok-fagsak');
const { Saksbehandler } = require('./test/saksbehandler');
const { organisasjon } = require('./test/organsisasjon');
const { lovvalgsperioder } = require('./test/lovvalgsperioder');
const { inngang } = require('./test/inngang');
const { journalforing } = require('./test/journalforing');
const { SokOppgaver } = require('./test/sok-oppgaver');
const { oppgaver } = require('./test/oppgaver');
const { avklartefakta } = require('./test/avklartefakta');
const { vilkar } = require('./test/vilkar');
const { dokumenter } = require('./test/dokumenter');

const Schema = require('./utils/schema-util');

const createLogDirIfnotExists = (dir) => !fs.existsSync(dir) && fs.mkdirSync(dir);
const LOGDIR = `${process.cwd()}/logdir`;
createLogDirIfnotExists(LOGDIR);

const SCHEMA_LOG_FILE = `${LOGDIR}/schema-errors.log`;
const log4js = require('log4js');
log4js.configure({
  appenders: { schema: { type: 'file', filename: SCHEMA_LOG_FILE } },
  categories: { default: { appenders: ['schema'], level: 'error' } }
});

const katalogMap = new Map([
  ['demo', demo],
  ['personer', person],
  ['soknader', soknad],
  ['fagsaker', fagsaker.fagsak],
  ['fagsaker/aktoerer', aktoerer.aktoer],
  ['sok/fagsaker', SokFagsak],
  ['saksbehandler', Saksbehandler],
  ['organisasjoner', organisasjon],
  ['lovvalgsperioder', lovvalgsperioder],
  ['inngang', inngang],
  ['journalforing', journalforing],
  ['oppgaver/sok', SokOppgaver],
  ['oppgaver', oppgaver],
  ['avklartefakta', avklartefakta],
  ['vilkar', vilkar],
  ['dokumenter', dokumenter],
  ['behandlingsresultat', behandlingsresultat],
]);

const testAll = () => {
  katalogMap.forEach((katalog) => katalog.testAll());
};
const testOne = path => {
  const katalog = Schema.katalogNavn(path);
  katalogMap.get(katalog).testOne(path);
};

if (argv.watch) {
  const ora = require('ora');
  ora('Watching all mock_data files for changes. CTRL-C to quit.').start();

  const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
  const GLOBBER = `${MOCK_DATA_DIR}/*/*.json`;
  const IGNORE_DOT_DIRS_PATTERN = /(^|[/\\])\../;  // Ex: "~/GitHub/.git" or "C:\GitHub\.git"
  const watcher = require('chokidar').watch(GLOBBER, {
    ignored: IGNORE_DOT_DIRS_PATTERN,
    persistent: true
  });
  watcher.on('change', path => {
    testOne(path);
  });
}

testAll();
console.log('\nSchema validation completed.\n');
