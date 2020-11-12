const { hentFolketrygden } = require('./folketrygden');
const { hentKodeverk} = require('./nav-felleskodeverk');


module.exports = {
  navFelles: { hentKodeverk },
  melosysInternt: { folketrygden: hentFolketrygden },

};
