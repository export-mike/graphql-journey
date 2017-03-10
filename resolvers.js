import { find, filter } from 'lodash';
import fetch from 'isomorphic-fetch';
// import { pubsub } from './subscriptions';
const cars = [
  {id: 1, model: 'GOLF', numberOfSeats: 5, manufacturerId: 1},
  {id: 2, model: 'Fiesta', numberOfSeats: 5, manufacturerId: 2},
  {id: 3, model: 'X5', numberOfSeats: 3, manufacturerId: 4}
];

const manufacturers = [
  { id: 1, name: 'VW' },
  { id: 2, name: 'Ford'},
  { id: 4, name: 'BMW'},
]

const resolveFunctions = {
  Query: {
    cars() {
      return cars;
    },
    car(_, { id }) {
      return find(cars, { id });
    },
    cars(_, { numberOfSeats }) {
      return filter(cars, { numberOfSeats });
    },
    manufacturers() {
      return manufacturers;
    },
    manufacturer(_, { id }) {
      return find(manufacturers, { id });
    },
    async getJokeByCategory(_, args) {
      const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${args.category}`);
      const { icon_url, value, category, url, id } = await response.json();
      return {
        iconUrl: icon_url,
        value,
        category,
        url,
        id,
      };
    },
    async chuckNorrisJokeCategories() {
      const response = await fetch('https://api.chucknorris.io/jokes/categories');
      const categories = await response.json();
      return categories.map(c => ({ category: c }));
    }
  },
  Car: {
    manufacturer({ manufacturerId }) {
      return find(manufacturers, {id: manufacturerId});
    }
  },
  Manufacturer: {
    cars({ id }) {
      return filter(cars, { manufacturerId: id });
    }
  },
};

export default resolveFunctions;
