const { hentFolketrygden } = require('./folketrygden');
const { hentKodeverk} = require('./nav-felleskodeverk');


module.exports = {
  hentKodeverk,
  navFelles: { folketrygden: hentFolketrygden },

};
