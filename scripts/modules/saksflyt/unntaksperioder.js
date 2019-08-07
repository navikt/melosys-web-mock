const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const SchemaValidator = require('../../utils/schemavalidator');

// [PUT ]'/saksflyt/unntaksperioder/:behandlingID/anmodning'
module.exports.anmodning = async (req, res) => {
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  SchemaValidator.put204(req, res);
};

// [PUT] '/saksflyt/unntaksperioder/:behandlingID/godkjenn'
module.exports.godkjenn = async (req, res) => {
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  return SchemaValidator.put204(req, res);
};

// [PUT] '/saksflyt/unntaksperioder/:behandlingID/innhentinfo'
module.exports.innhentinfo = async (req, res) => {
  let { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  return SchemaValidator.put204(req, res);
};


// [POST] '/saksflyt/unntaksperioder/behandlingsresultat/:behandlingID/ikkegodkjenn'
module.exports.ikkegodkjenn = async (req, res) => {
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  const { moduleName } = Katalog.pathnameMap['saksflyt-unntaksperioder-ikkegodkjenn'];

  SchemaValidator.post204(moduleName, req, res);

};

