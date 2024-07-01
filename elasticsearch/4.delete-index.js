const { client } = require('./client')
const { INDEX } = require('./constants');

(async function() {
  try {
    const deleteIndexRes = await client.indices.delete({ index: INDEX })

    console.log(` * Delete index [${INDEX}] response:`, deleteIndexRes)
  } catch (error) {
    console.log(` * Index [${INDEX}] does not exists`)
    console.error(' **> Error deleting index:', error.message)
  }
})()
