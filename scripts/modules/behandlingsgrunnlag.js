const Katalog = require('../katalog');
const { moduleName } = Katalog.pathnameMap.behandlingsgrunnlag;
const SchemaValidator  = require('../utils/schemavalidator');

const Mock = require('../utils/mock-util');

/**
 * Hent behandlingsgrunnlag
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const mockpathObject = {
    pathname: 'behandlingsgrunnlag-bid-:behandlingID',
    params: {behandlingID},
  };
  return SchemaValidator.get(moduleName, req, res, mockpathObject);
};

/**
 * Send behandlingsgrunnlag
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.send = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }

  const customObject = {
    mottaksdato: "2020-03-10",
    data: {
      ...req.body.data
    }
  };

  SchemaValidator.post(moduleName, req, res, customObject);
};

