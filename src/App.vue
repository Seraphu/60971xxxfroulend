<template>
  <div id="app">
    <div v-if="!this.$store.state.preLoading">
      <router-view></router-view>
    </div>
    <div v-else>
      Загрузка...
    </div>
  </div>
</template>

<script>
import store from "./state";
import router from "./router";

export default {
  computed: {
    user(){
      return this.$store.state.user;
    },
  },
  watch: {
    user(newValue) {
      // Только если user появился (не null и не undefined)
      if (newValue && newValue.id) {
        router.push('/');
      }
    }
  },
  mounted() {
    const token = localStorage.getItem('token');
    if(token){
      store.commit('setToken', token);
      this.$store.dispatch('getUser')
    }
  }
};
</script>