const Utils = require('../../utils/utils');
const Mock = require('../../utils/mock-util');

const SchemaPostValidator  = require('../../utils/schema-post-validator');

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

// [PUT ]'/saksflyt/unntaksperioder/:behandlingID/anmodning'
module.exports.anmodning = (req, res) => {
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);

  return res.status(204).send();
};
// [POST] '/saksflyt/unntaksperioder/behandlingsresultat/:behandlingID/ikkegodkjenn'
module.exports.ikkegodkjenn = async (req, res) => {
  let { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);

  const schemaNavn = 'saksflyt-unntaksperiode-post-schema.json';
  const label = 'Saksflyt::Unntaksperiode:ikkeGodkjenn';

  try {
    const body = req.body;
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const valid = SchemaPostValidator.test(label, schemaNavn, jsBody);
    return valid ? res.status(204).send() : SchemaPostValidator.valideringFeil(req, res);
  }
  catch(err) {
    Mock.serverError(req, res, err);
  }
};

