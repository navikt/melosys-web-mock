const ERR = require('../../utils/errors');
const Utils = require('../../utils/utils');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const { MOCK_DATA_DIR } = require('../../../mock.config');
const { moduleName } = Katalog.pathnameMap["eessi-mottakerinstitusjoner"];

module.exports.hent = async (req, res) => {
  const GET_DIR = `${MOCK_DATA_DIR}/${moduleName}`;
  const { bucType } = req.params;
  if (!bucType) {
    return ERR.badRequstParam(req, res, 'Mangler bucType');
  }
  try {
    const mockfile = `${GET_DIR}/${moduleName}.json`;
    const mockData = await Utils.readJsonAndParseAsync(mockfile);

    return res.json(mockData);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
