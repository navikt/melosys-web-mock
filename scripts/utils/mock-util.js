const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const ERR = require('./errors');

/**
 * badRequstParam
 * @param req
 * @param res
 * @param message
 * @returns {*}
 */
const badRequstParam = (req, res, message) => {
  const melding = ERR.badRequest400(req.originalUrl, message);
  return res.status(400).send(melding);
};
module.exports.badRequstParam = badRequstParam;

/**
 * serverError
 * @param req
 * @param res
 * @param e
 * @returns {*}
 */
module.exports.serverError = (req, res, e) => {
  console.error(e);
  logger.error(e.message);
  const melding = ERR.serverError500(req.originalUrl, e.message);
  return res.status(500).send(melding);
};

/**
 * manglerParamSaksnummer
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.manglerParamSaksnummer = (req, res) => badRequstParam(req, res, 'Mangler saksnummer');
/**
 * manglerParamBehandlingsID
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.manglerParamBehandlingsID = (req, res) => badRequstParam(req, res, 'behandlingID mangler');
/**
 * manglerParamjournalpostID
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.manglerParamjournalpostID = (req, res) => badRequstParam(req, res, 'journalpostID mangler');
/**
 * manglerParamOrgnr
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.manglerParamOrgnr = (req, res) => badRequstParam(req, res, 'Organisasjons nummer mangler');
/**
 * manglerParamFnr
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.manglerParamFnr = (req, res) => badRequstParam(req, res, 'Fødselsnummer mangler');
