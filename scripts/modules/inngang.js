const fs = require('fs');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const INNGANG_MOCK_DIR = `${MOCK_DATA_DIR}/inngang`;

const lesInngang = (bid) => {
  const mockfile = `${INNGANG_MOCK_DIR}/inngang-bid-${bid}.json`;
  return fs.existsSync(mockfile) ? JSON.parse(fs.readFileSync(mockfile, "utf8")) : {};
};

exports.hent = (req, res) => {
  try {
    const behandlingID = req.params.behandlingID;
    const inngang = lesInngang(behandlingID);
    res.json(inngang);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
