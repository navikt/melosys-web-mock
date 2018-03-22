const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const schema = {
  type: "object",
  properties: {
    "soknadDokument": {
      type: "object",
      properties: {
        opplysningerOmBrukeren: {
          type: "object",
          properties: {
            personUtenlandskID: {"type": "string"}
          }
        },
        arbeidUtland: {
          type: "object",
          properties: {
            arbeidsperiode: {
              type: "object",
              properties: {
                fom: { "type": "string" },
                tom: { "type": "string" }
              },
              required: ["fom"]
            }
          },
          required: ["arbeidsperiode"]
        },
        arbeidsandelNorge: {"type": "number"},
        arbeidsandelUtland: {"type": "number"},
        arbeidsstedUtland:  {"type": ['string', 'null']},
        bostedsland: {"type": 'string'},
        erstatterTidligereUtsendt: {"type": 'boolean'}
      },
      required: [
        "opplysningerOmBrukeren","arbeidUtland", "arbeidsandelNorge","arbeidsandelUtland","arbeidsstedUtland",
        "bostedsland", "erstatterTidligereUtsendt"
      ]
    }
  },
  required: ["soknadDokument"]
};
const validate = ajv.compile(schema);

const dokument = {
  "soknadDokument": {
    "opplysningerOmBrukeren": {
      "personUtenlandskID":"123-12-123456789"
    },
    "arbeidUtland": {
      "arbeidsperiode": {
        "fom": "2018-01-01",
        "tom": "2018-06-01"
      }
    },
    "arbeidsandelNorge": 33.3,
    "arbeidsandelUtland": 66.6,
    "arbeidsstedUtland": null,
    "bostedsland": "SE",
    "erstatterTidligereUtsendt": false
  }
};


test(dokument);

function test(data) {
  const valid = validate(data);
  if (valid) console.log('Valid!');
  else console.log('Invalid: ' + ajv.errorsText(validate.errors));
}