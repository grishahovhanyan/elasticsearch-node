const { v4: uuidv4 } = require('uuid')
const { esClient } = require('./client')
const { parseJSON } = require('../utils/object-helpers')
const { NotFoundException } = require('../exceptions')

class ElasticSearchService {
  async createIndex(index, mappingProperties) {
    const existsRes = await esClient.indices.exists({ index })
    if (!existsRes) {
      return await esClient.indices.create({
        index,
        body: {
          mappings: {
            properties: mappingProperties
          }
        }
      })
    }

    return existsRes
  }


  /**
   * @param {string} index 
   * @param {{
   *    perPage: number
   *    page: number
   *    searchText?: string
   *    completed?: boolean
   *    userIds?: string[]
   * }} searchInput 
   */
  async search(index, searchInput) {
    const { page, perPage, searchText, completed, userIds } = searchInput

    const body = {
      query: { bool: { must: [] } }
    }

    if (searchText?.trim()) {
      body.query.bool.must.push({
        wildcard: {
          title: `*${searchText}*`
        }
      })
    }

    if (typeof completed === 'boolean') {
      body.query.bool.must.push({
        term: {
          completed: completed
        }
      })
    }

    if (userIds?.length) {
      body.query.bool.must.push({
        terms: {
          userId: userIds
        }
      })
    }

    const response = await esClient.search({
      index,
      from: (page - 1) * perPage,
      size: perPage,
      body
    })

    const items = response.hits.hits.map(item => item._source)
    const count = response.hits.total.value

    return { items, count }
  }

  async indexDocument(index, document) {
    if (!document.id) {
      document.id = uuidv4()
    }

    try {
      await esClient.index({
        index,
        id: document.id,
        body: document
      })

      return document
    } catch (error) {
      console.error(' **> Error indexing document:', error)
      throw new Error('Something went wrong')
    }
  }

  async getDocument(index, documentId) {
    try {
      const getDocumentRes = await esClient.get({
        index,
        id: documentId
      })

      return getDocumentRes._source
    } catch (error) {
      const message = parseJSON(error.message)

      if (message && message.found === false) {
        throw new NotFoundException()
      }

      console.error(' **> Error getting document:', error)
      throw new Error('Something went wrong')
    }
  }

  async updateDocument(index, documentId, updateInput) {
    try {
      return await esClient.update({
        index,
        id: documentId,
        body: { doc: updateInput }
      })
    } catch (error) {
      const message = parseJSON(error.message)

      if (message && message.found === false) {
        throw new NotFoundException()
      }

      console.error(' **> Error updating document:', error)
      throw new Error('Something went wrong')
    }
  }

  async deleteDocument(index, documentId) {
    try {
      return await esClient.delete({
        index,
        id: documentId
      })
    } catch (error) {
      const message = parseJSON(error.message)

      if (message && message.result === 'not_found') {
        throw new NotFoundException()
      }

      console.error(' **> Error deleting document:', error)
      throw new Error('Something went wrong')
    }
  }
}


module.exports = { ElasticSearchService }
