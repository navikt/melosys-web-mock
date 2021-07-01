const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema');
const resolvers = require('./resolvers');

const graphqlRouter = graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
});

module.exports.graphqlRouter = graphqlRouter;
