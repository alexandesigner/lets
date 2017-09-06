export default {
  namespaced: true,

  supply: {
    use: ['Documents'],
    inject: ({ Documents }) => ({
      getters: {
        'all-documents': () => Documents.events,
      },
    }),
  },

  getters: {
    'count': (state, getters) => getters['all-documents'].length,
  },
}
