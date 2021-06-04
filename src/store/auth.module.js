import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const userDetail = JSON.parse(localStorage.getItem('userDetail'));
const initialState = user
  ? { status: { loggedIn: true }, user ,userDetail}
  : { status: { loggedIn: false }, user: null , userDetail : null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
      state.userDetail = userDetail;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
      state.userDetail = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
      state.userDetail = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};