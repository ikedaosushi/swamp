import axios from 'axios'

export const state = () => ({
    status: "",
    artists: []
})

export const getters = {
    isLoggedIn: state => !!state.user
}

export const actions = {
    fetch({ commit, dispatch, rootGetters }) {
        const url = 'https://api.spotify.com/v1/me/top/artists'
        axios({
            url: url,
            headers: { 'Authorization': `Bearer ${rootGetters["spotify/token"]}` }
        }).then(
            resp => commit("gotArtist", resp.data.items)
        ).catch(err => {
            dispatch('spotify/logout', null, { root: true })
        })
    }
}

export const mutations = {
    gotArtist(state, artists) {
        state.artists = artists
    }
}