const { client } = require('./client')
const { INDEX } = require('./constants');

(async function() {
  const documentId = 'todo_id'

  try {
    const getDocumentRes = await client.get({
      index: INDEX,
      id: documentId
    })

    console.log(` * Get document response:`, getDocumentRes)
  } catch (error) {
    console.log(` * Document with id [${documentId}] does not exists`)
    console.error(' **> Error getting document:', error.message)
  }
})()
