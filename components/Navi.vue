<template lang="pug">
  v-toolbar
    v-toolbar-title(v-text='title')
    v-spacer
    v-toolbar-items.hidden-sm-and-down
      v-btn(flat='') {{username}}
      v-btn(flat='' v-if="isLoggedIn" @click="logout") Logout
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      title: 'Swamp'
    }
  },
  computed: {
    ...mapState("auth", [
      "username"
    ]),
    ...mapGetters("auth", [
      "isLoggedIn"
    ])
  },
  methods: {
    ...mapActions("auth", ["logout"])
  }
}
</script>
