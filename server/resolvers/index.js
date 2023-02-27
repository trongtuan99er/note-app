import { GraphQLScalarType } from 'graphql'
import { AuthorModel, FolderModel, NoteModel } from '../models/index.js';
export const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    parseValue(value){
      return new Date(value)
    },
    serialize(value){
      return value.toISOString()
    }
  }),
  Query: {
    folders: async (parent, args, context) => { 
      const folders = await FolderModel.find({
        authorId: context.uid
      }).sort({
        updatedAt: 'desc'
      });
      return folders
    },
    folder: async (parent, agrs) => {
      const folderId = agrs.folderId
      const findFolder = await FolderModel.findById(folderId)
      return findFolder
    },
    note: async (parent, agrs) => {
      const noteId = agrs.noteId
      const findNote = await NoteModel.findById(noteId)
      return findNote
      // return fakeData.notes.find((note) => note.id === noteId)
    }
  },
  Folder: {
    author: async (parent, agrs) => {
      const authorId = parent.authorId
      const author = await AuthorModel.findOne({
        uid: authorId
      })
      return author
    },
    notes: async (parent, agrs) => {
      const notes = await NoteModel.find({
        folderId: parent.id
      }).sort({
        updatedAt: 'desc'
      })
      return notes
    }
  },
  Mutation: {
    addNote: async (parent, agrs) => {
      const newNote = new NoteModel(agrs)
      await newNote.save()
      return newNote
    },
    updateNote: async (parent, agrs) => {
      const noteId = agrs.id
      const note = await NoteModel.findByIdAndUpdate(noteId, agrs)
      return note
    },
    addFolder: async (parent, agrs, context) => {
      const newFolder = new FolderModel({...agrs, authorId: context.uid})
      await newFolder.save()
      return newFolder 
    },
    register: async (parent, agrs) => {
      const newUser = new AuthorModel(agrs)
      const foundUser = await AuthorModel.findOne({
        uid: agrs.uid
      })
      if(!foundUser){
        newUser.save()
        return newUser
      }
      return newUser
    }
  }
};