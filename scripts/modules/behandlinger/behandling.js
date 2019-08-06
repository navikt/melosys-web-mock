const Mock = require('../../utils/mock-util');
const SchemaGetValidator  = require('../../utils/schema-get-validator');
const Katalog = require('../../katalog');

const { moduleName } = Katalog.pathnameMap["behandlinger"];

module.exports.hentBehandling = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const pathObject = {
    pathname: 'behandling-bid-:behandlingID',
    params: {behandlingID},
  };
  return SchemaGetValidator.get(moduleName, req, res, pathObject );
};
