'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _importTypes = require('./importTypes');

var _importTypes2 = _interopRequireDefault(_importTypes);

var _objectToArray = require('./objectToArray');

var _objectToArray2 = _interopRequireDefault(_objectToArray);

var _getTypeInformation = require('./getTypeInformation');

var _getTypeInformation2 = _interopRequireDefault(_getTypeInformation);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = typesPath =>
  (0, _importTypes2.default)(typesPath)
    .then(_objectToArray2.default)
    .then(_getTypeInformation2.default);
