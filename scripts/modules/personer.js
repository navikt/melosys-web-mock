const fs = require('fs');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;

const lesPerson = (fnr) => {
  const mockfile = `${MOCK_DATA_DIR}/personer/fnr-${fnr}.json`;
  return JSON.parse(fs.readFileSync(mockfile, "utf8"));
};

exports.hentPerson = (req, res) => {
  try {
    const fnr = req.query.fnr;
    const person = lesPerson(fnr);
    res.json(person);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
