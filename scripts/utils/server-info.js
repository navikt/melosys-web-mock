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
      if (interfaces.ens192) return interfaces.ens192;
      if (interfaces.eno16780032) return interfaces.eno16780032;
      return interfaces.lo;
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

const namespace = 't8';
const cluster = `NodeJS ${process.version}`;
const gitShellExec = shell.exec('git rev-parse HEAD');
const longVersionHash = gitShellExec.stdout.trim();
const veraUrl = 'https://vera.adeo.no/#/log?application=melosys';
let branchName = process.env.BRANCH_NAME || 'unknown';
if (branchName === 'unknown') {
  branchName = branch.sync(process.cwd());
}

const serverInfo = {
  namespace,
  cluster,
  veraUrl,
  longVersionHash,
  branchName
};

module.exports.hentServerInfo = (req, res) => {
  res.json(serverInfo)
};

