const fs = require('fs');
const Ajv = require('ajv');

const ajv = new Ajv({allErrors: true});
const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const Utils = require('./utils');
const Schema = require('../test/schema-util');
const ERR = require('./errors');

const SCRIPTS_DATA_DIR = `${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DATA_DIR}/schema`;
const MOCK_DATA_DIR = `${SCRIPTS_DATA_DIR}/mock_data`;
const MOCK_SOKNAD_DIR = `${MOCK_DATA_DIR}/soknader`;

const lesSoknad = async (behandlingID) => {
  const mockfileSoknad = `${MOCK_SOKNAD_DIR}/soknad-bid-${behandlingID}.json`;
  return JSON.parse(await Utils.readFileAsync(mockfileSoknad));
};
module.exports.lesSoknad = lesSoknad;

module.exports.lesSoknadKatalog = () => {
  return Schema.lesKatalogSync(MOCK_SOKNAD_DIR);
};

const skrivSoknad = (behandlingID, soeknadDokument) => {
  const mockfileSoknad = `${MOCK_DATA_DIR}/soknader/soknad-bid-${behandlingID}.json`;

  // Triks for å sikre at behandlingsID kommmer som forste key og ikke sist
  const soknad = {
    behandlingID,
    soeknadDokument,
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
module.exports.hent = async (req, res) => {
  const behandlingID = req.params.behandlingID;
  try {
    const soknad = await lesSoknad(behandlingID);
    return res.json(soknad);
  }
  catch (err) {
    logger.error(err);
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
module.exports.send = (req, res) => {
  const schemajson = `${SCHEMA_DIR}/soknad-schema.json`;
  const schema = Schema.lesSchemaSync(schemajson);
  const validate = ajv.compile(schema);

  const behandlingID = req.params.behandlingID;
  const body = req.body;
  let jsonBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  logger.debug("soknad:send", JSON.stringify(jsonBody));
  const mockfileSoknad = `${MOCK_DATA_DIR}/soknader/soknad-bid-${behandlingID}.json`;

  try {
    const valid = test(validate, jsonBody);
    if (!valid) {
      valideringFeil(req, res);
    }
    else if (fs.existsSync(mockfileSoknad)) {
      const soknad = lesSoknad(behandlingID);
      res.json(soknad);
    }
    else {
      const { soeknadDokument } = jsonBody;
      const soknad = skrivSoknad(behandlingID, soeknadDokument);
      res.json(soknad);
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

function valideringFeil(req, res) {
  const status = 400;
  const melding = ERR.errorMessage(400,'Bad Request', 'Invalid schema', req.originalUrl);
  res.status(status).send(melding);
}

function test(validate, data) {
  const valid = validate(data);
  if (valid) {
    console.log('Soknad: send Valid!');
  }
  else {
    const ajvErros = ajv.errorsText(validate.errors);
    console.error('Soknad:send INVALID: see mock-errors.log');
    logger.error('Soknad:send INVALID', ajvErros)
  }
  return valid;
}
