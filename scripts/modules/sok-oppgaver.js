const fs = require('fs');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;

const lesOppgaver = (fnr) => {
  const mockfile = `${MOCK_DATA_DIR}/oppgaver/sok/fnr-${fnr}.json`;
  if (fs.existsSync(mockfile)) {
    return JSON.parse(fs.readFileSync(mockfile, "utf8"));
  }
  return [];
};

exports.sokOppgaver = (req, res) => {
  try {
    const fnr = req.query.fnr;
    const oppgaver = lesOppgaver(fnr);
    return res.json(oppgaver);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
