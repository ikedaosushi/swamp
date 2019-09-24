<template lang="pug">
  div
    spotify-auth(v-if="!isLoggedIn")
    v-layout(column, justify-center, align-center v-if="!hasArtist")
      v-flex(xs12, sm8, md6)
        v-btn(@click="fetch") Reload Artist
    v-data-table(
        :headers="headers"
        :items="artists"
        no-data-text="読み込み中..."
        class="elevation-1"
        rows-per-page-text="表示件数"
        :rows-per-page-items="[50, 100]"
    )
      template(v-slot:items="props")
          td
            v-img(width=100 :src="props.item.images[2].url")
          td.text-md-center.body-1 {{ props.item.name }}
          td.text-md-center.body-1.text-capitalize {{ props.item.popularity }}
          td.text-md-center.body-1.text-capitalize {{ props.item.genres.join(" / ") }}
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import SpotifyAuth from '@/components/SpotifyAuth'

export default {
  data() {
    return  {
      headers: [
        { text: "image", value: "image" },
        { text: "name", value: "name" },
        { text: "お気に入り度", value: "popularity" },
        { text: "ジャンル", value: "genres", sortable: false }
      ],
      rawArtists: []
    }
  },
  created() {
    // this.fetch()
    this.$store.subscribe((mutation, state) => {
      switch(mutation.type) {
        case "auth/setUser":
          console.log("got user")
          this.getToken()
          break
        case "spotify/setToken":
          console.log("got token")
          this.fetch()
          break
      }
    })
  },
  components: {
    SpotifyAuth
  },
  computed: {
    ...mapState('spotify', ['token']),
    ...mapState('artist', ['artists']),
    ...mapGetters('spotify', ['isLoggedIn']),
    ...mapGetters('artist', ['hasArtist']),
  },
  methods: {
    ...mapActions("artist", ["fetch"]),
    ...mapActions("spotify", ["getToken"])
  }
}
</script>
