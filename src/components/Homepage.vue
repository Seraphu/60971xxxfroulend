<template>
  <div v-if="$store.state.user">
    Привет, {{ $store.state.user.username }}!!!
    <button @click="logout">Выйти</button>
  </div>
</template>

<script>
import '../state.js'

export default {
  name: "HomePage",
  created() {
    if( !this.$store.state.user || !this.$store.state.user.id){
      this.$router.push('/signin');
    }
  },
  methods: {
    logout(){
      this.$store.commit('logout')
    }
  }
}
</script>

<style scoped>
</style>
