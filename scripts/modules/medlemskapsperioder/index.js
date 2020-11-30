const { getMedlemskapsperioder, postMedlemskapsperiode, putMedlemskapsperiode, deleteMedlemskapsperiode } = require('./medlemskapsperioder');
const { hentBestemmelser, opprettMedlemskapsperioderFraBestemmelse } = require('./bestemmelse');

module.exports = {
  medlemskapsperioder: { hent: getMedlemskapsperioder, post: postMedlemskapsperiode, put: putMedlemskapsperiode, delete: deleteMedlemskapsperiode },
  bestemmelser: { hent: hentBestemmelser, opprettMedlemskap: opprettMedlemskapsperioderFraBestemmelse }

};
