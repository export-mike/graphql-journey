'use strict';

var _buildSchema = require('./build-schema');

var _buildSchema2 = _interopRequireDefault(_buildSchema);

var _importUiComponents = require('./importUiComponents');

var _importUiComponents2 = _interopRequireDefault(_importUiComponents);

var _createBootrapFile = require('./createBootrapFile');

var _createBootrapFile2 = _interopRequireDefault(_createBootrapFile);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step('next', value);
            },
            function(err) {
              step('throw', err);
            }
          );
        }
      }
      return step('next');
    });
  };
}

class QlCms {
  constructor(config = { typesPath: './types', outputPath: './cms' }) {
    this.config = config;
  }

  buildSchema() {
    var _this = this;

    return _asyncToGenerator(function*() {
      const schema = yield (0, _buildSchema2.default)(_this.config.typesPath);
      return schema;
    })();
  }
  buildCms() {
    var _this2 = this;

    return _asyncToGenerator(function*() {
      const uiComponents = yield (0, _importUiComponents2.default)(
        _this2.config.typesPath
      );
      yield (0, _createBootrapFile2.default)(
        uiComponents,
        _this2.config.outputPath
      );
      console.log('done');
    })();
  }
}

// extract each file to pass to webpack for bundling
// produce an intial cms types list object for the UI to use to render
// we have a list of given components by fs.readDir map component
// we template a js file and reference the output after template has been compiled in webpack

/*


  produce a cms.min.js via a commandline tool
  index.html

  tool looks at the list of types in ./types
  produces a series of require('./types/<Type.js>')
  held in a map. to be accessed by the ui after querying the list of types
  on a given route list we

*/

/*
  const components = {};
  {{types.map(type => {
    components[type.name] = require({{type.name}})
  })}}
*/

// Home
// <UL>
// map types { count } <LI count={count}/>
// </UL>

/* N Types Queries, No Mutations */
/*
  type Query {
    countAuthors {
      count
    }
    countCars {
      count
    }
    countN {
      count
    }
  }
*/

// List url=/items/author
// <UL>
// map.rows r <LI {...r} />
// </UL>

/* 1 Query, No Mutations */
/*

  type Query {
    author {
      cms.types['author'].fields.map(f => f)
    }
  }

*/

// url=/item/author/create
// <form>
// map cms.types['author'].fields { component } <component {...item} />

/* No Queries, Just one Mutation */

// url=/item/author/edit/:ID

// Webpack plugin to pull the components out of the working directory this will also pull the default components in node_modules
// cms is bundled with the following and can be statically hosted
// we can use some basic templating in our webpack plugin to generate the graphql queries for the given site
// or it can be computed on the client, we'd need to only deploy a new admin site when new components/types are added
// we could provide a git commit hook which would partly run the build step to check if its changed from previous and inform if it needs to be redeployed
// cms.types = {
//   Author: {
//     name: Component
//   }
// }
// cms.components[]
// cms.endpoint = '/'

/*

  ___Authentication___
  We simply return 'null' from the api if you are not allowed

  client could navigate to a path its not naturally discovered. In which case we just return null and handle

  we could wrap this in an api which logs the access to un-authorised requests. we can even raise this as a ui component in the admin

*/