const { client } = require('./client')
const { INDEX } = require('./constants');

(async function() {
  try {
    const updateMappingsRes = await client.indices.putMapping({
      index: INDEX,
      body: {
        properties: {
          newFiled: { type: 'keyword' },
        }
      }
    })

    console.log(` * Put index mapping [${INDEX}] response:`, updateMappingsRes)
  } catch (error) {
    console.error(' **> Error put index mapping:', error.message)
  }
})()
