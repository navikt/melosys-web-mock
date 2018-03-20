exports.errorMessage = (status, error, message, path) => ({
  timestamp,
  status,
  error,
  message,
  path,
});


exports.badRequest400 = (path) => {
  return errorMessage(400,
    'Bad Request',
    'The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).',
    path);
};
exports.unauthorizedRequest401 = (path) => {
  return errorMessage(401, 'Unauthorized',
    'Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.',
    path);
};
exports.forbiddenRequest403 = (path) => {
  return errorMessage(403, 'Unauthorized',
    'The request was valid, but the server is refusing action. The user might not have the necessary permissions for a resource, or may need an account of some sort.',
    path);
};
exports.notFound404 = (path) => {
  return errorMessage(404, 'Not Found',
    'The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.',
    path);
};
exports.serverError500 = (path) => {
  return errorMessage(500, 'Internal Server Error',
    'A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.',
    path);
};