const Mock = require('../../utils/mock-util');
const Utils = require('../utils');

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
