const _ = require('lodash');
const SchemaValidator  = require('../utils/schemavalidator');
const Katalog = require('../katalog');
const { moduleName } = Katalog.pathnameMap.saksbehandler;

module.exports.hent = async (req, res) => {
  const mockSaksbehandlere = ['Z990405','Z991001'];
  const ident = _.sample(mockSaksbehandlere);
  const pathObject = {
    pathname: 'saksbehandler-:ident',
    params: { ident },
  };
  return SchemaValidator.get(moduleName, req, res, pathObject);
};
