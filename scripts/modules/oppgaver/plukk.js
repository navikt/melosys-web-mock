const SchemaValidator = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');

module.exports.sendPlukk = async (req, res) => {
  const { moduleName } = Katalog.pathnameMap['oppgaver-plukk'];

  const customResponse = {
    oppgaveID: "123456789",
    behandlingstype: "SOEKNAD",
    saksnummer: "4",
    journalpostID: "DOK_123",
    behandlingID: 4,
  };

  SchemaValidator.post(moduleName, req, res, customResponse);
};
