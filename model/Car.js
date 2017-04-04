export const schema = `
  type Car {
    id: String!
    model: String!
    make: String!
    reg: String!
  }
`;

export const rootQueries = `
  cars: [Car]
  countCars: Int!
`;

// const rootMutations = ``;
const cars = [
  {
    id: '12313',
    model: 'Golf',
    make: 'VW',
    reg: 'wr26nj',
  },
  {
    id: '12313',
    model: 'M3',
    make: 'BMW',
    reg: 'md54bls',
  },
];
export const resolvers = {
  RootQueries: {
    cars() {
      return cars;
    },
    countCars() {
      return cars.length;
    },
  },
};

export const components = {
  Car: {
    id: ['ReadOnlyString'],
    model: ['ReadOnlyString'],
    make: ['ReadOnlyString'],
    reg: ['ReadOnlyString'],
  },
};
