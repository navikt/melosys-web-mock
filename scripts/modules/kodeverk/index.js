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
const { finansiering } = require('./finansiering');
const { landkoder } = require('./landkoder');
const { lovvalgsbestemmelser } = require('./lovvalgsbestemmelser');
const { mottaksretning } = require('./mottaksretning');
const { oppgavetyper } = require('./oppgavetyper');
const { representerer } = require('./representerer');
const { saksstatuser } = require('./saksstatuser');
const { sakstyper } = require('./sakstyper');
const { vedleggstitler } = require('./vedleggstitler');

const kodeverk = {
  aktoerroller,
  behandlingsstatus,
  behandlingstyper,
  begrunnelser,
  dokumenttitler,
  dokumenttyper,
  finansiering,
  landkoder,
  lovvalgsbestemmelser,
  mottaksretning,
  oppgavetyper,
  representerer,
  saksstatuser,
  sakstyper,
  vedleggstitler,
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
