<template>
  <div id="app">
    <Menu />
    <div v-if="$store.state.preLoading" class="loader">
      <h3>Загрузка...</h3>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import store from "./state";
import Menu from "./components/Menu";

export default {
  components: { Menu },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      store.commit('setToken', token);
      store.commit('setLoggedIn', true);
      this.$store.dispatch('getUser');
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
.loader {
  text-align: center;
  margin-top: 50px;
}
</style>