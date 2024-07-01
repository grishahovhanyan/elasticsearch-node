require('dotenv/config')
const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  node: process.env.ES_NODE,
  auth: { apiKey: process.env.ES_API_KEY }
})

client.info().then((data => {
  console.log(' * ElasticSearch client version:', data.version.number)
})).catch(e => {
  console.log('Error connection ElasticSearch:', e)
})

module.exports = {
  client
}
