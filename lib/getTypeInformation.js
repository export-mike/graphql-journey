'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _extends = Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

exports.default = types => {
  const Types = types.reduce((acc, type) => acc.concat(type.Types), []);

  const Queries = types.reduce((acc, type) => acc.concat(type.Queries), []);

  const Mutations = types.reduce((acc, type) => acc.concat(type.Mutations), []);

  const Resolvers = types.reduce(
    (acc, type) => _extends({}, acc, type.Resolvers),
    {}
  );

  const UiComponents = types.reduce(
    (acc, type) => _extends({}, acc, {
      [type.name]: _extends({}, type.UiComponents),
    }),
    {}
  );

  return {
    Types,
    Queries,
    Mutations,
    Resolvers,
    UiComponents,
  };
};
