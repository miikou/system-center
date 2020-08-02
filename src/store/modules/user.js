const user = {
    namespaced: true,
    state: {
        userType: ""
    },
  
    mutations: {
        mutationsUserType(state, data){
            state.userType = data
        }
    },
    actions: {
        actionsUserType({commit}, data){
            commit('mutationsUserType',data)
        }
    }
  }
  export default user