// @flow
import type { Types } from '../../types';
import { makeExecutableSchema } from 'graphql-tools';

const rootQuery = queries => {
  if (!queries.length) return '';
  return `
      type RootQueries {
        ${queries.reduce((acc, q) => `${acc}${q}`, '')}
      }
    `;
};

const rootMutation = mutations => {
  if (!mutations.length) return '';

  return `
    type RootMutations {
      ${mutations.reduce((acc, q) => `${acc}${q}`, '')}
    }
  `;
};

const schemaDefinition = (queries, mutations) => {
  let body = '';
  if (queries) body += 'query: RootQueries\n';
  if (mutations) body += 'mutation: RootMutations\n';

  return `
    schema {
      ${body}
    }
  `;
};

const rootSchema = (queries, mutations, definition) => {
  return `
    ${queries}
    ${mutations}
    ${definition}
  `;
};

const buildSchema = (
  { schemas, resolvers, rootQueries, rootMutations }: Types
) => {
  const queries = rootQuery(rootQueries);
  const mutations = rootMutation(rootMutations);
  // console.log([rootSchema(queries, mutations, schemaDefinition(queries, mutations)), ...schemas]);
  return makeExecutableSchema({
    typeDefs: [
      rootSchema(queries, mutations, schemaDefinition(queries, mutations)),
      ...schemas,
    ],
    resolvers: resolvers, // rootMutations
  });
};

export default buildSchema;
