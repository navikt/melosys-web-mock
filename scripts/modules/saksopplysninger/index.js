const { oppfrisk, status}  = require('./oppfriskning');

module.exports = {
  oppfriskning: { hent: oppfrisk, status },
};
