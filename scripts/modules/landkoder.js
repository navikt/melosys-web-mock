const fs = require('fs');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;

exports.hentLandkoder = (req, res) => {
  try {
    const mockfile = `${MOCK_DATA_DIR}/landkoder/landkoder.json`;
    const land =  JSON.parse(fs.readFileSync(mockfile, "utf8"));
    return res.json(land);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};