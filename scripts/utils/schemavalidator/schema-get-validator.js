const Mock = require('../../utils/mock-util');
const Utils = require('../utils');
const { pathObject2String } = require('../../utils/pathnames');
const { MOCK_DATA_DIR } = require('../../../mock.config');

module.exports.get = async (moduleName, req, res, pathObject = {}) => {
  try {
    const GET_DIR = `${MOCK_DATA_DIR}/${moduleName}`;
    let mockfile = `${GET_DIR}/${moduleName}.json`;
    if (pathObject.pathname) {
      const pathname = pathObject2String(pathObject, '-');
      mockfile = `${GET_DIR}/${pathname}.json`;
    }
    const data = await Utils.readJsonAndParseAsync(mockfile);
    return res.json(data);
  }
  catch(err) {
    Mock.serverError(req, res, err);
  }
};
