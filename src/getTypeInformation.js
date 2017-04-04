// @flow
import type { Types } from '../types';

type CMSType = {
  resolvers: Object,
  schema: string,
  rootQueries: string,
  rootMutations: string,
  name: string,
  components: Object,
};

export default (types: Array<CMSType>): Types => {
  const rootQueries = types.reduce(
    (acc, type) => {
      if (!type.rootQueries) return acc;
      return [type.rootQueries, ...acc];
    },
    []
  );

  const rootMutations = types.reduce(
    (acc, type) => {
      if (!type.rootMutations) return acc;
      return [type.rootMutations, ...acc];
    },
    []
  );

  const resolvers = types.reduce(
    (acc, type) => ({
      ...acc,
      ...type.resolvers,
    }),
    {}
  );

  const schemas = types.reduce(
    (acc, type) => {
      if (!type.schema) return acc;
      return [type.schema, ...acc];
    },
    []
  );

  const components = types.reduce(
    (acc, type) => ({
      ...acc,
      [type.name]: {
        ...type.components,
      },
    }),
    {}
  );

  return {
    schemas,
    rootQueries,
    rootMutations,
    components,
    resolvers,
  };
};
