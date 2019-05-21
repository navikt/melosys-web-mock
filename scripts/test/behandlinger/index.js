const { behandling } = require('./behandling');
const { behandlingsresultat } = require('./behandlingsresultat');
const { perioder } = require('./perioder');

module.exports = {
  behandling,
  resultat: behandlingsresultat,
  perioder,
};
