import { auth } from '~/plugins/firebase'

export const state = () => ({
    status: "",
    token: localStorage.getItem('token') || '',
    username: "",
    uid: ""
})

export const getters = {
    isLoggedIn: state =>  state.status === "loggedIn",
    uid: state => state.uid
}

export const actions = {
    gotUser({ commit }, user) {
        commit("setUser", user)
    },
    logout({ commit }) {
        auth.signOut().then(() => {
            commit("logout")
        })
    }
}

export const mutations = {
    setUser(state, user) {
        state.status = "loggedIn"
        state.username = user.displayName
        state.uid = user.uid
    },
    logout(state) {
        state.status = "loggedOut"
        state.username = ""
    }
}