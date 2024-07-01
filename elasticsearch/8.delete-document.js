const { client } = require('./client')
const { INDEX } = require('./constants');

(async function() {
  const documentId = 'todo_id'

  try {
    const deleteDocumentRes = await client.delete({
      index: INDEX,
      id: documentId
    })

    console.log(` * Delete document response:`, deleteDocumentRes)
  } catch (error) {
    console.log(` * Document with id [${documentId}] does not exists`)
    console.error(' **> Error deleting document:', error.message)
  }
})()
