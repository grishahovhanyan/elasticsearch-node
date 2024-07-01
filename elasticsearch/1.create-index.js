const { client } = require('./client')
const { INDEX } = require('./constants');

(async function() {
  // [type keyword]: When you make a search query on this field you have to insert the whole value (keyword search)
  // [type text]: This type is analyzed and you can search using tokens from the field value

  try {
    const createIndexRes = await client.indices.create({
      index: INDEX,
      body: {
        mappings: {
          properties: {
            id: { type: 'integer' },
            userId: { type: 'integer' },
            title: { type: 'text' },
            completed: { type: 'boolean' }
          }
        }
      }
    })

    console.log(` * Create index [${INDEX}] response:`, createIndexRes)
  } catch (error) {
    console.error(' **> Error creating index:', error.message)
  }
})()
