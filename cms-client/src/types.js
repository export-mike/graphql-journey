// Add imports to paths to custom components
const types = {
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
    title: ['TextInput'],
    content: ['TextInput'],
  },
};
export const typesAsArray = [
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
    title: ['TextInput'],
    content: ['TextInput'],
    displayName: 'Post',
  },
];
export default types;
