import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import UserDetail from '../models/userDetail.js';

const user = JSON.parse(localStorage.getItem('user'));
const userDetail = JSON.parse(localStorage.getItem('userDetail'));
const userCompany = null
const selfUserCompany = null
const initialState = user
  ? { status: { loggedIn: true }, user, userDetail, userCompany, selfUserCompany}
  : { status: { loggedIn: false }, user: null, userDetail: null , userCompany: null, selfUserCompany: null};

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async authen ({ commit }, user) {
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
    async login ({ dispatch, commit }, user) {
      await dispatch('authen', user) // wait for `authen` to finish
      UserService.getUserDetail().then(
        detail => {
          commit('updateDetail', detail)
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      )         
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
    },
    editUser({ commit }, formData) {
      return UserService.editUserDetail(formData).then(
        detail => {
          commit('updateDetail', detail.data);
          return Promise.resolve(detail);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    fetchUser({ commit }) {
      UserService.getUserDetail().then(
        detail => {
          commit('updateDetail', detail)
          return Promise.resolve(detail)
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      )  
    },
    changePWD({commit}, newPWD) {
      return new Promise((resolve, reject) => {
        UserService.changePWD(newPWD)
          .then(response => {
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      });
    },
    getCompany({commit}) {
      return new Promise((resolve, reject) => {
        UserService.getUserCompanyDetail()
          .then(response => {
            commit('fetchCompany', response.data);
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      });
    },
    async editCompany ({ dispatch, commit, state }) {
      await UserService.editUserCompanyDetail(state.selfUserCompany).then(  // wait for `editUserCompanyDetail` to finish 
        response => {                  
          return Promise.resolve();
        },
        error => {
          return Promise.reject(error);
        }
      );      
      await dispatch('getCompany')
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
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
    },
    updateDetail(state, detail) {
      state.userDetail = detail;
    },
    fetchCompany(state, company) {
      state.userCompany = company;
      state.selfUserCompany = company;
    }
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getUserDetail(state) {
      return state.userDetail
    },
    getUserCompany(state) {
      return state.userCompany
    },
    getSelfUserCompany(state) {
      return state.selfUserCompany
    },
    isAuthenticated(state) {
      return state.status.loggedIn
    }
  }
};