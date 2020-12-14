const Mock = require('../../utils/mock-util');
const Utils = require('../utils');
const { MOCK_DATA_DIR } = require('../../../mock.config');
const { pathObject2Filename } = require('../../utils/pathnames');
const {valideringFeil, test} = require('./helper');

module.exports.put204 = async (moduleName, req, res) => {
  try {
    return res.status(204).send();
  }
  catch(err) {
    Mock.serverError(req, res, err);
  }
};

module.exports.put = (moduleName, req, res, customResponse = null) => {
  const schemaNavn = `${moduleName}-put-schema.json`;
  const label = `${moduleName}:put`;

  try {
    const body = req.body;
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const valid = test(label, schemaNavn, jsBody);
    const response = customResponse ? customResponse : jsBody;
    return valid ? res.json(response) : valideringFeil(req, res);
  }
  catch(err) {
    Mock.serverError(req, res, err);
  }
};

module.exports.putFromFile = async (moduleName, req, res, pathObject, pathObjectModuleName) => {
  try {
    const GET_DIR = `${MOCK_DATA_DIR}/${pathObjectModuleName}`;
    let mockfile = `${GET_DIR}/${pathObjectModuleName}.json5`;
    if (pathObject.pathname) {
      const filename = pathObject2Filename(pathObject, '-');
      mockfile = `${GET_DIR}/${filename}.json5`;
    }
    const data = await Utils.readJsonAndParseAsync(mockfile);

    return this.put(moduleName, req, res, data);
  }
  catch(err) {
    Mock.notFound(req, res, err);
  }
};
