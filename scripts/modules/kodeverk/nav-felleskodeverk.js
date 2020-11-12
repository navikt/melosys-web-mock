const SchemaValidator  = require('../../utils/schemavalidator');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap['kodeverk-nav-felles-hentkodeverk'];

module.exports.hentKodeverk = async (req, res) => {
  const { kodeverknavn } = req.params;
  if (!kodeverknavn) return Mock.manglerParamSaksnummer(req, res);

  const pathObject = {
    pathname: 'kodeverk-:kodeverknavn',
    params: {kodeverknavn},
  };
  return SchemaValidator.get(moduleName, req, res, pathObject);
};
