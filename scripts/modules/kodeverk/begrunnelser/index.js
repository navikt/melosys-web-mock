
const { bosted } = require('./bosted');
const { forutgaendeMedlemskap } = require('./forutgaendeMedlemskap');
const { sokkelEllerSkip } = require('./sokkelEllerSkip');
const { opphold } = require('./opphold');
const { vesentligVirksomhet } = require('./vesentligVirksomhet');
const { normaltDriverVirksomhet } = require('./normaltDriverVirksomhet');
const { artikkel12_1 } = require('./artikkel12.1');
const { artikkel12_2 } = require('./artikkel12.2');
const { artikkel16_1_anmodning } = require('./artikkel16.1_anmodning');

const begrunnelser = {
  bosted,
  forutgaendeMedlemskap,
  sokkelEllerSkip,
  opphold,
  vesentligVirksomhet,
  normaltDriverVirksomhet,
  artikkel12_1,
  artikkel12_2,
  artikkel16_1_anmodning,
};

module.exports.begrunnelser = begrunnelser;
