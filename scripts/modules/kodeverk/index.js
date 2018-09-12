/**
 * Kodeverk.
 * @module
 */
const { behandlingsstatus } = require('./behandlingsstatus');
const { behandlingstyper } = require('./behandlingstyper');
const { begrunnelser } = require('./begrunnelser');
const { dokumenttitler } = require('./dokumenttitler');
const { finansiering } = require('./finansiering');
const { landkoder } = require('./landkoder');
const { oppgavetyper } = require('./oppgavetyper');
const { sakstyper } = require('./sakstyper');
const { vedleggstitler } = require('./vedleggstitler');

const kodeverk = {
  behandlingsstatus,
  behandlingstyper,
  begrunnelser,
  landkoder,
  sakstyper,
  oppgavetyper,
  vedleggstitler,
  dokumenttitler,
  finansiering,
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
