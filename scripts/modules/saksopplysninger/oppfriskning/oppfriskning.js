const Mock = require('../../../utils/mock-util');

/**
 * oppfrisk
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.oppfrisk = async (req, res) => {
  try {
    const { behandlingID } = req.params;
    if (!behandlingID) {
      return Mock.manglerParamBehandlingsID(req, res);
    }
    await new Promise(resolve => setTimeout(resolve, 3000));
    return res.status(204).send();
  } catch (err) {
    Mock.serverError(req, res, err);
  }
};
