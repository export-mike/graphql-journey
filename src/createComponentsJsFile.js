// @flow
import getTypes from './getTypes';
import createBootrapFile from './createBootrapFile';
import R from 'ramda';

const ignoreTypesWithNoComponents = types => Object.keys(
  types.components
).reduce(
  (acc, k) => {
    if (Object.keys(types.components[k]).length === 0) return acc;
    return { ...acc, ...types.components[k] };
  },
  {}
);

const constructDataForTemplate = components => ({
  components,
  componentsAsArray: Object.keys(components).reduce(
    (acc, k) => [...acc, { ...components[k], displayName: k }],
    []
  ),
});

export default R.pipe(
  getTypes,
  ignoreTypesWithNoComponents,
  constructDataForTemplate,
  createBootrapFile
);
