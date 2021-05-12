const { hentTilgjengeligeMaler } = require('./tilgjengeligemaler');
const { opprett } = require('./opprett');
const { utkast } = require('./utkast');
const { hentMuligeMottakere } = require('./muligeMottakere');

module.exports = {
  tilgjengeligemaler: { hent: hentTilgjengeligeMaler },
  opprett: { send: opprett },
  utkast: { send: utkast },
  muligeMottakere: { send: hentMuligeMottakere }
};
