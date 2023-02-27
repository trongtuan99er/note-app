import { graphqlRequest } from "./request"

export const NoteListLoader = async ({params}) => {
  const folderId = params.folderId
  const query = `query Folder($folderId: String!) {
    folder(folderId: $folderId) {
      id
      notes {
        id
        content
        updatedAt
      }
    }
  }`
  const data = await graphqlRequest({
    query,
    variables: {
      folderId
    }
  })
  return data
}

export const NoteDetailLoader = async ({params}) => {
  const noteId = params.noteId
  const query = `query Note($noteId: String!) {
    note(noteId: $noteId) {
      id
      content
    }
  }`
  const data = await graphqlRequest({
    query,
    variables: {
      noteId
    }
  })
  return data
}

export const addNewNote = async ({params, request}) => {
  const newNote = await request.formData()
  const formDataObj = {}
  newNote.forEach((value, key) => (formDataObj[key] = value))
  console.log({formDataObj});

  const query = `mutation Mutation($content: String!, $folderId: ID!){
      addNote(content: $content, folderId: $folderId){
        id
        content
      }
  }`

  const {addNote} = await graphqlRequest({
    query,
    variables: formDataObj
  })
  return addNote
}

export const updateNote = async ({params, request}) => {
  const note = await request.formData()
  const formDataObj = {}
  note.forEach((value, key) => (formDataObj[key] = value))
  console.log({formDataObj});

  const query = `mutation Mutation($id: String!, $content: String!){
      updateNote(id: $id, content: $content){
        id
        content
      }
  }`

  const {updateNote} = await graphqlRequest({
    query,
    variables: formDataObj
  })
  return updateNote
}