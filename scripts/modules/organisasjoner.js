const fs = require('fs');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;

const lesOrganisasjon = (orgnr) => {
  const mockfile = `${MOCK_DATA_DIR}/organisasjoner/orgnr-${orgnr}.json`;
  return fs.existsSync(mockfile) ? JSON.parse(fs.readFileSync(mockfile, "utf8")) : {};
};

exports.hent = (req, res) => {
  const orgnr = req.query.orgnr;
  const organisasjon = lesOrganisasjon(orgnr);
  res.json(organisasjon);
};
