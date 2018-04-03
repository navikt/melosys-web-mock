const fs = require('fs');
const _ = require('underscore');
const ERR = require('./errors');
const utils = require('./utils');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;

exports.getSoknad = (req, res) => {
  try {
    const behandlingID = req.params.behandlingID;
    const mockfileSoknad = `${MOCK_DATA_DIR}/soknader/soknad-bid-${behandlingID}.json`;
    if (fs.existsSync(mockfileSoknad)) {
      const soknad = JSON.parse(fs.readFileSync(mockfileSoknad, "utf8"));
      return res.json(soknad);
    }
    else {
      console.error('Not Found', mockfileSoknad);
      return res.status(404).send(ERR.notFound404( req.url));
    }
  }
  catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

exports.postSoknad = (req, res) => {
  const behandlingID = req.params.behandlingID;
  const body = req.body;
  let jsonBody = utils.isJSON(body) ? JSON.parse(body) : body;

  const mockfileSoknad = `${MOCK_DATA_DIR}/soknader/soknad-bid-${behandlingID}.json`;

  try {
    if (fs.existsSync(mockfileSoknad)) {
      const soknad = JSON.parse(fs.readFileSync(mockfileSoknad, "utf8"));
      return res.json(soknad);
    }
    else {
      const { soknadDokument } = jsonBody;
      // Triks for å sikre at behandlingsID kommmer som forste key og ikke sist
      const soknad = {
        behandlingID,
        soknadDokument,
      };
      fs.writeFileSync(mockfileSoknad, JSON.stringify(soknad, null, 2));
      return res.json(soknad);
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};