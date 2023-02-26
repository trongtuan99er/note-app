import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import bodyParser from 'body-parser'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import { resolvers } from './resolvers/index.js';
import { typeDefs } from './schemas/index.js';
import './firebaseConfig.js'

const app = express();
const httpServer = http.createServer(app);

// conect to mongodb
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.x0o6orf.mongodb.net/?retryWrites=true&w=majority`
const PORT = process.env.PORT || 4000
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
}) 

await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server))
mongoose.set('strictQuery', false)
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("conected to DB");
  await new Promise((resolve) => httpServer.listen({port: PORT}, resolve) );
  console.log('sever ready');
})

