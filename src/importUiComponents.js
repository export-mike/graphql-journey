// @flow
import importTypes from './importTypes';
import objectToArray from './objectToArray';
import getTypeInformation from './getTypeInformation';

export default (typesPath: string) =>
  importTypes(typesPath).then(objectToArray).then(getTypeInformation);
