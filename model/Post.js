export const schema = `
  type Post {
    id: String!
    title: String!
    content: String!
  }
`;

export const rootQueries = `
  posts: [Post]
  countPosts: Int!
`;

// const rootMutations = ``;

export const resolvers = {
  RootQueries: {
    posts() {
      return [
        {
          id: '12313',
          title: 'Hello World',
          content: 'This is a graphql cms post',
        },
      ];
    },
    countPosts() {
      return 1;
    },
  },
};

export const components = {
  Post: {
    id: ['ReadOnlyString'],
    title: ['ReadOnlyString'],
    content: ['ReadOnlyString'],
  },
};
