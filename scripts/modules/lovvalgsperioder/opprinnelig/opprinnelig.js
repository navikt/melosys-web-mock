const Mock = require('../../../utils/mock-util');
const SchemaValidator  = require('../../../utils/schemavalidator');
const Katalog = require('../../../katalog');

module.exports.hentOpprinnelig = async (req, res) => {
  const { moduleName } = Katalog.pathnameMap['lovvalgsperioder-opprinnelig'];
  const { behandlingID} = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const mockpathObject = {
    pathname: 'opprinneligPeriode-bid-:behandlingID',
    params: {behandlingID}
  };
  SchemaValidator.get(moduleName, req, res, mockpathObject);
};
