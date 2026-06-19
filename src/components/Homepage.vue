<template>
  <h1>Домашняя страница</h1>
</template>

<script>
export default {
  name: 'Homepage',
  mounted() {
    this.$store.commit('setLoginError', false)
  }
}
</script>

<style scoped>
</style>