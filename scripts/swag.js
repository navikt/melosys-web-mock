const Katalog = require('./katalog');
const Swagger = require('./utils/swagger');
const ROOT_DIR = `${process.cwd()}`;
const SWAGGER_FILE = `${ROOT_DIR}/swagger.json`;

console.log('\nSwagger file:', SWAGGER_FILE);

const swaggerPaths = Swagger.parseSwagger2ExpressPaths(SWAGGER_FILE);
console.log();
console.log('==== SERVER definerte stier som ikke matcher FRONTEND');
for (const path in swaggerPaths) {
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
  const VERB = `[${verb.toUpperCase()}]`.padEnd('delete'.length + 2, ' '); // string display formatting
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
for (const path in swaggerPaths) {
  const kpath = Katalog.pathnameMap[path];
  const spath = swaggerPaths[path];
  ['get', 'put', 'post', 'delete'].forEach(verb => {
    if (spath[verb]) {
      hasServerVerb(spath, kpath, verb);
    }
  });
}

console.log('\n**************************************************\n');
console.log('==== Mock definerte stier som ikke matcher BACKEND');

for (const pathname in Katalog.pathnameMap) {
  if (!swaggerPaths[pathname]) {
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
for (const path in Katalog.pathnameMap) {
  const kpath = Katalog.pathnameMap[path];
  const spath = swaggerPaths[path];

  ['get', 'put', 'post', 'delete'].forEach(verb => {
    if (kpath[verb]) {
      hasKlientVerb(spath, kpath, verb);
    }
  });
}
