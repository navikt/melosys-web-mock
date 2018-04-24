const fs = require('fs');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;

exports.hentPdfDokument = (req, res) => {
  const navn = req.params.navn;
  const path = `${MOCK_DATA_DIR}/${navn}`;
  res.download(path);
}
