const { client } = require('./client')
const { INDEX } = require('./constants');

(async function() {
  const document = {
    id: 1,
    userId: 1,
    title: 'Sample TODO',
    completed: false
  }

  try {
    const indexDocumentRes = await client.index({
      index: INDEX,
      id: document.id,
      body: document
    })

    console.log(` * Index document response:`, indexDocumentRes)
  } catch (error) {
    console.error(' **> Error indexing document:', error)
  }
})()
