// @flow
import type { Types } from '../types';
import serialize from 'serialize-javascript';

type Data = {
  components: Object,
  componentsAsArray: Array<Object>,
};

export default (data: Data) => {
  const template = `
		// Add imports to paths to custom components
    const types = ${serialize(data.components)};
    export const typesAsArray = ${serialize(data.componentsAsArray)};
    export default types;
  `;
  return template;
};
