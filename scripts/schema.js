const argv = require('yargs').argv;
const fs = require('fs');

const { demo } = require('./test/demo');
const { kodeverk } = require('./test/kodeverk');
const { person } = require('./test/person');
const { soknad } = require('./test/soknad');
const { fagsak } = require('./test/fagsak');
const { SokFagsak } = require('./test/sok-fagsak');
const { Saksbehandler } = require('./test/saksbehandler');
const { organisasjon } = require('./test/organsisasjon');
const { lovvalgsperiode } = require('./test/lovvalgsperiode');
const { inngang } = require('./test/inngang');
const { journalforing } = require('./test/journalforing');
const { SokOppgaver } = require('./test/sok-oppgaver');
const { oppgaver } = require('./test/oppgaver');
const { avklartefakta } = require('./test/avklartefakta');
const { vilkar } = require('./test/vilkar');

const Schema = require('./test/schema-util');

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
  ['kodeverk', kodeverk],
  ['personer', person],
  ['soknader', soknad],
  ['fagsaker', fagsak],
  ['sok/fagsaker', SokFagsak],
  ['saksbehandler', Saksbehandler],
  ['organisasjoner', organisasjon],
  ['lovvalgsperiode', lovvalgsperiode],
  ['inngang', inngang],
  ['journalforing', journalforing],
  ['oppgaver/sok', SokOppgaver],
  ['oppgaver', oppgaver],
  ['avklartefakta', avklartefakta],
  ['vilkar', vilkar],
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
