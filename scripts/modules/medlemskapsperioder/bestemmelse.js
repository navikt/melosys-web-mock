const Mock = require('../../utils/mock-util');
const SchemaValidator  = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');

const { moduleName } = Katalog.pathnameMap['medlemskapsperioder-bestemmelse'];

module.exports.hentBestemmelser = async (req, res) => {
  const pathObject = {
    pathname: 'medlemskapsperioder-bestemmelse',
  };

  return SchemaValidator.get(moduleName, req, res, pathObject);
};

module.exports.opprettMedlemskapsperioderFraBestemmelse = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const pathObject = {
    pathname: 'medlemskapsperioder-bid-:behandlingID',
    params: {behandlingID},
  };

  return SchemaValidator.postFromFile(moduleName, req, res, pathObject, 'medlemskapsperioder');
};

