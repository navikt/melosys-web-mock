const MKV = require('melosys-kodeverk');

const erGyldigMottakerKode = mottaker => Object.values(MKV.Koder.aktoersroller).includes(mottaker);
const erGyldigProduserbartDokumentKode = produserbartDokument => Object.values(MKV.Koder.brev.produserbaredokumenter).includes(produserbartDokument);
const erMangelBrevMedFritekst = produserbartDokument => MKV.Koder.brev.produserbaredokumenter.MELDING_MANGLENDE_OPPLYSNINGER === produserbartDokument;

module.exports = {
  erGyldigProduserbartDokumentKode,
  erMangelBrevMedFritekst,
  erGyldigMottakerKode,
};
