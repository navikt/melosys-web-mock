/**
 * Kodeverk.
 * @module
 */
const { aktoerroller } = require('./aktoerroller');
const { behandlingsstatus } = require('./behandlingsstatus');
const { behandlingstyper } = require('./behandlingstyper');
const { begrunnelser } = require('./begrunnelser');
const { dokumenttitler } = require('./dokumenttitler');
const { dokumenttyper } = require('./dokumenttyper');
const { fartsomrader } = require('./fartsomrader');
const { finansiering } = require('./finansiering');
const { landkoder } = require('./landkoder');
const { lovvalgsbestemmelser } = require('./lovvalgsbestemmelser');
const { lovvalgsunntak } = require('./lovvalgsunntak');
const { mottaksretning } = require('./mottaksretning');
const { oppgavetyper } = require('./oppgavetyper');
const { representerer } = require('./representerer');
const { sakstyper } = require('./sakstyper');

const kodeverk = {
  aktoerroller,
  behandlingsstatus,
  behandlingstyper,
  begrunnelser,
  dokumenttitler,
  dokumenttyper,
  fartsomrader,
  finansiering,
  landkoder,
  lovvalgsbestemmelser,
  lovvalgsunntak,
  mottaksretning,
  oppgavetyper,
  representerer,
  sakstyper,
};

module.exports.kodeverk = kodeverk;

/**
 * Hent kodeverk
 * @param req
 * @param res
 */
module.exports.hent = (req, res) => {
  res.json(kodeverk);
};
