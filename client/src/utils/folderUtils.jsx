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

export const addNewFolder = async (newFolder) => {
  const query = `mutation Mutation($name: String!) {
    addFolder(name: $name) {
      name
      author {
        name
      }
    }
  }`;

  const data = await graphqlRequest({
    query,
    variables: { name: newFolder.name },
  });

  return data;
};