const fs = require('fs');
const colors = require('colors/safe');

exports.lesAlleJson = dirpath => {
  let catalog = [];
  fs.readdirSync(dirpath).forEach(navn => {
    const filepath = `${dirpath}/${navn}`;
    const document = JSON.parse(fs.readFileSync(filepath, "utf8"));
    catalog.push({
      navn,
      document
    });
  });
  return catalog;
};

exports.lesSchema = schemapath => {
  return JSON.parse(fs.readFileSync(schemapath, "utf8"));
};

exports.runTest = (data, ajv, validate) => {
  const { navn, document } = data;
  const valid = validate(document);
  if (valid) {
    console.log(colors.green('\tValid! '+navn));
  }
  else {
    console.log(colors.red('\tInvalid: '+navn));
    const texts = ajv.errorsText(validate.errors);
    texts.split(',').forEach((msg, index) => console.log('\t',index,msg.trim()));
  }
};

exports.isJSON = (str) => {
  try {
    return (JSON.parse(str) && !!str);
  } catch (e) {
    return false;
  }
};
