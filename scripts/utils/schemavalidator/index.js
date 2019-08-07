const { get } = require('./schema-get-validator');
const { post, post204, postSendPDF, test, valideringFeil } = require('./schema-post-validator');
const { put204 } = require('./schema-put-validator');

module.exports = {
  get,
  post,post204, postSendPDF, test, valideringFeil,
  put204,
};
