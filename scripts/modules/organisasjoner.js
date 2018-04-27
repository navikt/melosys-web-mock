const fs = require('fs');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;

const lesOrganisasjon = (orgnr) => {
  const mockfile = `${MOCK_DATA_DIR}/organisasjoner/orgnr-${orgnr}.json`;
  if (fs.existsSync(mockfile)) {
    return JSON.parse(fs.readFileSync(mockfile, "utf8"));
  }
  else {
    return {};
  }
};

exports.hentOrganisasjon = (req, res) => {
  const orgnr = req.query.orgnr;
  const organisasjon = lesOrganisasjon(orgnr);
  res.json(organisasjon);
};
