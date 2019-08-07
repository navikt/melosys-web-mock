const { MOCK_DATA_DIR } = require('../../../mock.config');
const Utils = require('../../utils/utils');
const SchemaValidator = require('../../utils/schemavalidator');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
/**
 * sendPlukk
 * @param req
 * @param res
 */
module.exports.sendPlukk = async (req, res) => {
  const { moduleName } = Katalog.pathnameMap['oppgaver-plukk'];
  try {
    // Read custom response data
    const mock_response_file = `${MOCK_DATA_DIR}/${moduleName}/${moduleName}.json`;
    const mock_response = await Utils.readJsonAndParseAsync(mock_response_file);
    SchemaValidator.post(moduleName, req, res, mock_response);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
