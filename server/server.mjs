import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import bodyParser from 'body-parser'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import fakeData from './fakeData/index.js';
import mongoose from 'mongoose'
import 'dotenv/config'
const app = express();
const httpServer = http.createServer(app);

const typeDefs = `#graphql
  type Folder {
    id: String,
    name: String,
    createdAt: String
    author: Author
    notes: [Note]
  }
  type Note {
    id: String
    content: String
    folderId: String
  }
  type Author {
    id: String
    name: String
  }

  type Query {
    folders: [Folder]
    folder(folderId: String): Folder
    note(noteId: String): Note
  }
  `;
const resolvers = {
  Query: {
    folders: () => { return fakeData.folders},
    folder: ((parent, agrs) => {
      const folderId = agrs.folderId
      return fakeData.folders.find((folder) => folder.id === folderId)
    }),
    note: (parent, agrs) => {
      const noteId = agrs.noteId
      return fakeData.notes.find((note) => note.id === noteId)
    }
  },
  Folder: {
    author: (parent, agrs) => {
      const authorId = parent.authorId
      return fakeData.auhors.find(author => author.id === authorId)
    },
    notes: (parent, agrs) => {
      return fakeData.notes.filter(note => note.folderId === parent.id)
    }
  },
};
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

