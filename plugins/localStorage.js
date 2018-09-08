import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
      key: 'localstorages',
      paths: []
  })(store)
}

