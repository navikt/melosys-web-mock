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
const { oppgavetyper } = require('./oppgavetyper');
const { representerer } = require('./representerer');
const { rolletyper } = require('./rolletyper');
const { sakstyper } = require('./sakstyper');
const { vedleggstitler } = require('./vedleggstitler');
const { lovvalgsbestemmelser } = require('./lovvalgsbestemmelser');

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
  oppgavetyper,
  representerer,
  rolletyper,
  sakstyper,
  vedleggstitler
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
