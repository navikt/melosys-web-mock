const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const ERR = require('./errors');

module.exports.notFound = (req, res, message) => {
  const melding = ERR.notFound404(message);
  return res.status(404).send(melding);

};
/**
 * badRequestParam
 * @param req
 * @param res
 * @param message
 * @returns {*}
 */
const badRequestParam = (req, res, message) => {
  const melding = ERR.badRequest400(req.originalUrl, message);
  return res.status(400).send(melding);
};
module.exports.badRequestParam = badRequestParam;

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
module.exports.manglerParamSaksnummer = (req, res) => badRequestParam(req, res, 'Mangler saksnummer');
/**
 * manglerParamBehandlingsID
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.manglerParamBehandlingsID = (req, res) => badRequestParam(req, res, 'behandlingID mangler');
/**
 * manglerParamjournalpostID
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.manglerParamjournalpostID = (req, res) => badRequestParam(req, res, 'journalpostID mangler');
/**
 * manglerParamOrgnr
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.manglerParamOrgnr = (req, res) => badRequestParam(req, res, 'Organisasjons nummer mangler');
/**
 * manglerParamFnr
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.manglerParamFnr = (req, res) => badRequestParam(req, res, 'Fødselsnummer mangler');
/**
 * manglerParamAnmodningsperiodeID
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.manglerParamAnmodningsperiodeID = (req, res) => badRequestParam(req, res, 'AnmodningsperiodeID mangler');

module.exports.manglerParamProduserbartDokument = (req, res) => badRequestParam(req, res, 'ProduserbartDokument mangler');

module.exports.manglerParamDokumentID = (req, res) => badRequestParam(req, res, 'DokumentID mangler');
module.exports.manglerParamJuridiskOrgnr = (req, res) => badRequestParam(req, res, 'Juridisk Orgnr mangler');

module.exports.manglerParamNotatID = (req, res) => badRequestParam(req, res, 'NotatID mangler');

module.exports.forsokerAaSkriveTilInngangsvilkaar = (req, res) => badRequestParam(req, res, 'Inngangsvilkaar er read-only');
