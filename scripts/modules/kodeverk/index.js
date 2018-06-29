const { landkoder } = require('./landkoder');
const { sakstyper } = require('./sakstyper');
const { behandlingstyper } = require('./behandlingstyper');
const { behandlingsstatus } = require('./behandlingsstatus');
const { dokumentkategorier } = require('./dokumentkategorier');
const { oppgavetyper } = require('./oppgavetyper');
const { vedleggstitler } = require('./vedleggstitler');
const { dokumenttitler } = require('./dokumenttitler');
const { finansiering } = require('./finansiering');
const { begrunnelser } = require('./begrunnelser');

const kodeverk = {
  landkoder,
  sakstyper,
  behandlingstyper,
  behandlingsstatus,
  oppgavetyper,
  vedleggstitler,
  dokumenttitler,
  dokumentkategorier,
  finansiering,
  begrunnelser,
};
exports.kodeverk = kodeverk;

/**
 * Hent kodeverk
 * @param req
 * @param res
 */
exports.hent = (req, res) => {
  res.json(kodeverk);
};
