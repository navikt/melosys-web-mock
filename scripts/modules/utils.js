const fs = require('fs');
const glob = require('glob');
const colors = require('colors/safe');

const humanReadableErrors = (allErrors = []) => {
  return allErrors.map(singleError => {
    const { keyword = '', dataPath = '', params = {}, message = '' } = singleError;
    const { additionalProperty } = params;
    const baseText = `[${keyword.toUpperCase()}] ${dataPath}: ${message}`;
    return additionalProperty ? `${baseText}: ${additionalProperty}` : baseText;
  })
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

module.exports.lesSchema = schemapath => {
  return JSON.parse(fs.readFileSync(schemapath, "utf8"));
};

module.exports.runTest = (data, ajv, validate) => {
  const { navn, document } = data;
  const valid = validate(document);
  if (valid) {
    console.log(colors.green('\tValid! '+navn));
  }
  else {
    console.log(colors.red('\tInvalid: '+navn));
    humanReadableErrors(validate.errors).forEach((msg, index) => console.log('\t', (index < 10 ? ` ${index}` : index), msg));
  }
};

module.exports.isJSON = (str) => {
  try {
    return (JSON.parse(str) && !!str);
  } catch (e) {
    return false;
  }
};
