export const GRAPHQL_SERVER = 'http://localhost:4000'
export const graphqlRequest = async (payload, options) => {
  const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: `google ${localStorage.getItem('accessToken')}`,
      ...options
    },
    body: JSON.stringify(payload)
  })

  const {data} = await res.json()
  return data
}