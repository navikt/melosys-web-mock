const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const SchemaPostValidator  = require('../../utils/schema-post-validator');
const SchemaPutValidator = require('../../utils/schema-put-validator');

// [PUT ]'/saksflyt/unntaksperioder/:behandlingID/anmodning'
module.exports.anmodning = async (req, res) => {
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  SchemaPutValidator.put204(req, res);
};

// [PUT] '/saksflyt/unntaksperioder/:behandlingID/godkjenn'
module.exports.godkjenn = async (req, res) => {
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  return SchemaPutValidator.put204(req, res);
};

// [PUT] '/saksflyt/unntaksperioder/:behandlingID/innhentinfo'
module.exports.innhentinfo = async (req, res) => {
  let { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  return SchemaPutValidator.put204(req, res);
};


// [POST] '/saksflyt/unntaksperioder/behandlingsresultat/:behandlingID/ikkegodkjenn'
module.exports.ikkegodkjenn = async (req, res) => {
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  const { moduleName } = Katalog.pathnameMap['saksflyt-unntaksperioder-ikkegodkjenn'];

  SchemaPostValidator.post204(moduleName, req, res);

};

