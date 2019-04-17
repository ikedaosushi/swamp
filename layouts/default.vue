<template lang="pug">
  v-app
    navi
    v-content
      v-container
        nuxt
</template>

<style src="~/node_modules/firebaseui/dist/firebaseui.css"></style>

<script>
import Navi from '~/components/Navi.vue'

const CLIENT_ID = "6b284830006843e7ae7b170725715aed"
const REDIRECT_URI = "/"

export default {
  components: {
    Navi
  }
}

</script>
