const ERR = require('../../utils/errors');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const {  MOCK_DATA_DIR } = require('../../../mock.config');
const { moduleName } = Katalog.pathnameMap['dokumenter-pdf'];

module.exports.hent = (req, res) => {
  const { journalpostID, dokumentID } = req.params;
  if(!req.accepts('application/pdf')) {
    const melding = ERR.notAcceptable406();
    return res.status(406).send(melding);
  }
  if (!journalpostID) {
    return Mock.manglerParamjournalpostID(req, res);
  }
  if (!dokumentID) {
    return Mock.manglerParamDokumentID(req, res);
  }
  try {
    const mockfile = `${MOCK_DATA_DIR}/${moduleName}/DOK_${journalpostID}-${dokumentID}.pdf`;
    res.type('application/pdf');
    res.sendFile(mockfile);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
