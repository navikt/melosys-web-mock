const Mock = require('../../utils/mock-util');

module.exports.slett = async (moduleName, req, res) => {
  try {
    return res.status(204).send();
  }
  catch(err) {
    Mock.serverError(req, res, err);
  }
};
