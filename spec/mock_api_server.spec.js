const request = require('request');

describe('mock-api-server', () => {
  let server;
  beforeAll(() => {
    server = require('../scripts/mock_api_server');
  });
  afterAll(() => {
    server.close();
  });
  describe('[GET] /api/saksbehandler', () => {
    let data = {};
    beforeAll((done) => {
      request.get('http://localhost:3002/api/saksbehandler', (error, response, body) => {
        //console.log('error:', error); // Print the error if one occurred
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //console.log('body:', body);
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        //console.log('data:', data);
        done();
      });
    });
    it('Har status 200', () => {
      expect(data.status).toBe(200);
    });
    it('har gyldig saksbehandler', () => {
      expect(data.body.brukernavn).toBe('Z991001')
    });
  });
});
