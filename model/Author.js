export const schema = `
  type Author {
    id: String!
    title: String!
    name: String!
  }
`;

export const rootQueries = `
  authors: [Author]
  countAuthors: Int!
`;

// const rootMutations = ``;

export const resolvers = {
  RootQueries: {
    authors() {
      return [
        {
          id: '12313',
          title: 'Hello World',
          name: 'Wilbur Smith',
        },
      ];
    },
    countAuthors() {
      return 1;
    },
  },
};

export const components = {
  Author: {
    id: ['ReadOnlyString'],
    title: ['ReadOnlyString'],
    name: ['ReadOnlyString'],
  },
};
