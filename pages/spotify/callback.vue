<template lang="pug">
    div Success
</template>


<script>
import axios from 'axios'

const HOST = process.env.HOST
const ACCOUNT_SPOTIFY_BASE = process.env.ACCOUNT_SPOTIFY_BASE
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = `${HOST}/spotify/callback`

export default {
  created() {
    const code = this.$nuxt.$route.query.code
    let params = new URLSearchParams()
    params.append('code', code)
    params.append('redirect_uri', REDIRECT_URI)
    params.append('grant_type', 'authorization_code')
    let options = {
      headers: {
        withCredentials: true,
        Authorization: 'Basic ' + new Buffer(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
      }
    }

    const url = ACCOUNT_SPOTIFY_BASE + '/api/token'
    axios.post(url, params, options).then(resp => {
      const accessToken = resp.data.access_token
      const refreshToken = resp.data.refresh_token
      localStorage.setItem('spotifyAccessToken', accessToken)
      localStorage.setItem('spotifyRefreshToken', refreshToken)
      window.close()
    })
  }
}
</script>
