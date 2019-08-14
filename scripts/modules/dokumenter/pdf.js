const ERR = require('../../utils/errors');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const {  MOCK_DATA_DIR } = require('../../../mock.config');
const { moduleName } = Katalog.pathnameMap['dokumenter-pdf'];
const GET_DIR = `${MOCK_DATA_DIR}/${moduleName}`;

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
  // journalpostID is ignored in pdf selection for simplicity.
  // documentID, is used in dropdown list, so make a simple lookup to match selected dokumentID with pdf in schema::mock_data/dokumenter-pdf

  let pdfname;
  switch (dokumentID) {
    case '123':
      pdfname = 'skjema_for_arbeidsgiver';
      break;
    case '321':
      pdfname = 'soknad_om_medlemskap';
      break;
    case '73726173':
    default:
      pdfname = 'soknad_om_a1';
      break;
  }
  const pdfmockfile = `${GET_DIR}/${pdfname}.pdf`;

  try {
    res.type('application/pdf');
    res.sendFile(pdfmockfile);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
