const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;

module.exports.hentPdf = (req, res) => {
  const mockfile = `${MOCK_DATA_DIR}/dokumenter/dokumenttest.pdf`;

  res.type('application/pdf');
  res.sendFile(mockfile);
};
