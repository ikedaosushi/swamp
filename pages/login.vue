<template>
  <div class="login">
    <no-ssr>
      <firebase-auth />
    </no-ssr>
  </div>
</template>

<script>
import FirebaseAuth from '@/components/FirebaseAuth';
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: 'Login',
  created() {
  },
  computed: {
    ...mapGetters("auth", [
      "isLoggedIn"
    ])
  },
  components: {
    FirebaseAuth
  }
}
</script>