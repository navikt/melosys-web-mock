const Mock = require('../../utils/mock-util');
const SchemaValidator = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');

// [PUT] '/saksflyt/soknader/:behandlingID/videresend'
module.exports.videresend = (req, res) => {
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  const { moduleName } = Katalog.pathnameMap['saksflyt-soknader-videresend'];
  SchemaValidator.put204(moduleName,req, res);
};

