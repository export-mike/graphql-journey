// @flow
import importTypes from '../importTypes';
import objectToArray from '../objectToArray';
import getTypeInformation from '../getTypeInformation';
import buildSchema from './buildSchema';

export default (typesPath: string): Promise<Object> =>
  importTypes(typesPath)
    .then(objectToArray)
    .then(getTypeInformation)
    .then(buildSchema);
