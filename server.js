import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
// import myGraphQLSchema from './schema';
import cors from 'cors';
const PORT = 8000;
import cms from './src/qlcms';

var app = express();
app.use('*', cors());
// bodyParser is needed just for POST.
const myGraphQLSchema = new cms({
  typesPath: `${process.cwd()}/model`,
}).buildSchema();

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema: myGraphQLSchema, context: {} })
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  })
);

app.listen(PORT);
console.log('running', PORT);
