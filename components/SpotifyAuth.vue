<template lang="pug">
  v-layout(column, justify-center, align-center)
    v-flex(xs12, sm8, md6)
      v-btn(@click="login") Login Spotify
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";


export default {
  middleware: ['authenticated'],
  methods: {
    ...mapActions("spotify", [
        "login"
    ]),
  }
}
</script>