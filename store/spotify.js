
import { db } from '~/plugins/firebase'

const HOST = process.env.HOST
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const REDIRECT_URI = `${HOST}/spotify/callback`

export const state = () => ({
    status: "",
    // token: localStorage.getItem('spotifyAccessToken') || '',
    token: '',
})

export const getters = {
    isLoggedIn: state => !!state.token,
    token: state => state.token
}

export const actions = {
    async login({ commit, rootGetters }) {
        const width = 600
        const height = 600
        const name = 'Spotify Auth Window'
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
            const uid = rootGetters["auth/uid"]
            db.collection("users").doc(uid).set({
                spotifyAccessToken: accessToken
            })
                .then(() => {
                    console.log("Success");
                })
                .catch(e => {
                    console.error("Error", e);
                })
        })
    },
    getToken({ commit, rootGetters }) {
        const uid = rootGetters["auth/uid"]
        db.collection("users").doc(uid).get()
        .then(doc => {
            if (doc.exists) {
                const data = doc.data()
                console.log(data)
                commit("setToken", data.spotifyAccessToken)
            } else {
                console.log("No such document!");
            }
        }).catch(error => {
            console.log("Error getting document:", error);
        });
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