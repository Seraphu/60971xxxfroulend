<template>
  <div>
    Введите логин и пароль:
    <div style="padding: 10px; background: red;" v-if="this.$store.state.errorPassword">
      Неправильный логин или пароль
    </div>
    <input style="display: block" placeholder="Login" v-model="login">
    <input style="display: block" placeholder="Password" type="password" v-model="password">
    <button style="display: block" @click="signIn">Войти</button>
  </div>
</template>

<script>
import '../state.js'

export default {
  name: "SignIn",
  data(){
    return {
      login: 'administrator',
      password: 'password',
    }
  },
  methods: {
    signIn(){
      this.$store.dispatch('auth', {login: this.login, password: this.password});
    }
  }
}
</script>

<style scoped>
</style>
