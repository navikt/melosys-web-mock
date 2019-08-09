const { oversikt } = require('./oversikt');
const { sendPlukk } = require('./plukk');
const { sok } = require('./sok');
const { tilbakelegg } = require('./tilbakelegg');

module.exports = {
  oversikt: { hent: oversikt },
  plukk: { send: sendPlukk },
  sok: { hent: sok },
  tilbakelegg: { send: tilbakelegg },
};
