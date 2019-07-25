const Mock = require('../utils/mock-util');
const Utils = require('../utils/utils');

const Katalog = require('../katalog');
const { moduleName } = Katalog.pathnameMap.avklartefakta;

const SchemaPostValidator  = require('../utils/schema-post-validator');

const lesAvklaring = behandlingID => {
  const mockfile = `${moduleName}/avklartefakta-bid-${behandlingID}.json`;
  return Utils.readJsonAndParseAsync(mockfile);
};

/**
 * Hent faktavklaring
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = async (req, res) => {
  try {
    const behandlingID = req.params.behandlingID;
    const avklaring = await lesAvklaring(behandlingID);
    return res.json(avklaring);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};


/**
 * Send Avklartefakta
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.send = (req, res) => {
  SchemaPostValidator.post(moduleName, req, res);
};
