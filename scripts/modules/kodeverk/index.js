/**
 * Kodeverk.
 * @module
 */
const { aktoerroller } = require('./aktoerroller');
const { behandlingsstatus } = require('./behandlingsstatus');
const { behandlingstyper } = require('./behandlingstyper');
const { begrunnelser } = require('./begrunnelser');
const { dokumenttitler } = require('./dokumenttitler');
const { finansiering } = require('./finansiering');
const { landkoder } = require('./landkoder');
const { oppgavetyper } = require('./oppgavetyper');
const { representerer } = require('./representerer');
const { sakstyper } = require('./sakstyper');
const { saksstatuser } = require('./saksstatuser');
const { vedleggstitler } = require('./vedleggstitler');
const { vesentligvirksomhet } = require('./begrunnelser/vesentligvirksomhet');

const kodeverk = {
  aktoerroller,
  behandlingsstatus,
  behandlingstyper,
  begrunnelser,
  dokumenttitler,
  finansiering,
  landkoder,
  oppgavetyper,
  representerer,
  sakstyper,
  saksstatuser,
  vedleggstitler,
  vesentligvirksomhet,
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
