import { graphqlRequest } from "./request"

export const NoteListLoader = async ({params}) => {
  const folderId = params.folderId
  const query = `query Folder($folderId: String!) {
    folder(folderId: $folderId) {
      id
      notes {
        id
        content
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
  const query = `query Folder($noteId: String!) {
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