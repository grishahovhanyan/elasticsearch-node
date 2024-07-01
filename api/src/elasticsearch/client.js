require('dotenv/config')
const { Client } = require('@elastic/elasticsearch')

const esClient = new Client({
  node: process.env.ES_NODE,
  auth: { apiKey: process.env.ES_API_KEY }
})

// es - ElasticSearch
esClient.info().then((data => {
  console.log('ElasticSearch client version:', data.version.number)
})).catch(e => {
  console.log('Error connecting ElasticSearch:', e)
})

module.exports = {
  esClient
}
