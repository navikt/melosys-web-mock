const Katalog = require('../../katalog');
const Mock = require('../../utils/mock-util');
const { moduleName } = Katalog.pathnameMap["dokumenter-v2-mulige-mottakere"];

const SchemaValidator = require('../../utils/schemavalidator');


module.exports.hentMuligeMottakere = (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }

  const mockpathObject = {
    pathname: 'mulige-mottakere-mangelbrev_arbeidsgiver'
  };

  return SchemaValidator.postFromFile(moduleName, req, res, mockpathObject, moduleName);
};


