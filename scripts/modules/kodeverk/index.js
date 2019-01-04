/**
 * Hent kodeverk
 * @param req
 * @param res
 */
const Kodeverk = require('melosys-kodeverk');

module.exports.hent = (req, res) => {
  res.json(Kodeverk.kodeverk);
};

module.exports.hentset = (req, res) => {
  res.json(Kodeverk.kodeset);
};
