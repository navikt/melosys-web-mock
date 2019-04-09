const Utils = require('../utils/utils');
const Mock = require('../utils/mock-util');

const SchemaPostValidator  = require('../utils/schema-post-validator');

const postValidator = (req, res, label, schemaNavn) => {
  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  const valid = SchemaPostValidator.test(label, schemaNavn, jsBody);
  return valid ? res.status(204).send() : SchemaPostValidator.valideringFeil(req, res);
};

/**
 * fattet
 * @param req
 * @param res
 */
module.exports.fattet = (req, res) => {
  const schemaNavn = 'vedtak-post-schema.json';

  const label = 'Vedtak:fattet';
  try {
    postValidator(req, res, label, schemaNavn);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};

/**
 * endreperiode
 * @param req
 * @param res
 */
module.exports.endreperiode = (req, res) => {
  const schemaNavn = 'vedtak-endre-periode-schema.json';
  const label = 'Vedtak:endre';

  try {
    postValidator(req, res, label, schemaNavn);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
