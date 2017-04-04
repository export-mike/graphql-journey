import Author from './Author';
import { fieldTypes } from 'qlcms';

const QlType = `
  type Author {
    id: String!
    name: Name!
    createdAt: Int!
  }
  type Name {
    first: String!
    last: String!
    fullName: String,
  }
`;

const uiSchema = {
  Name: {
    first: ['TextInput', { validation: f => [!f.trim().length, 'Please enter a first name'] }],
    last: ['TextInput', { validation: f => [!f.trim().length, 'Please enter a first name'] }],
    // full name won't be shown on the admin ui
  },
  Author: {
    id: ['./components/admin/ReadOnlyString', { helpText: 'blah custom' }],
    name: ['Name'],
    createdAt: ['ReadOnlyDateTime']
  }
};

/*
  ./components/js

  ejs template an import script
  for field in Model {
    `import _${field.name} ` from `${field.path}`;
    export ${field.name} = props => <${field.componentName} {...props}/>
  }

*/

/*

  check against UI schema

  if (coreComponents[arg[0]]) {
    // use core component
  }
  if (!coreComponents[arg0]) {
    if(pathExists(arg0)) {
      // use custom component
    }
    if (uiSchema[])
  }


*/


const TextInput = props =>
<div>
  {props.helpText && <span>{props.helpText}</span> }
  {props.isNotValid && <ErrorMessage message={props.validationMessage}/>}
  <input type={props.type} onChange={props.onChange} />
</div>

TextInput = CmsField(TextInput);

CmsField = Component => config => {
  return compose(
    withState('isNotValid', 'updateErrors', false),
    withState('validationMessage', 'validationMessage', ''),
    withHandlers({
      onChange: props => e => {
        const value = e.target ? e.target.value : e;
        const error = config.validation(value);
        const [isValid, validationMessage] = error;
        if (!isValid) {
          props.updateErrors(isNotValid => true);
          props.validationMessage(() => validationMessage);
          props.onError(validationMessage); // parent is called with error message passed up
          return;
        }
        props.onChange(value);
        props.onError(false); // parent is called with error message passed up
        props.updateErrors(isNotValid => false);
      }
    }),
  )(Component);
};


const Resolvers = {};

export default registerType =>
  registerType({
    name: 'Author', // name: { singular: String, plural: String }
    group: 'Library',
    helpText: 'This is our list of authors',
    uiComponents,
    graphql: {
      types,
      queries,
      resolvers,
      mutations
    }
  })

// const MyAuthor = {
//   id: fieldTypes
//       .string()
//       .required()
//       .component(components.ReadOnlyString)
//   name: fieldTypes
//         .string()
//         .required()
//         .component(components.TextInput),
//         .validation(name => !name.trim().length)
// }
// Ugly
// const Queries = {
//   author: query({ id: QueryTypes.string().required() })
//           .returns()
//           .type('MyAuthor'),
//   count: query()
//           .returns()
//           .int(),
//   authors: query({ name: QueryTypes.string(), age: QueryTypes.int()})
//             .returns()
//             .listOfType('MyAuthor'),
//   numberOfBooks: query({ name: QueryTypes.string() })
//                   .returns()
//                   .int(),
//   authorsBookcount: query({ name: QueryTypes.string() })
//                       .returns()
//                       .listOfInts()
// }
export default {
  type: {
    MyAuthor
  }
}

const UITypes = {
  id: fieldTypes.ReadOnly.String,
  name: {
    component: fieldTypes.TextInput,
    displayText: 'Blah blah blah',
    helpText: 'Blah ahhahah blah blah blah',
    someOtherProp: 'Yep Yep Yep'
  },
  createdAt: fieldTypes.ReadOnly.DateTime
}

const RootQueries = `
  countAuthors: Int
  author(id: String!): Author
  authors(name: String, age: Int): [Authors]
`;

const Mutations = `
  createAuthor(author: Author!): Author
`;

// completely Optional data layer Injection?
// data => ?
// add data layer to context
//https://github.com/apollographql/GitHunt-API/blob/master/api/sql/schema.js
const Resolvers = {
  async createAuthor(_, { name }, context) {
    return await Author.createAuthor({ name }, context);
  },
  async author(_, id, context) {
    return await Author.findById(id, context);
  }
  async authors(_, { name, age }, context) {
    if (name && age)
      return await Author.find({ name, age }, context);
    if (name)
      return await Author.findByName({ name }, context);
    if (age)
      return await Author.findByAge({ age }, context);

    return await Author.find(context);
  }
  countAuthors(_, _, context) {
    return await Author.count(context);
  }
};

// export const NAME = 'Author';
// export const GROUP = 'Library';
// export const HELP_TEXT = 'Blah Blah Blah';

/* Why even pass cms into our model? */
// export default cms =>
//   cms.type({
//     name: 'Author',
//     group: 'Library', // used to create groups in the admin UI
//     QlType,
//     UITypes,
//     QlQueries,
//     QlMutations,
//     QlResolvers,
//     Component, // optional if you want to render an entire component for the Type
//   })

// const isAdmin = fn => (parent, args, context) => {
//   if (context.isAdmin) {
//     return fn(parent, args, context);
//   }
//
//   return null;
// };
//
//
// Component.propTypes = {
//   name: PropTypes.string.isRequired
// }
