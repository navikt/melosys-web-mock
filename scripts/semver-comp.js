const semver = require('semver');
const argv = process.argv;
// argv.map((e, i) => console.log(i, e));
const a = argv[3];
const b = argv[5];
// npm run-script semver-comp -- -a 2.0.0 -b 1.0.0
const comp = semver.gt(a, b);
console.log(comp);
