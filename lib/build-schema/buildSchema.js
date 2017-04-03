import { makeExecutableSchema } from 'graphql-tools';

const rootQuery = queries => `
    type RootQuery {
      ${queries.map(q => q)}
    }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

const buildSchema = ({ qlTypes, qlQueries, qlMutations, qlResolvers }) => {
  const RootQuery = rootQuery(qlQueries);

  return makeExecutableSchema({
    typeDefs: [SchemaDefinition, RootQuery, ...qlTypes],
    resolvers: qlResolvers,
  });
};

export default buildSchema;
