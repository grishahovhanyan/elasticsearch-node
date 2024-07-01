const { client } = require('./client')
const { INDEX } = require('./constants');

(async function() {
  const documentId = '1'
  const updatedFields = {
    doc: {
      title: 'Updated TODO title',
      completed: true
    }
  }

  try {
    const updateDocumentRes = await client.update({
      index: INDEX,
      id: documentId,
      body: updatedFields
    })

    console.log(` * Update document response:`, updateDocumentRes)
  } catch (error) {
    console.log(` * Document with id [${documentId}] does not exists`)
    console.error(' **> Error updating document:', error.message)
  }
})()
