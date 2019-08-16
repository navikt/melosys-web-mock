const Mock = require('../mock-util');
const Utils = require('../utils');

const {valideringFeil, test} = require('./helper');

module.exports.post = (moduleName, req, res, customResponse = null) => {
  const schemaNavn = `${moduleName}-post-schema.json`;
  const label = `${moduleName}:send`;

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
module.exports.post204 = (moduleName, req, res) => {
  const schemaNavn = `${moduleName}-post-schema.json`;
  const label = `${moduleName}:send`;

  try {
    const body = req.body;
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const valid = test(label, schemaNavn, jsBody);
    return valid ? res.status(204).json() : valideringFeil(req, res);
  }
  catch(err) {
    Mock.serverError(req, res, err);
  }
};

module.exports.postSendPDF = (moduleName, req, res, pdfpath) => {
  const schemaNavn = `${moduleName}-post-schema.json`;
  const label = `${moduleName}:pdf`;
  if (!pdfpath) {
    return Mock.badRequestParam(req, res, 'Mangler pdfpath');
  }
  try {
    const body = req.body;
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const valid = test(label, schemaNavn, jsBody);
    if (!valid) {
      return valideringFeil(req, res);
    }

    res.type('application/pdf');
    res.sendFile(pdfpath);
  }
  catch(err) {
    Mock.serverError(req, res, err);
  }
};
