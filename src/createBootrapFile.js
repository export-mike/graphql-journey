// @flow
import type { Types } from '../types';
import serialize from 'serialize-javascript';

export default (components: Object) => {
  const template = `
    const components = ${serialize(components)}

    export default components;
  `;
  return template;
};
