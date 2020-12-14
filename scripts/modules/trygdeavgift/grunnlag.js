const Mock = require('../../utils/mock-util');
const SchemaValidator  = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap["trygdeavgift-grunnlag"];


module.exports.hentGrunnlag = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const mockpathObject = {
    pathname: 'trygdeavgift-grunnlag-bid-:behandlingID',
    params: {behandlingID},
  };

  return SchemaValidator.get(moduleName, req, res, mockpathObject);
};

module.exports.sendGrunnlag = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }

  const custom = {
    "lønnsforhold": req.body.lønnsforhold,
    "trygdeavgiftsgrunnlagNorge": req.body.trygdeavgiftsgrunnlagNorge,
    "trygdeavgiftsgrunnlagUtland": req.body.trygdeavgiftsgrunnlagUtland,
    "vurderingTrygdeavgiftNorskInntekt": "NORSK_INNTEKT_INGEN_TRYGDEAVGIFT_NAV",
    "vurderingTrygdeavgiftUtenlandskInntekt": "UTENLANDSK_INNTEKT_TRYGDEAVGIFT_NAV",
  };
  return SchemaValidator.put(moduleName, req, res, custom);
};
