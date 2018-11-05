
const { bosted } = require('./bosted');
const { forutgaendeMedlemskap } = require('./forutgaendeMedlemskap');
const { ikkeSkip } = require('./ikkeSkip');
const { opphold } = require('./opphold');
const { vesentligVirksomhet } = require('./vesentligVirksomhet');
const { artikkel12_1 } = require('./artikkel12.1');
const { artikkel16_1_anmodning } = require('./artikkel16.1_anmodning');

const begrunnelser = {
  bosted,
  forutgaendeMedlemskap,
  ikkeSkip,
  opphold,
  vesentligVirksomhet,
  artikkel12_1,
  artikkel16_1_anmodning,
};

module.exports.begrunnelser = begrunnelser;
