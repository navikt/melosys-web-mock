const Mock = require('../../utils/mock-util');
const Utils = require('../utils');
const { pathObject2Filename } = require('../../utils/pathnames');
const { MOCK_DATA_DIR } = require('../../../mock.config');

module.exports.get = async (moduleName, req, res, pathObject = {}) => {
  try {
    const GET_DIR = `${MOCK_DATA_DIR}/${moduleName}`;
    let mockfile = `${GET_DIR}/${moduleName}.json5`;
    if (pathObject.pathname) {
      const filename = pathObject2Filename(pathObject, '-');
      mockfile = `${GET_DIR}/${filename}.json5`;
    }
    const data = await Utils.readJsonAndParseAsync(mockfile);
    return res.json(data);
  }
  catch(err) {
    Mock.serverError(req, res, err);
  }
};

module.exports.getPDF = (moduleName, req, res, pdfpath) => {
  if (!pdfpath) {
    return Mock.badRequestParam(req, res, 'Mangler pdfpath');
  }
  try {
    res.type('application/pdf');
    res.sendFile(pdfpath);
  }
  catch(err) {
    Mock.serverError(req, res, err);
  }
};
