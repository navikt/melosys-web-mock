
const { bosted } = require('./bosted');
const { forutgaendeMedlemskap } = require('./forutgaendeMedlemskap');
const { ikkeSkip } = require('./ikkeSkip');
const { opphold } = require('./opphold');
const { vesentligVirksomhet } = require('./vesentligVirksomhet');
const { artikkel12_1 } = require('./artikkel12.1');

const begrunnelser = {
  bosted,
  forutgaendeMedlemskap,
  ikkeSkip,
  opphold,
  vesentligVirksomhet,
  artikkel12_1,
};

module.exports.begrunnelser = begrunnelser;
