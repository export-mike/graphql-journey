import { find, filter } from 'lodash';
import fetch from 'isomorphic-fetch';

const cars = [
  { id: 1, model: 'GOLF', numberOfSeats: 5, manufacturerId: 1 },
  { id: 2, model: 'Fiesta', numberOfSeats: 5, manufacturerId: 2 },
  { id: 3, model: 'X5', numberOfSeats: 3, manufacturerId: 4 },
];

const manufacturers = [
  { id: 1, name: 'VW' },
  { id: 2, name: 'Ford' },
  { id: 4, name: 'BMW' },
];

const categories = [];
const jokes = [];

const resolveFunctions = {
  Query: {
    car(_, { id }) {
      return find(cars, { id });
    },
    cars(_, { numberOfSeats }) {
      if (numberOfSeats) {
        return filter(cars, { numberOfSeats });
      }
      return cars;
    },
    manufacturers() {
      return manufacturers;
    },
    manufacturer(_, { id }) {
      return find(manufacturers, { id });
    },
    async joke(_, args) {
      const joke = filterByCategory(args.category);
      if (joke) return joke;

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

      addJoke(newJoke);
      return newJoke;
    },
    async jokeCategories() {
      if (categories.length) {
        return categories;
      }

      const response = await fetch(
        'https://api.chucknorris.io/jokes/categories'
      );
      const categories = await response.json();
      return categories.map(c => ({ category: c }));
    },
  },
  Car: {
    manufacturer({ manufacturerId }) {
      return find(manufacturers, { id: manufacturerId });
    },
  },
  Manufacturer: {
    cars({ id }) {
      return filter(cars, { manufacturerId: id });
    },
  },
};

export default resolveFunctions;
