import fakeData from '../fakeData/index.js'
import { FolderModel } from '../models/index.js';
export const resolvers = {
  Query: {
    folders: async (parent, args, context) => { 
      const folders = await FolderModel.find({
        authorId: context.uid
      });
      return folders
    },
    folder: async (parent, agrs) => {
      const folderId = agrs.folderId
      const findFolder = await FolderModel.findOne({
        _id: folderId
      })
      return findFolder
    },
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
  Mutation: {
    addFolder: async (parent, agrs) => {
      const newFolder = new FolderModel({...agrs, authorId: "123"})
      await newFolder.save()
      return newFolder 
    }
  }
};