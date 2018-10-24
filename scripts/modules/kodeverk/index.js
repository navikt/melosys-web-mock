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
const { rolletyper } = require('./rolletyper');
const { sakstyper } = require('./sakstyper');
const { vedleggstitler } = require('./vedleggstitler');
const { lovvalgsbestemmelser } = require('./lovvalgsbestemmelser');
const { lovvalgsunntak } = require('./lovvalgsunntak');
const { dokumenttyper } = require('./dokumenttyper');

const kodeverk = {
  behandlingsstatus,
  behandlingstyper,
  begrunnelser,
  dokumenttitler,
  finansiering,
  landkoder,
  lovvalgsbestemmelser,
  oppgavetyper,
  rolletyper,
  sakstyper,
  vedleggstitler,
  lovvalgsunntak,
  dokumenttyper
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
