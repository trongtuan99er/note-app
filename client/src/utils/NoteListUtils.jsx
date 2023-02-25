export const NoteListLoader = async ({params}) => {
  const folderId = params.folderId
  const query = `query Folder($folderId: String) {
    folder(folderId: $folderId) {
      id
      notes {
        id
        content
      }
    }
  }`
  const res = await fetch('http://localhost:4000/graphql', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables: {
        folderId
      }
    })
  })

  const {data} = await res.json()
  return data
}

export const NoteDetailLoader = async ({params}) => {
  const noteId = params.noteId
  const query = `query Folder($noteId: String) {
    note(noteId: $noteId) {
      id
      content
    }
  }`
  const res = await fetch('http://localhost:4000/graphql', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables: {
        noteId
      }
    })
  })

  const {data} = await res.json()
  return data
}