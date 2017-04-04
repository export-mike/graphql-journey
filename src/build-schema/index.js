// @flow
import importTypes from '../importTypes';
import objectToArray from '../objectToArray';
import getTypeInformation from '../getTypeInformation';
import buildSchema from './buildSchema';
import R from 'ramda';
// Flow stops here :( I want functional but no type checking
export default R.pipe(
  importTypes,
  objectToArray,
  getTypeInformation,
  buildSchema
);
