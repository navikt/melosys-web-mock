const MKV = require('@navikt/melosys-kodeverk');

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

  SchemaValidator.get(moduleName, req, res, mockpathObj);
};

const mockfileForBehandlingID = (behandlingID) => `${VILKAAR_DATA_DIR}/vilkaar-bid-${behandlingID}.json5`;

const lesVilkaarListe = (behandlingID) => {
  const mockfile = mockfileForBehandlingID(behandlingID);
  return Utils.readJsonAndParseAsync(mockfile);
}

const lesVilkaar = async (behandlingID, vilkaarKode) => {
  const vilkaarListe = await lesVilkaarListe(behandlingID)
  return vilkaarListe.find(enkeltVilkaar => enkeltVilkaar.vilkaar === vilkaarKode);
};

const skrivVilkaarListe = (behandlingID, vilkaarListe) => {
  const mockfile = mockfileForBehandlingID(behandlingID);
  return Utils.writeFileAsync(mockfile, JSON.stringify(vilkaarListe));
}

const overskrivVilkaar = async (behandlingID, vilkaarKode, nyttVilkaar) => {
  const vilkaarListe = await lesVilkaarListe(behandlingID);
  const nyVilkaarListe = vilkaarListe.map((enkeltVilkaar) => (
    enkeltVilkaar.vilkaar === vilkaarKode ? nyttVilkaar : enkeltVilkaar
  ));

  return skrivVilkaarListe(behandlingID, nyVilkaarListe);
}

const finnerIkkeInngangsvilkaarError = new Error('Finner ikke inngangsvilkaar i lagrede vilkaar!');

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
  if (req.body.find(enkeltVilkaar => enkeltVilkaar.vilkaar === MKV.Koder.vilkaar.FO_883_2004_INNGANGSVILKAAR)) {
    return Mock.forsokerAaSkriveTilInngangsvilkaar(req, res);
  }

  try {
    const inngangsvilkaar = await lesVilkaar(behandlingID, MKV.Koder.vilkaar.FO_883_2004_INNGANGSVILKAAR);
    if (!inngangsvilkaar) return Mock.serverError(req, res, finnerIkkeInngangsvilkaarError);
    const customResponse = [...req.body, inngangsvilkaar];
    SchemaValidator.post(moduleName, req, res, customResponse);
  } catch (e) {
    Mock.serverError(e);
  }
};

module.exports.overstyrinngangsvilkaar = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }

  try {
    const inngangsvilkaar = await lesVilkaar(behandlingID, MKV.Koder.vilkaar.FO_883_2004_INNGANGSVILKAAR);
    if (!inngangsvilkaar) return Mock.serverError(req, res, finnerIkkeInngangsvilkaarError);

    inngangsvilkaar.oppfylt = true;
    overskrivVilkaar(behandlingID, MKV.Koder.vilkaar.FO_883_2004_INNGANGSVILKAAR, inngangsvilkaar);

    res.status(200).send();
  } catch (e) {
    Mock.serverError(e);
  }
};
