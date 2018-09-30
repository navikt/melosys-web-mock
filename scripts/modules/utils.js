const fs = require('fs');
module.exports.isJSON = (str) => {
  try {
    return (JSON.parse(str) && !!str);
  } catch (e) {
    return false;
  }
};
module.exports.writeFileAsync = async (path, text) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, 'utf8', text, err => {
      if (err) reject(err);
      else resolve();
    });
  });
};

module.exports.readFileAsync = async (path) =>  {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

module.exports.existsAsync = async (path) => {
  return new Promise((resolve) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        // TOOO add logger.error(err)
        resolve(false);
      }
      else resolve(true);
    });
  })
};
