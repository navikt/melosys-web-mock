const fs = require('fs');
const Utils = require('./utils');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const MOCK_SOKNAD_DIR = `${MOCK_DATA_DIR}/soknader`;

const lesSoknad = (behandlingID) => {
  const mockfileSoknad = `${MOCK_SOKNAD_DIR}/soknad-bid-${behandlingID}.json`;
  return JSON.parse(fs.readFileSync(mockfileSoknad, "utf8"));
};

exports.lesAlleSoknader = () => {
  return Utils.lesAlleJson(MOCK_SOKNAD_DIR);
};

const skrivSoknad = (behandlingID, soknadDokument) => {
  const mockfileSoknad = `${MOCK_DATA_DIR}/soknader/soknad-bid-${behandlingID}.json`;

  // Triks for å sikre at behandlingsID kommmer som forste key og ikke sist
  const soknad = {
    behandlingID,
    soknadDokument,
  };
  fs.writeFileSync(mockfileSoknad, JSON.stringify(soknad, null, 2));
  return soknad;
};

/**
 * Hent soknad
 * @param req
 * @param res
 * @returns {*}
 */
exports.hent = (req, res) => {
  const behandlingID = req.params.behandlingID;
  try {
    const soknad = lesSoknad(behandlingID);
    return res.json(soknad);
  }
  catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};
/**
 * Send soknad
 * @param req
 * @param res
 * @returns {*}
 */
exports.send = (req, res) => {
  const behandlingID = req.params.behandlingID;
  const body = req.body;
  let jsonBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  const mockfileSoknad = `${MOCK_DATA_DIR}/soknader/soknad-bid-${behandlingID}.json`;

  try {
    if (fs.existsSync(mockfileSoknad)) {
      const soknad = lesSoknad(behandlingID);
      return res.json(soknad);
    }
    else {
      const { soknadDokument } = jsonBody;
      const soknad = skrivSoknad(behandlingID, soknadDokument);
      return res.json(soknad);
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
