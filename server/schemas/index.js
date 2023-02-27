export const typeDefs = `#graphql
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

type Mutation {
  register(uid: String!, name: String!): Author,
}
`;