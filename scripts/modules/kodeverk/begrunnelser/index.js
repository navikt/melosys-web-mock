
const { bosted } = require('./bosted');
const { forutgaendeMedlemskap } = require('./forutgaendeMedlemskap');
const { ikkeSkip } = require('./ikkeSkip');
const { opphold } = require('./opphold');
const { vesentligVirksomhet } = require('./vesentligVirksomhet');

const begrunnelser = {
  bosted,
  forutgaendeMedlemskap,
  ikkeSkip,
  opphold,
  vesentligVirksomhet
};

module.exports.begrunnelser = begrunnelser;
