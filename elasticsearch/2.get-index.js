const { client } = require('./client')
const { INDEX } = require('./constants');

(async function() {
  existsRes = await client.indices.exists({ index: INDEX })
  if (!existsRes) {
    console.log(` * Index [${INDEX}] does not exists`)
  }
  console.log(` * Response to check the existence of the index [${INDEX}]:`, existsRes)


  if (existsRes) {
    const getIndexRes = await client.indices.get({ index: INDEX })

    console.log(` * Get index [${INDEX}] response:`, getIndexRes[INDEX].settings)
    console.log(` * Index [${INDEX}] mappings:`, getIndexRes[INDEX].mappings)
  }
})()
