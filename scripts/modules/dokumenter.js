const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const MOCK_DOKUMENTER_DATA_DIR = `${MOCK_DATA_DIR}/dokumenter`;

module.exports.hentPdf = (req, res) => {
  const mockfile = `${MOCK_DOKUMENTER_DATA_DIR}/dokumenttest.pdf`;
  //const journalpostID = req.params.journalpostID;
  //const dokumentID = req.params.dokumentID;
  logger.trace(mockfile);
  res.type('application/pdf');
  res.sendFile(mockfile);
};
// Forhåndsvisning pdf, eks brev, etc.
module.exports.hentPdfUtkast = (req, res) => {
  const behandlingID = req.params.behandlingID;
  const dokumentTypeID = req.params.dokumentTypeID;
  const mockfile = `${MOCK_DOKUMENTER_DATA_DIR}/mangelbrev.pdf`;
  logger.trace(mockfile);
  res.type('application/pdf');
  res.sendFile(mockfile);
};

module.exports.opprettPdf = (req, res) => {
  //const behandlingID = req.params.behandlingID;
  //const dokumentTypeID = req.params.dokumentTypeID;
  // /dokumenter/opprett/{behandlingID}/{typeID}
  res.status(204).json('');
};
