// @flow
import getTypes from '../getTypes';
import buildSchema from './buildSchema';
import R from 'ramda';
// Flow stops here :( I want functional but no type checking
export default R.pipe(getTypes, buildSchema);
