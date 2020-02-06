const Mock = require('../../utils/mock-util');
const SchemaValidator = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');

module.exports.avvis = (req, res) => {
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  const { moduleName } = Katalog.pathnameMap['saksflyt-utpeking-avvis'];
  SchemaValidator.post(moduleName,req, res);
};
