<template lang="pug">
  #firebaseui-auth-container
</template>

<script>
import { mapActions } from "vuex";
import { auth, authProviders } from '~/plugins/firebase'
import firebaseui from 'firebaseui'

export default {
  name: 'Login',
  methods: {
    ...mapActions("auth", [
      "gotUser"
    ])
  },
  mounted() {
    auth.onAuthStateChanged(user => {
      if (!user) {
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)

        const config = {
          signInOptions: [
            authProviders.Email,
            authProviders.Google,
            authProviders.Facebook,
          ],
          callbacks: {
            signInSuccessWithAuthResult: (authResult) => {
              window.location.href = "/"
              return false
            }
          },
          signInSuccessUrl: '/',
          signInFlow: 'popup',
          // tosUrl: '/tos',
          // privacyPolicyUrl: '/privacy-policy',
        }

        ui.start('#firebaseui-auth-container', config)
      }
    })
  }
}
</script>
