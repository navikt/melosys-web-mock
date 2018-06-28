const fs = require('fs');
const _ = require('underscore');
const ERR = require('./errors');
const utils = require('./utils');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const FAKTAAVKLARING_MOCK_DIR = `${MOCK_DATA_DIR}/faktaavklaring`;

const lesAvklaring = (behandlingID) => {
  const mockfile = `${FAKTAAVKLARING_MOCK_DIR}/faktaavklaring-bid-${behandlingID}.json`;
  return fs.existsSync(mockfile) ? JSON.parse(fs.readFileSync(mockfile, "utf8")) : {};
};
/**
 * Hent faktavklaring
 * @param req
 * @param res
 * @returns {*}
 */
exports.hent = (req, res) => {
  try {
    const behandlingID = req.params.behandlingID;
    const avklaring = lesAvklaring(behandlingID);
    if (_.isEmpty(avklaring)) {
      return res.status(404).send(ERR.notFound404(req.url));
    }
    return res.json(avklaring);
  }
  catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};
/**
 * Send faktaavklaring
 * @param req
 * @param res
 * @returns {*}
 */
exports.send = (req, res) => {
  const behandlingID = req.params.behandlingID;
  const body = req.body;
  const jsonBody = utils.isJSON(body) ? JSON.parse(body) : body;
  const faktaavklaring = {
    behandlingID,
    faktaavklaring: { ...jsonBody.faktaavklaring }
  };

  return res.json(faktaavklaring);
};

const mockFeilMeldinger = (felterSomFeiler) => {
  return felterSomFeiler.map((felt) => ({
      melding: `Mangler informasjon fra søknaden om ${felt}.`,
      kategori: {
        alvorlighetsgrad: 'FEIL',
        beskrivelse: `Mangler informasjon fra søknaden om ${felt}.`
      },
      skjemaFeltID: felt
    }
  ));
};

const lesBosted = (behandlingID) => {
  const mockfile = `${FAKTAAVKLARING_MOCK_DIR}/bosted/bosted-bid-${behandlingID}.json`;
  return fs.existsSync(mockfile) ? JSON.parse(fs.readFileSync(mockfile, "utf8")) : {};
};

/**
 * Hent faktavklaring for bosted
 * @param req
 * @param res
 * @returns {*}
 */
exports.hentBosted = (req, res) => {
  try {
    const { behandlingID } = req.params;
    const bosted = lesBosted(behandlingID);
    if (_.isEmpty(bosted)){
      return res.status(404).send(ERR.notFound404(req.url));
    }
    // 50/50 sjanse for om valideringsfeil inntreffer eller om vurdering kunne gjøres.
    if (_.random(1,2) === 2) {
      const felterSomFeiler = ['intensjonOmRetur', 'bostedUtenforNorge', 'familiesBosted', 'antallMaanederINorge'];
      bosted.form.feilmeldinger = mockFeilMeldinger(felterSomFeiler);
      bosted.avklaringer = [];
    }
    return res.json(bosted);
  }
  catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};
/**
 * Send faktaavklaring bosted
 * @param req
 * @param res
 * @returns {*}
 */
exports.sendBosted = (req, res) => {
  const behandlingID = req.params.behandlingID;
  const body = req.body;
  const jsonBody = utils.isJSON(body) ? JSON.parse(body) : body;
  const faktaavklaring = {
    behandlingID,
    faktaavklaring: { ...jsonBody }
  };

  return res.json(faktaavklaring);
};
