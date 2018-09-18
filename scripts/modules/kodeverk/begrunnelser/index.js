
const { bosted } = require('./bosted');
const { forutgaendeMedlemskap } = require('./forutgaendeMedlemskap');
const { ikkeSkip } = require('./ikkeSkip');
const { opphold } = require('./opphold');
const { vesentligvirksomhet } = require('./vesentligvirksomhet');

const begrunnelser = {
  bosted,
  forutgaendeMedlemskap,
  ikkeSkip,
  opphold,
  vesentligvirksomhet
};

module.exports.begrunnelser = begrunnelser;
