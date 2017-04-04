// @flow
import type { Types } from '../types';
import serialize from 'serialize-javascript';

type Data = {
  components: Object,
  componentsAsArray: Array<Object>,
};

export default (data: Data) => {
  const template = `
    const components = ${serialize(data.components)};
    export const componentsAsArray = ${serialize(data.componentsAsArray)};
    export default components;
  `;
  return template;
};
