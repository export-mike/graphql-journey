'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

exports.default = function(path) {
  return new Promise((resolve, reject) => {
    try {
      resolve((0, _requireDirectory2.default)(module, path));
    } catch (e) {
      reject(e);
    }
  });
};

var _requireDirectory = require('require-directory');

var _requireDirectory2 = _interopRequireDefault(_requireDirectory);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
