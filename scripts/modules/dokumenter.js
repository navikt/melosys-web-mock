const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const MOCK_DOKUMENTER_DATA_DIR = `${MOCK_DATA_DIR}/dokumenter`;

module.exports.hentPdf = (req, res) => {
  const mockfile = `${MOCK_DOKUMENTER_DATA_DIR}/dokumenttest.pdf`;
  logger.trace(mockfile);
  res.type('application/pdf');
  res.sendFile(mockfile);
};
