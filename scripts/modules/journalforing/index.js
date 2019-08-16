const { hent } = require('./journalforing');
const { sendOpprett} = require('./opprett');
const { sendTilordneSak } = require('./tilordne');

module.exports = {
  hent,
  opprett: { send: sendOpprett },
  tilordne: { send: sendTilordneSak },
};
