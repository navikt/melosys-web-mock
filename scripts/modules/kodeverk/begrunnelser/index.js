
const { bosted } = require('./bosted');
const { forutgaendeMedlemskap } = require('./forutgaendeMedlemskap');
const { ikkeSkip } = require('./ikkeSkip');
const { opphold } = require('./opphold');
const { vesentligVirksomhet12_1 } = require('./vesentligVirksomhet12_1');
const { vesentligVirksomhet12_2 } = require('./vesentligVirksomhet12_2');
const { artikkel12_1 } = require('./artikkel12.1');
const { artikkel16_1_anmodning } = require('./artikkel16.1_anmodning');

const begrunnelser = {
  bosted,
  forutgaendeMedlemskap,
  ikkeSkip,
  opphold,
  vesentligVirksomhet12_1,
  vesentligVirksomhet12_2,
  artikkel12_1,
  artikkel16_1_anmodning,
};

module.exports.begrunnelser = begrunnelser;
