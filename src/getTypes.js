// @flow
import importTypes from './requireTypes';
import objectToArray from './objectToArray';
import getTypeInformation from './getTypeInformation';
import R from 'ramda';

export default R.pipe(importTypes, objectToArray, getTypeInformation);
