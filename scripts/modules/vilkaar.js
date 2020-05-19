const MKV = require('melosys-kodeverk');

const Mock = require('../utils/mock-util');
const { MOCK_DATA_DIR } = require('../../mock.config');
const SchemaValidator  = require('../utils/schemavalidator');
const Katalog = require('../katalog');
const Utils = require('../utils/utils');


const { moduleName } = Katalog.pathnameMap.vilkaar;
const VILKAAR_DATA_DIR = `${MOCK_DATA_DIR}/${moduleName}`;

/**
 * Hent vilkar
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const mockpathObj = {
    pathname: 'vilkaar-bid-:behandlingID',
    params: {behandlingID}
  };
  const { moduleName } = Katalog.pathnameMap.vilkaar;
  SchemaValidator.get(moduleName, req, res, mockpathObj);
};

const lesVilkaar = async (behandlingID, vilkaarKode) => {
  const mockfile = `${VILKAAR_DATA_DIR}/vilkaar-bid-${behandlingID}.json5`;
  const vilkaarListe = await Utils.readJsonAndParseAsync(mockfile);
  const vilkaar = vilkaarListe.find(enkeltVilkaar => enkeltVilkaar.vilkaar === vilkaarKode);

  return vilkaar;
};

/**
 * Send vilkar
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.send = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  if (req.body.includes(MKV.Koder.vilkaar.FO_883_2004_INNGANGSVILKAAR)) {
    return Mock.forsokerAaSkriveTilInngangsvilkaar(req, res);
  }

  try {
    const inngangsvilkaar = await lesVilkaar(behandlingID, MKV.Koder.vilkaar.FO_883_2004_INNGANGSVILKAAR);
    if (!inngangsvilkaar) return Mock.serverError(req, res, new Error('Finner ikke inngangsvilkaar i lagrede vilkaar!'));
    const customResponse = [...req.body, inngangsvilkaar];
    SchemaValidator.post(moduleName, req, res, customResponse);
  } catch (e) {
    Mock.serverError(e);
  }
};
