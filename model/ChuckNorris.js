import fetch from 'isomorphic-fetch';

export const schema = `
  type JokeCategory {
    category: String!
  }
  type Joke {
    iconUrl: String!
    id: String!
    url: String!
    value: String!
  }
`;

export const rootQueries = `
  jokeCategories: [JokeCategory]
  joke(category: String!): Joke
`;

// export const rootMutations = ``;

export const resolvers = {
  RootQueries: {
    async joke(_, args) {
      const response = await fetch(
        `https://api.chucknorris.io/jokes/random?category=${args.category}`
      );

      const { icon_url, value, category, url, id } = await response.json();

      const newJoke = {
        iconUrl: icon_url,
        value,
        category,
        url,
        id,
      };

      return newJoke;
    },
    async jokeCategories() {
      const response = await fetch(
        'https://api.chucknorris.io/jokes/categories'
      );
      const categories = await response.json();
      return categories.map(c => ({ category: c }));
    },
  },
};
