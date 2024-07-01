const { client } = require('./client')
const { INDEX } = require('./constants')

const path = require('path')
const fs = require('fs');

(async function() {
  let datasource
  try {
    const datasourcePath = path.join(__dirname, '..', `${INDEX}.json`)
    const fileData = fs.readFileSync(datasourcePath, 'utf8')
    datasource = JSON.parse(fileData)
  } catch (error) {
    console.error(` **> Error reading file:`, error.message)
    process.exit(1)
  }

  try {
    const bulkIndexRes = await client.helpers.bulk({
      index: INDEX,
      datasource,
      onDocument(doc) {
        return {
          index: { _index: INDEX, _id: doc.id }
        }
      }
    })

    console.log(' * Bulk index documents response', bulkIndexRes)
    console.log(` * All documents indexed successfully`)
  } catch (error) {
    console.error(' **> Error indexing documents:', error.message)
  }
})()
