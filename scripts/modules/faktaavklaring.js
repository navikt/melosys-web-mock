const fs = require('fs');
const ERR = require('./errors');
const utils = require('./utils');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;

exports.getFaktaavklaring = (req, res) => {
  try {
    const behandlingID = req.params.behandlingID;
    const mockfile = `${MOCK_DATA_DIR}/faktaavklaring/faktaavklaring-bid-${behandlingID}.json`;
    if (fs.existsSync(mockfile)) {
      const faktaavklaring = JSON.parse(fs.readFileSync(mockfile, "utf8"));
      return res.json(faktaavklaring);
    }
    else {
      return res.status(404).send(ERR.notFound404(req.url));
    }
  }
  catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

exports.postFaktaavklaring = (req, res) => {
  const behandlingID = req.params.behandlingID;
  const body = req.body;
  const jsonBody = utils.isJSON(body) ? JSON.parse(body) : body;
  const faktaavklaring = {
    behandlingID,
    faktaavklaring: { ...jsonBody.faktaavklaring }
  };

  return res.json(faktaavklaring);
};