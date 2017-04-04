const components = {
  Author: {
    id: ['ReadOnlyString'],
    title: ['ReadOnlyString'],
    name: ['ReadOnlyString'],
  },
  Car: {
    id: ['ReadOnlyString'],
    model: ['ReadOnlyString'],
    make: ['ReadOnlyString'],
    reg: ['ReadOnlyString'],
  },
  Post: {
    id: ['ReadOnlyString'],
    title: ['ReadOnlyString'],
    content: ['ReadOnlyString'],
  },
};
export const componentsAsArray = [
  {
    id: ['ReadOnlyString'],
    title: ['ReadOnlyString'],
    name: ['ReadOnlyString'],
    displayName: 'Author',
  },
  {
    id: ['ReadOnlyString'],
    model: ['ReadOnlyString'],
    make: ['ReadOnlyString'],
    reg: ['ReadOnlyString'],
    displayName: 'Car',
  },
  {
    id: ['ReadOnlyString'],
    title: ['ReadOnlyString'],
    content: ['ReadOnlyString'],
    displayName: 'Post',
  },
];
export default components;
