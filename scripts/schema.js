const argv = require('yargs').argv;
const fs = require('fs');

const { demo } = require('./test/demo');
const Anmodningsperioder = require('./test/anmodningsperioder');
const { person } = require('./test/person');
const { soknad } = require('./test/soknad');
const Fagsaker = require('./test/fagsaker');
const Behandlinger = require('./test/behandlinger');
const { Saksbehandler } = require('./test/saksbehandler');
const { organisasjon } = require('./test/organsisasjon');
const { lovvalgsperioder } = require('./test/lovvalgsperioder');
const { opprinneligLovvalgsperiode } = require('./test/opprinneligLovvalgsperiode');
const { inngang } = require('./test/inngang');
const { journalforing } = require('./test/journalforing');
const Oppgaver = require('./test/oppgaver');
const { avklartefakta } = require('./test/avklartefakta');
const { vilkar } = require('./test/vilkar');
const { dokumenter } = require('./test/dokumenter');
const { eessi } = require('./test/eessi');

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
  ['anmodningsperioder', Anmodningsperioder.anmodningsperioder],
  ['anmodningsperioder/svar', Anmodningsperioder.svar],
  ['personer', person],
  ['soknader', soknad],
  ['fagsaker', Fagsaker.fagsak],
  ['fagsaker/aktoerer', Fagsaker.aktoer],
  ['fagsaker/kontaktopplysninger', Fagsaker.kontaktopplysninger],
  ['sok/fagsaker', Fagsaker.sok],
  ['saksbehandler', Saksbehandler],
  ['organisasjoner', organisasjon],
  ['lovvalgsperioder', lovvalgsperioder],
  ['opprinneligLovvalgsperiode', opprinneligLovvalgsperiode],
  ['inngang', inngang],
  ['journalforing', journalforing],
  ['oppgaver', Oppgaver.oppgaver],
  ['oppgaver/sok', Oppgaver.sok],
  ['avklartefakta', avklartefakta],
  ['vilkar', vilkar],
  ['dokumenter', dokumenter],
  ['behandlinger/behandling', Behandlinger.behandling],
  ['behandlinger/medlemsperioder', Behandlinger.medlemsperioder],
  ['behandlinger/resultat', Behandlinger.resultat],
  ['eessi', eessi],
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
console.log();
console.dir(Schema.oppsummering());
console.log('\nSchema validation completed.\n');
