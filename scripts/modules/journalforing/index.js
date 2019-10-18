const { hent } = require('./journalforing');
const { sendOpprett} = require('./opprett');
const { sendSed} = require('./sed');
const { sendTilordneSak } = require('./tilordne');

module.exports = {
  hent,
  opprett: { send: sendOpprett },
  sed: { send: sendSed },
  tilordne: { send: sendTilordneSak },
};
