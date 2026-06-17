import { createStore } from "vuex";

const backendUrl = process.env.VUE_APP_BACKEND_URL;
const client_id = process.env.VUE_APP_CLIENT_ID;
const client_secret = process.env.VUE_APP_CLIENT_SECRET;

const store = createStore({
  state() {
    return {
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
      token: localStorage.getItem('token') || null,
      preLoading: false,
      errorPassword: false,
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    setPreloading(state, is_load) {
      state.preLoading = is_load;
    },
    setErrorPassword(state, isError) {
      state.errorPassword = isError;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  actions: {
    auth(context, { login, password }) {
      context.commit('setErrorPassword', false)
      window.axios.post(backendUrl + '/OAuthController/Authorize', {
        username: login,
        password: password,
        grant_type: 'password'
      }, {
        headers: {
          'Authorization': 'Basic ' + window.btoa(client_id + ':' + client_secret)
        }
      }).then((response) => {
        if (response.data.access_token) {
          context.commit('setToken', response.data.access_token);
          context.dispatch('getUser')
        } else {
          context.commit('setErrorPassword', true)
        }
      })
    },
    getUser(context) {
      context.commit('setPreloading', true);
      console.log('get user')
      return window.axios.get(backendUrl + '/OAuthController/user', {
        headers: {
          'Authorization': 'Bearer ' + context.state.token
        }
      }).then((response) => {
        context.commit('setUser', response.data);
        context.commit('setPreloading', false);
        // УБРАЛ router.push('/') — перенесу в App.vue
      })
    }
  }
})

console.log('✅ Store created!');
export default store;