import { graphqlRequest } from "./request"

export const folderLoader = async () => {
  const query = `query folders {
    folders {
      name
      id
      createdAt
    }
  }`
  const data = await graphqlRequest({query})
  return data
}