'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.DescriptionText = (exports.HelpText = (exports.UiComponents = (exports.Resolvers = (exports.Types = (exports.Queries = undefined)))));

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step('next', value);
            },
            function(err) {
              step('throw', err);
            }
          );
        }
      }
      return step('next');
    });
  };
}

const Queries = (exports.Queries = `
  jokeCategories: [JokeCategory]
  joke(category: String!): Joke
`);

const Types = (exports.Types = `
  type JokeCategory {
    category: String!
  }
  type Joke {
    iconUrl: String!
    id: String!
    url: String!
    value: String!
  }
`);

const Resolvers = (exports.Resolvers = {
  joke(_, args) {
    return _asyncToGenerator(function*() {
      const response = yield (0, _isomorphicFetch2.default)(
        `https://api.chucknorris.io/jokes/random?category=${args.category}`
      );

      var _ref = yield response.json();

      const iconUrl = _ref.icon_url,
        value = _ref.value,
        category = _ref.category,
        url = _ref.url,
        id = _ref.id;

      const newJoke = {
        iconUrl,
        value,
        category,
        url,
        id,
      };

      return newJoke;
    })();
  },
  jokeCategories() {
    return _asyncToGenerator(function*() {
      const response = yield (0, _isomorphicFetch2.default)(
        'https://api.chucknorris.io/jokes/categories'
      );
      const categories = yield response.json();

      return categories.map(function(c) {
        return { category: c };
      });
    })();
  },
});

const UiComponents = (exports.UiComponents = {
  JokesCategory: {
    category: ['ReadOnlyString', { helpText: 'This is read only' }],
  },
  Joke: {
    // category: ['ReadOnlyString'], // todo make it a trasitive grapg     category: [JokeCategory]
    iconUrl: ['ReadOnlyString'],
    id: ['ReadOnlyString'],
    url: ['ReadOnlyString'],
    value: ['ReadOnlyString'],
  },
});

const HelpText = (exports.HelpText = 'This is a joke');
const DescriptionText = (exports.DescriptionText = 'This is just one big joke');
