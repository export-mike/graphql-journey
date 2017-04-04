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
// `type RootQueries {
//  jokeCategories: [JokeCategory]
//  joke(category: String!): Joke
// }
// schema {
//  query: RootQueries
// }
// type JokeCategory {
//  category: String!
// }
// type Joke {
//  iconUrl: String!
//  id: String!
//  url: String!
//  value: String!
// }`,
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
    resolvers: { RootQueries: resolvers },
  });
};

export default buildSchema;
