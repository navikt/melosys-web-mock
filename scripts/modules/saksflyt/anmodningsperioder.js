const Mock = require('../../utils/mock-util');
const Utils = require('../../utils/utils');
const SchemaPostValidator  = require('../../utils/schema-post-validator');


module.exports.send = (req, res) => {
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);

  const schemaNavn = 'saksflyt-anmodningsperioder-post-schema.json';
  const label = 'Saksflyt::anmodningsperioder';

  try {
    const body = req.body;
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const valid = SchemaPostValidator.test(label, schemaNavn, jsBody);
    console.log(valid);
    return valid ? res.status(204).send() : SchemaPostValidator.valideringFeil(req, res);
  }
  catch(err) {
    Mock.serverError(req, res, err);
  }
};

