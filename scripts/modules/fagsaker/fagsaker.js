const SchemaPostValidator  = require('../../utils/schema-post-validator');
const SchemaGetValidator  = require('../../utils/schema-get-validator');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap.fagsaker;

module.exports.hentFagsak = async (req, res) => {
  const { saksnummer } = req.params;
  if (!saksnummer) return Mock.manglerParamSaksnummer(req, res);

  const pathObject = {
    pathname: '/snr-:saksnummer',
    params: {saksnummer},
  };
  return SchemaGetValidator.get(moduleName, req, res, pathObject);
};

module.exports.henleggFagsak = async (req, res) => {
  SchemaPostValidator.post204(moduleName, req, res);
};

module.exports.bortfall = async (req, res) => {
  const { saksnummer } = req.params;

  if (!saksnummer) return Mock.manglerParamSaksnummer(req, res);

  return res.status(204).send();
};
