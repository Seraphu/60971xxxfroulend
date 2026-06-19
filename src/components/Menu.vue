<template>
  <Menubar :model="items" style="position: fixed; margin-top: -80px; width: 100%; z-index: 2000">
    <template #start>
      <a href="/"><img alt="Logo" src="../assets/logo.png" width="30"/></a>
    </template>
  </Menubar>
</template>

<script>
import Menubar from 'primevue/menubar';
import router from "../router";

export default {
  name: "Menu",
  components: { Menubar },
  data() {
    return {
      login: 'administrator',
      password: 'password',
      brand: process.env.VUE_APP_APPNAME,
      items: [
        {
          label: 'Рейтинг',
          icon: 'pi pi-fw pi-chart-line',
          visible: false,
          items: [
            {
              label: 'Все рейтинги',
              icon: 'pi pi-fw pi-list',
              command: () => {
                router.push('/rating')
              }
            },
            {
              label: 'Создать рейтинг',
              icon: 'pi pi-fw pi-plus',
              command: () => {
                this.$store.commit('setCreateRatingDialogVisible', true);
              }
            }
          ]
        },
        {
          label: '',
          icon: 'pi pi-fw pi-user',
          items: [
            {
              label: 'Выход',
              icon: 'pi pi-fw pi-sign-out',
              command: () => {
                this.logout()
              }
            }
          ]
        },
        {
          label: 'Вход',
          visible: true,
          icon: 'pi pi-fw pi-sign-in',
          command: () => {
            router.push('/login')
          }
        }
      ]
    };
  },
  computed: {
    username: function () {
      if (!(this.$store.state.user === null))
        return this.$store.state.user.username
      else
        return '';
    },
    isLoggedIn: function () {
      return this.$store.state.loggedIn
    }
  },
  watch: {
    username: function (username) {
      this.items[1].label = username;
    },
    isLoggedIn: function (isLoggedIn) {
      if (isLoggedIn) {
        this.items[0].visible = true
        this.items[1].visible = false
        this.items[2].visible = true
      } else {
        this.items[0].visible = false
        this.items[1].visible = true
        this.items[2].visible = false
      }
    }
  },
  methods: {
    logout() {
      this.$store.commit('logout')
    }
  }
}
</script>