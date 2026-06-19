import {createStore} from "vuex";
import router from "./router";

const backendUrl = process.env.VUE_APP_BACKEND_URL;
const client_id = process.env.VUE_APP_CLIENT_ID;
const client_secret = process.env.VUE_APP_CLIENT_SECRET;

const store = createStore({
  state: {
    user: null,
    token: null,
    preLoading: false,
    dataPreLoading: true,
    loginError: false,
    loggedIn: false,
    rating: [],
    pager: {
      currentPage: 1,
      perPage: 5,
    },
    validation: {},
    createRatingDialogVisible: false,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    getToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    setPreloading(state, is_load) {
      state.preLoading = is_load;
    },
    setDataPreloading(state, is_load) {
      state.dataPreLoading = is_load;
    },
    setLoginError(state, isError) {
      state.loginError = isError;
    },
    setLoggedIn(state, isLoggedIn) {
      state.loggedIn = isLoggedIn;
    },
    setRating(state, rating) {
      state.rating = rating;
    },
    setPage(state, page) {
      state.pager.currentPage = page;
    },
    setPager(state, pager) {
      state.pager = pager;
    },
    setPerPage(state, rows) {
      state.pager.perPage = rows;
    },
    setValidation(state, validation) {
      state.validation = validation;
    },
    setCreateRatingDialogVisible(state, visible) {
      state.createRatingDialogVisible = visible;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.loggedIn = false;
      state.rating = [];
      localStorage.removeItem('token');
      router.push('/');
    },
  },
  actions: {
    auth(context, {login, password}) {
      context.commit('setPreloading', true);
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
          localStorage.setItem('token', response.data.access_token);
          context.commit('setLoggedIn', true);
          context.commit('setLoginError', false);
          context.dispatch('getUser');
        } else {
          context.commit('setLoginError', true);
          context.commit('setPreloading', false);
        }
      });
    },
    getUser(context) {
      console.log('get user');
      return window.axios.get(backendUrl + '/OAuthController/user', {
        headers: {
          'Authorization': 'Bearer ' + context.state.token
        }
      }).then((response) => {
        if (response.data.id) {
          context.commit('setUser', response.data);
          context.commit('setLoggedIn', true);
          context.commit('setPreloading', false);
          router.push('/');
        } else {
          context.commit('setLoggedIn', false);
          context.commit('setUser', null);
        }
      }).catch(error => {
        if (error.response) {
          context.commit('setLoggedIn', false);
          context.commit('setUser', null);
        }
        console.log('Ошибка сервера');
      });
    },
    getRating(context) {
      console.log('get rating');
      context.commit('setDataPreloading', true);
      const params = new URLSearchParams();
      params.append('per_page', context.state.pager.perPage);
      console.log('currentPage=' + context.state.pager.currentPage);
      console.log('pageCount=' + context.state.pager.pageCount);
      return window.axios.post(backendUrl + '/RatingApi/rating?page_group1=' + context.state.pager.currentPage, params, {
        headers: {
          'Authorization': 'Bearer ' + context.state.token
        }
      }).then((response) => {
        context.commit('setRating', response.data.ratings);
        context.commit('setPager', response.data.pager);
        context.commit('setDataPreloading', false);
        console.log(response.data.ratings);
        console.log(response.data.pager);
      });
    },
    createRating(context, {name, description, birthday, gender}) {
      console.log('create rating');
      context.commit('setDataPreloading', true);
      const params = new URLSearchParams();
      params.append('name', name);
      params.append('description', description);
      params.append('birthday', birthday);
      params.append('gender', gender);
      return window.axios.post(backendUrl + '/RatingApi/store', params, {
        headers: {
          'Authorization': 'Bearer ' + context.state.token
        }
      }).then((response) => {
        if (response.status === 201) {
          console.log('Rating created successfully');
          context.commit('setValidation', {});
          context.commit('setCreateRatingDialogVisible', false);
          context.commit('setPage', context.state.pager.pageCount);
          context.dispatch('getRating');
          router.push('/rating');
        } else {
          console.log(response.data);
          context.commit('setValidation', response.data);
        }
      });
    },
    deleteRating(context, id) {
      console.log('delete rating');
      context.commit('setDataPreloading', true);
      return window.axios.get(backendUrl + '/RatingApi/delete/' + id, {
        headers: {
          'Authorization': 'Bearer ' + context.state.token
        }
      }).then((response) => {
        if (response.status === 200) {
          console.log('Rating deleted successfully');
          context.commit('setPage', context.state.pager.pageCount);
          context.dispatch('getRating');
          router.push('/rating');
        } else {
          console.log(response.data);
        }
      });
    }
  }
});

export default store;