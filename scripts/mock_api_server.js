/* eslint-disable */
const express = require('express');
const _ = require('underscore');
const app = express();
const bodyParser = require('body-parser');

const fs = require('fs');
//const path = require('path');
const os = require('os');
const moment = require('moment');

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use(bodyParser.text());
app.use(bodyParser.raw());

const port = process.env.PORT || 3002;
const router = express.Router();

router.post('/opprettsak/:fnr', function(req, res) {
  console.log('opprettsak POST');
  console.log('content-type', req.get('content-type'));
  console.log('opprettsak',req.body);
  const fnr = req.params.fnr.toString();
  const nysak = {
    fnr: fnr,
    saksnummer: _.random(100,9999).toString(),
    kjoenn: 'K',
    sammensattNavn: 'UNNI FOS KVALUY',
    registrertDato: moment(),
    status: 'Ikke påbegynnt'
  };
  res.json(nysak);
});





/**
 * FAGSAKER
 * ----------------------------------------------------------------------------
 * Henter fagsak med alle behandlinger for en enkelt søknad, basert på "snr" som backend omtales som "fagsak_id".
 * Data som returneres som en del av fagsaken er data som kommer fra registre.
 *
 * GET /fagsaker/:snr
 * POST (dette endpointet har ingen POST)
 *
 */

function fagsaker_snr(req, res) {
    try {
        const snr = req.params.snr && req.params.snr.toString() || '';
        const filnavn = "./scripts/mock_data/fagsaker/snr-"+snr+".json";
        const fagsaker = JSON.parse(fs.readFileSync(filnavn, "utf8"));
        return res.json(fagsaker);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
}

router.get('/fagsaker/:snr', fagsaker_snr);

function sokFagsaker_fnr(req, res) {
    try {
        const fnr = req.query.fnr.toString();
        const filnavn = "./scripts/mock_data/sok/fagsaker/fnr-"+fnr+".json";
        const nyesaker = JSON.parse(fs.readFileSync(filnavn, "utf8"));

        if (nyesaker && nyesaker.length) {
            return res.json(nyesaker);
        }
        else {
            return res.status(404).send("Not found");
        }
    } catch (err) {
        res.status(500).send(err);
        console.log(err)
    }
}
router.get('/sok/fagsaker', sokFagsaker_fnr);



/**
 * SØKNAD
 * ----------------------------------------------------------
 * Endpoint for søknaden, enten den registreres manuelt eller kommer inn elektronisk.
 * GET /soknader Returnerer evt. tidligere registrerte data fra søknaden eller elektronisk søknad.
 * POST /soknader Poster dataene i søknaden DERSOM det dreier seg om en manuell registrert søknad.
 *
 */

function getSoknad(req, res) {
  try {
    const behandlingID = req.params.behandlingID;
    const filnavn = "./scripts/mock_data/soknader/soknad-bid-"+behandlingID+".json";
    const soknad = JSON.parse(fs.readFileSync(filnavn, "utf8"));
    return res.json(soknad);
  }
  catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}
router.get('/soknader/:behandlingID', getSoknad);

function postSoknad(req, res) {
    const behandlingID = req.params.behandlingID;
    var body = req.body;
    var jsonBody = isJSON(body) ? JSON.parse(body) : body;
    jsonBody.behandlingID = behandlingID;

    return res.json(jsonBody);
}
router.post('/soknader/:behandlingID', postSoknad);



/**
 * FAKTAVKLARING (FRA STEGVELGEREN ++)
 * ----------------------------------------------------------
 * Faktaavklaring for soknaden. Inneholder datagrunnlag fra saksbehandlers faktaavklaring som ikke direkte
 * kommer fra søknad eller registere men som saksbehandler kan trekke slutninger rundt.
 * GET /faktaavklaring Returnerer evt. tidligere vurderinger for aktuell sak slik at disse kan settes inn i grensesnittet.
 * POST /faktaavklaring Sender alle faktaavklaringer som saksbehandler har gjort. Se Confluence
 * (https://confluence.adeo.no/pages/viewpage.action?pageId=257676957)
 *
 */
function getFaktaavklaring(req, res) {
    try {
        const behandlingID = req.params.behandlingID;
        var mockfile = "./scripts/mock_data/faktaavklaring/faktaavklaring-bid-"+behandlingID+".json";
        console.log('mockfile', mockfile);
        const faktaavklaring = JSON.parse(fs.readFileSync(mockfile, "utf8"));
        return res.json(faktaavklaring);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
}
router.get('/faktaavklaring/:behandlingID', getFaktaavklaring);

router.post('/faktaavklaring/:behandlingID', function (req, res) {
    const behandlingID = req.params.behandlingID;
    var body = req.body;
    var jsonBody = isJSON(body) ? JSON.parse(body) : body;
    jsonBody.behandlingID = behandlingID;

    return res.json(jsonBody);
});



/**
 * VURDERING (FRA REGELMOTOREN)
 * ---------------------------------------------------------------
 * Vurdering (vurderingsforslag) fra regelmotor for soknaden. Denne kalles når regelmotor har (1) fagsaken (2) søknaden og
 * (3) faktaavklaring.
 * GET /vurdering Returnerer regelmotorens forslag til vurdering i tillegg til evt lagrede overprøvinger fra saksbehandler.
 * POST /vurdering Lagrer en vurdering, enten den er lik regelmotoren eller det er en overprøvelse fra saksbehandler.
 *
 */
function getVurdering(req, res) {

    try {
        const behandlingID = req.params.behandlingID;
        var mockfile = "./scripts/mock_data/vurdering/vurdering-bid-"+behandlingID+".json";
        const vurdering = JSON.parse(fs.readFileSync(mockfile, "utf8"));
        return res.json(vurdering);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
}
router.get('/vurdering/:behandlingID', getVurdering);

router.post('/vurdering/:behandlingID', function (req, res) {
    const behandlingID = req.params.behandlingID;
    var body = req.body;
    var responseBody = isJSON(body) ? JSON.parse(body) : body;
    responseBody.behandlingID = behandlingID;

    return res.json(responseBody);
});

router.get('/saksbehandler', function (req, res) {
  try {
    const saksbehandlere =  JSON.parse(fs.readFileSync("./scripts/mock_data/saksbehandler.json", "utf8"));
    // return a random sakbehandler from list of sakbehandlere
    return res.json(_.sample(saksbehandlere));
  } catch (err) {
    console.log(err)
  }
});

router.get('/landkoder', function (req, res) {
  try {
    const land =  JSON.parse(fs.readFileSync("./scripts/mock_data/landkoder/landkoder.json", "utf8"));
    return res.json(land);
  } catch (err) {
    console.log(err)
  }
});
app.use(allowCrossDomain);
app.use('/melosys-api', router);
app.use('/api', router);
app.use('/melosys/api', router);

app.listen(port);

function platformNIC() {
  const interfaces = os.networkInterfaces();
  switch (process.platform) {
    case 'darwin':
      return interfaces.lo0;
      case 'linux':
      return interfaces.ens192 ? interfaces.ens192 : interfaces.eno16780032;
    default: // win32
      return interfaces.Ethernet0
  }
}

function getIpAdress() {
  const nic = platformNIC();
  const ipv4 = _.find(nic, function(item){
    return item.family === 'IPv4';
  });
  return ipv4.address;
}

function isJSON(str) {
  try {
    return (JSON.parse(str) && !!str);
  } catch (e) {
    return false;
  }
}
console.log('Test MeloSys mock API server running on http://'+getIpAdress()+':' + port+'/api');
