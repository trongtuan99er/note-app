import fakeData from '../fakeData/index.js'
import { AuthorModel, FolderModel, NoteModel } from '../models/index.js';
export const resolvers = {
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