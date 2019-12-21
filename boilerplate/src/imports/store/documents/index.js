export default {
  namespaced: true,

  supply: {
    use: ['Documents'],
    inject: ({ Documents }) => ({
      getters: {
        'all-documents': () => Documents.documents
      }
    })
  },

  getters: {
    count: (state, getters) => getters['all-documents'].length
  }
}
