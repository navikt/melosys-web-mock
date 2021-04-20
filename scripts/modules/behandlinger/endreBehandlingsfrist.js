const Mock = require("../../utils/mock-util");
const SchemaValidator = require("../../utils/schemavalidator");
const Katalog = require("../../katalog");

const { moduleName } = Katalog.pathnameMap[
  "behandlinger-endrebehandlingsfrist"
];

module.exports.endreBehandlingsfrist = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  SchemaValidator.post(moduleName, req, res);
};
