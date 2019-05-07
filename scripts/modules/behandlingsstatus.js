const Utils = require('../utils/utils');
const SchemaPostValidator  = require('../utils/schema-post-validator');

const Mock = require('../utils/mock-util');
/*
const { MOCK_DATA_DIR } = require('../../mock.config');
const BEHANDLINGSSTATUS_MOCK_DIR = `${MOCK_DATA_DIR}/behandlingsstatus`;
*/
/**
 * status
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.status = (req, res) => {
  const schemaNavn = 'behandlinger-status-post-schema.json';

  try {
    const { behandlingID } = req.params;
    if (!behandlingID) {
      return Mock.manglerParamBehandlingsID(req, res);
    }
    const { body } = req;
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const label = 'Behandlinger:status';
    const valid = SchemaPostValidator.test(label, schemaNavn, jsBody);

    return valid ? res.status(204).send() : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
