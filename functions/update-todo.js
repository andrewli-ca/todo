const faunadb = require('faunadb')

exports.handler = async event => {
  const q = faunadb.query
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET_KEY,
  })

  const {id} = event.queryStringParameters
  const data = JSON.parse(event.body)

  const query = q.Update(q.Ref(q.Collection('todos'), id), {
    data,
  })
  const document = await client.query(query)

  return {
    statusCode: 200,
    body: JSON.stringify({
      ...document,
    }),
  }
}
