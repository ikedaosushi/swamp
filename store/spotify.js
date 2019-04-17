
const HOST = process.env.HOST
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const REDIRECT_URI = `${HOST}/spotify/callback`

export const state = () => ({
    status: "",
    token: localStorage.getItem('spotifyAccessToken') || '',
})

export const getters = {
    isLoggedIn: state => !!state.token,
    token: state => state.token
}

export const actions = {
    async login({ commit }) {
        const width = 600
        const height = 600
        const name = 'Spotify Window'
        const scopes = ['user-top-read']
        const scope = scopes.join(' ')
        const response_type = 'code'
        const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${response_type}&scope=${scope}`

        const left = (screen.availWidth - width) / 2
        const right = (screen.availHeight - height) / 2
        const features = `width=${width},height=${height},left=${left},right=${right}`
        const spotifyLoginWindow = window.open(url, name, features)
        spotifyLoginWindow.addEventListener('beforeunload', () => {
            const accessToken = localStorage.getItem('spotifyAccessToken')
            commit("setToken", accessToken)
        })
    },
    logout({ commit }) {
        commit("removetoken")
    }
}

export const mutations = {
    setToken(state, token) {
        state.token = token
    },
    removetoken(state, token) {
        state.token = ''
        localStorage.removeItem('spotifyAccessToken')
    }
}