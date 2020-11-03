const faunadb = require('faunadb')

exports.handler = async event => {
  const q = faunadb.query
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET_KEY,
  })

  const {text} = JSON.parse(event.body)
  const query = q.Create(q.Collection('todos'), {
    data: {text, isCompleted: false},
  })
  const document = await client.query(query)

  return {
    statusCode: 200,
    body: JSON.stringify({
      ...document,
    }),
  }
}
