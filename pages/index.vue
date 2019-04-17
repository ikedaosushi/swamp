<template lang="pug">
  div
    spotify-auth(v-if="!isLoggedIn")
    v-layout(column, justify-center, align-center)
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
          td.text-xs-center
            img(:src="props.item.images[2].url" height="100px")
          td.text-xs-right {{ props.item.name }}
          td.text-xs-right {{ props.item.popularity }}
          td.text-xs-right {{ props.item.genres }}
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
    this.fetch()
  },
  components: {
    SpotifyAuth
  },
  computed: {
    ...mapState('spotify', ['token']),
    ...mapState('artist', ['artists']),
    ...mapGetters('spotify', ['isLoggedIn']),
  },
  methods: {
    ...mapActions("artist", ["fetch"])
  }
}
</script>
