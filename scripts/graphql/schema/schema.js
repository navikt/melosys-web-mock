const fs = require("fs");
const { join } = require("path");
const gql = require("graphql-tag");
const { buildASTSchema } = require("graphql");

const schemaString = fs.readFileSync(join(__dirname, "./schema.graphqls"), { encoding: "utf8" });
const schema = buildASTSchema(gql(schemaString));

module.exports = schema;
