const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const MOCK_DOKUMENTER_DATA_DIR = `${MOCK_DATA_DIR}/dokumenter`;

exports.hentPdf = (req, res) => {
  const mockfile = `${MOCK_DOKUMENTER_DATA_DIR}/dokumenttest.pdf`;

  res.type('application/pdf');
  res.sendFile(mockfile);
};
