const INDEXES = {
  todos: {
    name: 'todos',
    mappingProperties: {
      id: { type: 'text' },
      userId: { type: 'text' },
      title: { type: 'text' },
      completed: { type: 'boolean' }
    }
  }
}

module.exports = { INDEXES }
