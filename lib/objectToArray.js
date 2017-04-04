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
  }; // // @ low
// export default function (obj: Object): Array<Object> {
//   return Object.keys(obj)
//   .reduce((acc: Array<Object>, k:string) => {
//     return [...acc, [ obj[k] ]];
//   }, [])

exports.default = function(obj) {
  return Object.keys(obj).reduce(
    (acc, k) => {
      return acc.concat([_extends({ name: k }, obj[k])]);
    },
    []
  );
};
