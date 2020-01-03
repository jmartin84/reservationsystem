import { ApolloServer } from 'apollo-server-express';
import express from 'express'
import { join } from 'path';
import morgan from 'morgan';
import { schemas, resolvers } from './api';

import webpack from 'webpack';
import getWebpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config.babel';

const host = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT, 10) || 3000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';

const app = express();

const apollo = new ApolloServer({
    typeDefs: schemas,
    resolvers
});

app.use(morgan(process.env.NODE_ENV));

// typically I'd either use the standalone server
// or limit this to only be imported/used in a dev env
app.use(getWebpackDevMiddleware(webpack(webpackConfig)));

app.use(express.static(join(__dirname, 'public')));
apollo.applyMiddleware({ app });

app.listen(port, host, () => console.log(`app listening on ${host}:${port}`))
