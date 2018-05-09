const fs = require('fs');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;

exports.hentPdf = (req, res) => {
  //const journalpostID = req.params.journalpostID;
  //const dokumentID = req.params.dokumentID;
  const mockfile = `${MOCK_DATA_DIR}/dokumenter/dokumenttest.pdf`;
  res.download(mockfile);
};
