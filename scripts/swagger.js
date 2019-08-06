const Katalog = require('./katalog');
const Utils = require('./utils/utils');
const ROOT_DIR = `${process.cwd()}`;
console.log(ROOT_DIR);

const swagger = JSON.parse(Utils.readFileSync(`${ROOT_DIR}/swagger.json`));

let pathnames = [];
for (path in swagger.paths) {
  pathnames.push(path);
}

pathnames = [...pathnames.sort()];
const pathnameMap = {};

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


  let oPath = {
    moduleName: keyName,
  };
  if (pathObj.delete) {
    oPath.delete = {
      pathname: pathName
    }
  } else if (pathObj.get) {
    oPath.get = {
      pathname: pathName
    }
  } else if (pathObj.post) {
    oPath.post = {
      pathname: pathName
    }
  } else if (pathObj.put) {
    oPath.put = {
      pathname: pathName
    }
  }
  pathnameMap[keyName] = {...oPath}
});

console.log();
console.log('==== SERVER definerte stier som ikke matcher FRONTEND');
for (path in pathnameMap) {
  if (path.startsWith('logger')) continue;
  if (path.startsWith('adresser')) continue;
  if (path.startsWith('arbeidsforholdhistorikk')) continue;
  if (path.startsWith('saksopplysninger')) continue;
  if (path.startsWith('serverinfo')) continue;
  if (!Katalog.pathnameMap[path]) {
    console.error(path);
  }
}
console.log();
const hasServerVerb = (spath, kpath, verb) => {
  const VERB = `[${verb.toUpperCase()}]`.padEnd('delete'.length + 2, ' ');
  if (spath[verb]) {
    if (kpath) {
      if (!kpath[verb]) {
        console.log('Mock does not have:', spath[verb]);
      } else {
        if (spath[verb].pathname !== kpath[verb].pathname) {
          console.log(VERB, spath[verb].pathname, '!==', kpath[verb].pathname);
        }
      }
    }
  }
};

console.log('==== SERVER definerte stier med mismatch i parameters');
for (path in pathnameMap) {
  const kpath = Katalog.pathnameMap[path];
  const spath = pathnameMap[path];
  ['get', 'put', 'post', 'delete'].forEach(verb => {
    if (spath[verb]) {
      hasServerVerb(spath, kpath, verb);
    }
  });
}

console.log('\n**************************************************\n');
console.log('==== Mock definerte stier som ikke matcher BACKEND');

for (pathname in Katalog.pathnameMap) {
  if (!pathnameMap[pathname]) {
    console.log(pathname);
  }
}

console.log();
const hasKlientVerb = (spath, kpath, verb) => {
  const VERB = `[${verb.toUpperCase()}]`.padEnd('delete'.length + 2, ' ');
  if (kpath[verb]) {
    if (spath) {
      if (!spath[verb]) {
        console.log('Server does not have:', VERB, kpath[verb].pathname);
      } else {
        if (spath[verb].pathname !== kpath[verb].pathname) {
          console.log(VERB, spath[verb].pathname, '!==', kpath[verb].pathname);
        }
      }
    }
  }
};
for (path in Katalog.pathnameMap) {
  const kpath = Katalog.pathnameMap[path];
  const spath = pathnameMap[path];

  ['get', 'put', 'post', 'delete'].forEach(verb => {
    if (kpath[verb]) {
      hasKlientVerb(spath, kpath, verb);
    }
  });
}
