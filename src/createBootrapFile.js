// @flow
import type { Types } from '../types';
import serialize from 'serialize-javascript';

export default (types: Types) => {
  const template = `
    const components = ${serialize(types.components)}

    export default components;
  `;
  return template;
};
