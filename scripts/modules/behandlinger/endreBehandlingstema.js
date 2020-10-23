const Mock = require('../../utils/mock-util');
const SchemaValidator  = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap["behandlinger-endrebehandlingstema"];


module.exports.hentMuligeBehandlingstema = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const mockpathObject = {
    pathname: 'muligebehandlingstema-bid-:behandlingID',
    params: {behandlingID},
  };
  return SchemaValidator.get(moduleName, req, res, mockpathObject);
};

/**
 * perioder
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.endreBehandlingstema = (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  SchemaValidator.post(moduleName, req, res);
};
