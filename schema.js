import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const schema = `
type Car {
  id: Int!
  model: String
  numberOfSeats: Int
  manufacturer: Manufacturer
}
type Manufacturer {
  id: Int!
  name: String
  cars: [Car]
}
type ChuckNorrisJokeCategory {
  category: String!
}
type ChuckNorrisJoke {
  category: [ChuckNorrisJokeCategory]
  iconUrl: String!
  id: String!
  url: String!
  value: String!
}
# the schema allows the following query:
type Query {
  cars: [Car]
  car(id: Int!): Car
  manufacturer(id: Int!): Manufacturer
  manufacturers: [Manufacturer]
  cars(numberOfSeats: Int!): [Car]
  jokeCategories: [ChuckNorrisJokeCategory]
  joke(category: String!): ChuckNorrisJoke
}
`;
// add mutations to vote on jokes and not show them again if bad!
export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});
