require('babel-register');
require('babel-polyfill');
const cms = require('./src/qlcms').default;
const b = new cms({
  typesPath: `${process.cwd()}/model`,
}).buildCms();
console.log(b);
