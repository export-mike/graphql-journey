const components = {
  ChuckNorris: {
    JokesCategory: {
      category: [
        'ReadOnlyString',
        { helpText: 'This is read only', alert: () => alert('hi') },
      ],
    },
    Joke: {
      iconUrl: ['ReadOnlyString'],
      id: ['ReadOnlyString'],
      url: ['ReadOnlyString'],
      value: ['ReadOnlyString'],
    },
  },
};

export default components;
