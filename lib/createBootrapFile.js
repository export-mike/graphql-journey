'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _serializeJavascript = require('serialize-javascript');

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = types => {
  const template = `
    const components = ${(0, _serializeJavascript2.default)(types.UiComponents)}

    export default components;
  `;
  return template;
};
