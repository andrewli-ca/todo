const faunadb = require('faunadb')

exports.handler = async event => {
  const q = faunadb.query
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET_KEY,
  })

  const query = q.Map(
    q.Paginate(q.Documents(q.Collection('todos'))),
    q.Lambda(x => q.Get(x)),
  )
  const document = await client.query(query)

  return {
    statusCode: 200,
    body: JSON.stringify({
      todos: document.data,
    }),
  }
}
