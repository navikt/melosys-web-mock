const moment = require('moment');

const timestamp = moment();

const errorMessage = (status, error, message, path) => ({
  timestamp,
  status,
  error,
  message,
  path,
});
exports.errorMessage = errorMessage;

exports.badRequest400 = (path, message = 'The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).') => {
  return errorMessage(400,
    'Bad Request',
    message,
    path);
};
exports.unauthorizedRequest401 = (path, message = 'Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.') => {
  return errorMessage(401, 'Unauthorized',
    message,
    path);
};
exports.forbiddenRequest403 = (path, message = 'The request was valid, but the server is refusing action. The user might not have the necessary permissions for a resource, or may need an account of some sort.') => {
  return errorMessage(403, 'Unauthorized',
    message,
    path);
};
exports.notFound404 = (path, message = 'The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.') => {
  return errorMessage(404, 'Not Found',
    message,
    path);
};
exports.serverError500 = (path, message = 'A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.') => {
  return errorMessage(500, 'Internal Server Error',
    message,
    path);
};
