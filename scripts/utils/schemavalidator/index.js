const { get, getPDF } = require('./schema-get-validator');
const { post, post204, postSendPDF, postFromFile } = require('./schema-post-validator');
const { put, put204 } = require('./schema-put-validator');
const { slett } = require('./schema-delete-validator');
const { test, valideringFeil } = require('./helper');

module.exports = {
  get, getPDF,
  post,post204, postSendPDF, postFromFile,
  put, put204,
  slett,
  test, valideringFeil
};
