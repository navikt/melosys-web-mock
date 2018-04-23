const kodeverk = require('./kodeverk');
exports.hentKodeverk = (req, res) => {
  res.json(kodeverk);
};
