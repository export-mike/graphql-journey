import importTypes from './importTypes';
import getTypeInformation from './getTypeInformation';
import buildSchema from './buildSchema';

export default types => importTypes(typesPath)
  .then(getTypeInformation)
  .then(info => {
    (this.qlTypes = info.qlTypes), (this.qlQueries = info.qlQueries);
    this.qlMutations = info.qlMutations;
    this.components = info.components;
    this.qlResolvers = info.qlResolvers;
    return info;
  })
  .then(buildSchema);
