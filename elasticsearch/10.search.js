const { client } = require('./client')
const { INDEX } = require('./constants');

(async function() {
  try {
    const searchRes = await client.search({
      index: INDEX,
      size: 300,
      body: {
        query: {
          bool: {
            must: [
              {
                wildcard: {
                  title: `*n*`
                }
              },
              {
                term: {
                  completed: true
                }
              },
              {
                terms: {
                  userId: [1, 2]
                }
              }
            ]
          }
        }
      }
    })

    console.log(` * Search response:`, searchRes.hits.hits)
    console.log(` * Search total:`, searchRes.hits.total)
  } catch (error) {
    console.error(' **> Error searching documents:', error.message)
  }
})()
