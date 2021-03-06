const SchemaValidator  = require('../../utils/schemavalidator');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');

const { moduleName } = Katalog.pathnameMap["behandlinger-resultat"];
/**
 * hent
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.hentBehandlingsResultat = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const mockpathObject = {
    pathname: 'behandlingsresultat-bid-:behandlingID',
    params: {behandlingID},
  };
  return SchemaValidator.get(moduleName, req, res, mockpathObject);
};
