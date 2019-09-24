import axios from 'axios'
import { auth, db } from '~/plugins/firebase'
import { API_HOST } from '~/plugins/env'

export const state = () => ({
    status: "",
    artists: []
})

export const getters = {
    isLoggedIn: state => !!state.user,
    hasArtist: state => state.artists.length > 0
}

export const actions = {
    fetch({ commit, dispatch, rootGetters }) {
        const url = API_HOST + "/api/spotify?path=/v1/me/top/artists"
        const headers = {
            'Authorization': `Bearer ${rootGetters["spotify/token"]}`
        }
        axios({
            method: "GET",
            url: url,
            headers: headers
        }).then(resp => {
            return new Promise(function (resolve, reject) {
                const artists = resp.data.items
                commit("gotArtist", artists)
                resolve(artists)
            });
        }).catch(e => {
            dispatch('spotify/logout', null, { root: true })
        }).then(artists => {
            console.log(artists)
            const uid = rootGetters["auth/uid"]
            db.collection("users").doc(uid).set({
                artists: artists
            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch(e => {
                console.error("Error writing document: ", e);
            });
        })
    }
}

export const mutations = {
    gotArtist(state, artists) {
        state.artists = artists
    }
}