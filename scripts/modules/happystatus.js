const _ = require('underscore');

module.exports.happyStatus = (statusarray) => {
  const HAPPY = process.env.HAPPY || false;
  return (HAPPY) ? 200 : _.sample(statusarray);
};
