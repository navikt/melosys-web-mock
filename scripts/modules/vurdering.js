const fs = require('fs');
const ERR = require('./errors');
const happy = require('./happystatus');
const utils = require('./utils');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;


exports.hentVurdering = (req, res) => {
  try {
    const behandlingID = req.params.behandlingID;
    const mockfile = `${MOCK_DATA_DIR}/vurdering/vurdering-bid-${behandlingID}.json`;
    if (fs.existsSync(mockfile)) {
      const data = JSON.parse(fs.readFileSync(mockfile, "utf8"));
      const status = happy.happyStatus([200, 200, 404]);
      if (status === 200) {
        data.vurdering.feilmeldinger = [];
      }
      return res.json(data);
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

exports.postVurdering = (req, res) => {
  const behandlingID = req.params.behandlingID;
  const body = req.body;
  let responseBody = utils.isJSON(body) ? JSON.parse(body) : body;
  responseBody.behandlingID = behandlingID;
  return res.json(responseBody);
};