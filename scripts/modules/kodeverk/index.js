const landkoder = require('./landkoder');
const sakstyper = require('./sakstyper');
const behandlingstyper = require('./behandlingstyper');
const behandlingsstatus = require('./behandlingsstatus');
const dokumentkategorier = require('./dokumentkategorier');
const oppgavetyper = require('./oppgavetyper');
const vedleggstitler = require('./vedleggstitler');
const dokumenttitler = require('./dokumenttitler');

const kodeverk = {
  landkoder,
  sakstyper,
  behandlingstyper,
  behandlingsstatus,
  oppgavetyper,
  vedleggstitler,
  dokumenttitler,
  dokumentkategorier,
};
exports.kodeverk = kodeverk;
