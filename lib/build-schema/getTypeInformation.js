export default types => {
  const qlTypes = types.reduce((acc, type) => acc.concat(type.QlType), []);
  const qlQueries = types.reduce((acc, type) => acc.concat(type.QlQueries), []);
  const qlMutations = types.reduce(
    (acc, type) => acc.concat(type.QlMutations),
    []
  );
  const qlResolvers = types.reduce((acc, type) => ({
    ...acc,
    ...type.QlResolvers,
  }));
  const components = types.reduce((acc, type) => ({
    ...acc,
    [type.name]: {
      Component: type.Component,
    },
  }));

  return {
    qlTypes,
    qlQueries,
    qlMutations,
    qlResolvers,
    components,
  };
};
