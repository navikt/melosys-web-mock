const semver = require('semver');
const argv = require('yargs').argv;
// yarn semver-comp -a 2.0.0 -b 1.0.0
const comp = semver.gt(argv.a, argv.b);
console.log(comp);
