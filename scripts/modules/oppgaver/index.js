const { oversikt } = require('./oversikt');
const { sendPlukk } = require('./plukk');
const { tilbakelegg } = require('./tilbakelegg');

module.exports = {
  oversikt: { hent: oversikt },
  plukk: { send: sendPlukk },
  tilbakelegg: { send: tilbakelegg },
};
