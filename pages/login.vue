<template lang="pug">
  firebase-auth
</template>

<script>
import FirebaseAuth from '@/components/FirebaseAuth';
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: 'Login',
  components: {
    FirebaseAuth
  }
}
</script>