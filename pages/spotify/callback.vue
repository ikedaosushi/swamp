<template lang="pug">
    div Success
</template>


<script>
import axios from 'axios'
import { setTimeout } from 'timers'

const HOST = process.env.HOST
const ACCOUNT_SPOTIFY_BASE = process.env.ACCOUNT_SPOTIFY_BASE
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = `${HOST}/spotify/callback`

export default {
  created() {
    const code = this.$nuxt.$route.query.code
    const basic = new Buffer(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
    const headers = {
      Authorization: `Basic ${basic}`
    }
    const params = {
      code: code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    }
    const url = 'https://us-central1-swamp-ab541.cloudfunctions.net/api/spotify/api/token'
    // const url = ACCOUNT_SPOTIFY_BASE + '/api/token'
    axios({
      method: 'GET',
      url: url,
      params: params,
      headers: headers
    }).then(resp => {
      const accessToken = resp.data.access_token
      const refreshToken = resp.data.refresh_token
      localStorage.setItem('spotifyAccessToken', accessToken)
      localStorage.setItem('spotifyRefreshToken', refreshToken)
      window.close()
    })
  }
}
</script>
