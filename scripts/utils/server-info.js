const os = require('os');
const _ = require('lodash');
const moment = require('moment');
const branch = require('git-branch');
const shell = require('shelljs');

moment.locale('nb');

function platformNIC() {
  const interfaces = os.networkInterfaces();
  switch (process.platform) {
    case 'darwin':
      return interfaces.lo0;
    case 'linux':
      return interfaces.ens192 ? interfaces.ens192 : interfaces.eno16780032;
    default: // win32
      return interfaces.Ethernet0 ? interfaces.Ethernet0 : interfaces['Wi-Fi'];
  }
}


module.exports.getIpAdress = () => {
  const nic = platformNIC();
  const ipv4 = _.find(nic, function(item){
    return item.family === 'IPv4';
  });
  return ipv4.address;
};

const environment = "MOCK SERVER";
const gitShellExec = shell.exec('git rev-parse --short HEAD');
const shortVersionHash = gitShellExec.stdout.trim();
const buildNumber = process.env.BUILD_NUMBER || 'local';
const version = `${process.env.npm_package_version}`;
let branchName = process.env.BRANCH_NAME || 'unknown';
if (branchName === 'unknown') {
  branchName = branch.sync(process.cwd());
}

const build_date_time = moment().format('DD/MM/YYYY HH:mm');
const serverInfo = {
  environment,
  build_date_time,
  buildNumber,
  version,
  shortVersionHash,
  branchName
};

module.exports.hentInfo = (req, res) => {
  res.json(serverInfo)
};

