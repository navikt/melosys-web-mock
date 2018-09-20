const fs = require('fs');
const glob = require('glob');
const log4js = require('log4js');
const logger = log4js.getLogger('schema');
const colors = require('colors/safe');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;

const humanReadableErrors = (allErrors = []) => {
  return allErrors.map(singleError => {
    const { keyword = '', dataPath = '', params = {}, message = '' } = singleError;
    const { additionalProperty } = params;
    const baseText = `[${keyword.toUpperCase()}] ${dataPath}: ${message}`;
    return additionalProperty ? `${baseText}: ${additionalProperty}` : baseText;
  })
};

const katalogNavn = path => {
  const splits = path.slice(MOCK_DATA_DIR.length+1).split('/');
  return splits.slice(0,splits.length-1).join('/');
};
module.exports.katalogNavn = katalogNavn;

module.exports.katalogTittel = path => {
  const katalog = katalogNavn(path);
  return katalog.charAt(0).toLocaleUpperCase() + katalog.slice(1);
};

module.exports.lesKatalog = dirpath => {
  let catalog = [];
  const files = glob.sync('*.json', {
    cwd: dirpath,
    ignore: 'schema.json$'
  });
  files.forEach(navn => {
    const filepath = `${dirpath}/${navn}`;
    const document = JSON.parse(fs.readFileSync(filepath, "utf8"));
    catalog.push({
      navn,
      document
    });
  });
  return catalog;
};

module.exports.lesKatalogElement = path => {
  const document =  JSON.parse(fs.readFileSync(path, "utf8"));
  const dirs = path.split('/');
  const navn = dirs[dirs.length-1];
  return {
    navn,
    document,
  };
};

module.exports.runTest = (data, ajv, validate) => {
  const { navn, document } = data;
  const valid = validate(document);
  if (valid) {
    console.log(colors.green('\tValid! '+navn));
  }
  else {
    console.log(colors.red('\tInvalid: '+navn));
    humanReadableErrors(validate.errors).forEach((msg, index) => {
      console.log('\t', (index < 10 ? ` ${index}` : index), msg);
      logger.error(`${navn} ${msg}`);
    });
  }
};


module.exports.lesSchema = schemapath => {
  return JSON.parse(fs.readFileSync(schemapath, "utf8"));
};

