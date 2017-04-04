'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _graphqlTools = require('graphql-tools');

const rootQuery = queries => `
    type RootQuery {
      ${queries.map(q => q)}
    }
`;

const rootMutation = mutations => `
    type RootMutation {
      ${mutations.map(q => q)}
    }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

const buildSchema = ({ Types, Queries, Mutations, Resolvers }) => {
  const RootQuery = rootQuery(Queries);
  const RootMutation = rootQuery(Mutations);

  return (0, _graphqlTools.makeExecutableSchema)({
    typeDefs: [SchemaDefinition, Types, RootQuery, RootMutation],
    resolvers: Resolvers,
  });
};

exports.default = buildSchema;
