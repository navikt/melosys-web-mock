const Utils = require('./utils');

const getVerb = pathObj => {
  let verb;
  if (pathObj.delete) {
    verb = 'delete';
  } else if (pathObj.get) {
    verb = 'get';
  } else if (pathObj.post) {
    verb = 'post';
  } else if (pathObj.put) {
    verb = 'put';
  }
  return verb;
};

const makePathObject = (keyName, pathName, verb) => {
  let oPath = {
    moduleName: keyName,
  };
  oPath[verb] = {
    pathname: pathName
  };
  return oPath;
};
const transformSwaggerPaths = swagger => {
  const expressPaths = {};
  let pathnames = [];
  // Collect swagger path properties from paths object
  for (const path in swagger.paths) { // NOTE! paths is a object with each path has nested objects
    pathnames.push(path);
  }
  // Sort pathnames in acending order
  pathnames = [...pathnames.sort()];

  pathnames.forEach(path => {
    const pathObj = swagger.paths[path];
    const splits = path.split('/');
    splits.shift(); // remove prefix "/"

    let keyName = '';
    let pathName = '';
    splits.forEach(split => {
      if (split.startsWith('{')) {
        const param = split.substring(1, split.length - 1);
        pathName += `/:${param}`;
      } else {
        pathName += `/${split}`;
        keyName += `${split}-`;
      }
    });
    keyName = keyName.substring(0, keyName.length - 1);  // Strip off last "-"

    const verb = getVerb(pathObj);
    const oPath = makePathObject(keyName, pathName, verb);
    expressPaths[keyName] = {...oPath}
  });
  return expressPaths;
};

const readSwaggerDoc = swaggerfile => {
  return JSON.parse(Utils.readFileSync(swaggerfile));
};
const parseSwagger2ExpressPaths = swaggerfile => {
  try {
    const swagger = readSwaggerDoc(swaggerfile);
    return transformSwaggerPaths(swagger);
  }
  catch (e) {
    console.error(e);
  }
};
module.exports.parseSwagger2ExpressPaths = parseSwagger2ExpressPaths;
