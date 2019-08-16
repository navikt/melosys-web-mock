const SchemaValidator  = require('../../utils/schemavalidator');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');

/**
 * hent
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.hent = async (req, res) => {
  const { journalpostID } = req.params;
  if (!journalpostID) {
    Mock.manglerParamjournalpostID(req, res);
  }
  const { moduleName } = Katalog.pathnameMap.journalforing;
  const mockpathObject = {
    pathname: 'DOK_3789-30098000492',
  };
  return SchemaValidator.get(moduleName, req, res, mockpathObject);
};
