const fs = require('fs');
const _ = require('underscore');

const Utils = require('./utils');
const ERR = require('./errors');
const happy = require('./happystatus');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const MOCK_DATA_SAKSBEHANDLER_DIR = `${MOCK_DATA_DIR}/saksbehandler`;

module.exports.lesAlleSaksbehandlere = () => {
  return Utils.lesAlleJson(MOCK_DATA_SAKSBEHANDLER_DIR);
};
const lesSaksbehandlere = () => {
  const mockfile = `${MOCK_DATA_DIR}/saksbehandler.json`;
  return fs.existsSync(mockfile) ? JSON.parse(fs.readFileSync(mockfile, "utf8")) : {};
};

module.exports.hent = (req, res) => {
  try {
    const saksbehandlere = lesSaksbehandlere();
    const status = happy.happyStatus([200, 200, 200, 401, 500]);
    const url = '/saksbehandler';
    switch (status) {
      case 200:
        return res.json(_.sample(saksbehandlere));
      case 401: {
        const melding = ERR.unauthorizedRequest401(url);
        return res.status(status).send(melding);
      }
      case 500: {
        const melding = ERR.serverError500(url);
        return res.status(status).send(melding);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

