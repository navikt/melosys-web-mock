const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const SchemaPostValidator  = require('../../utils/schema-post-validator');

// [PUT ]'/saksflyt/unntaksperioder/:behandlingID/anmodning'
module.exports.anmodning = (req, res) => {
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);

  return res.status(204).send();
};

// [PUT] '/saksflyt/unntaksperioder/:behandlingID/godkjenn'
module.exports.godkjenn = async (req, res) => {
  let { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);

  return res.status(204).send();
};

// [PUT] '/saksflyt/unntaksperioder/:behandlingID/innhentinfo'
module.exports.innhentinfo = async (req, res) => {
  let { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);

  return res.status(204).send();
};


// [POST] '/saksflyt/unntaksperioder/behandlingsresultat/:behandlingID/ikkegodkjenn'
module.exports.ikkegodkjenn = async (req, res) => {
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  const { moduleName } = Katalog.pathnameMap['saksflyt-unntaksperioder-ikkegodkjenn'];
  //TODO post204 !!!
  SchemaPostValidator.post(moduleName, req, res);

};

