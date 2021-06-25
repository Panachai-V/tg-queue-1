import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import UserDetail from '../models/userDetail.js';

const user = JSON.parse(localStorage.getItem('user'));
const userDetail = JSON.parse(localStorage.getItem('userDetail'));
const userCompany = null
const selfUserCompany = null
const initialState = user
  ? { status: { loggedIn: true }, user, userDetail, userCompany, selfUserCompany, loading: false, verifyToken: false}
  : { status: { loggedIn: false }, user: null, userDetail: null , userCompany: null, selfUserCompany: null, loading: false, verifyToken: false};

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
      commit('updateLoadingStatus', true)
      await dispatch('authen', user) // wait for `authen` to finish
      UserService.getUserDetail().then(
        detail => {
          commit('updateDetail', detail)
          commit('updateLoadingStatus', false)
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
    register({ commit }, regisuser) {
      return AuthService.register(regisuser).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          console.log(error.response.data.message)
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    createCompany({ commit }, companyInfo) {
      return AuthService.createCompany(companyInfo).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    editUser({ commit }, formData) {
      commit('updateLoadingStatus', true)
      return UserService.editUserDetail(formData).then(
        detail => {
          commit('updateDetail', detail.data);
          commit('updateLoadingStatus', false)
          return Promise.resolve(detail);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    fetchUser({ commit }) {
      commit('updateLoadingStatus', true)
      UserService.getUserDetail().then(
        detail => {
          commit('updateDetail', detail)
          commit('updateLoadingStatus', false)
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
      commit('updateLoadingStatus', true)
      return new Promise((resolve, reject) => {
        UserService.getUserCompanyDetail()
          .then(response => {
            commit('fetchCompany', response.data);
            commit('updateLoadingStatus', false)
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
    async verifyTokenRegister ({ commit }, token ) {
      await AuthService.verifyEmailRegister(token)
    },
    async requestTokenForResetPWD ({ commit }, email ) {
      return new Promise((resolve, reject) => {        
        AuthService.requestTokenForResetPWD(email).then(
          response => {
            resolve(response)
          },
          error => {
            reject(error.response.status)
          }
        )
      })
    },
    async verifyTokenForResetPWD ({ commit }, token ) {
      return new Promise((resolve, reject) => {        
        AuthService.verifyTokenForResetPWD(token).then(
          response => {
            commit('changStautsVerifyToken', true);
            resolve(response)
          },
          error => {
            reject(error.response.status)
          }
        )
      })
    }
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
    },
    updateLoadingStatus(state, loadingStatus) {
      state.loading = loadingStatus
    },
    changStautsVerifyToken(state, input) {
      state.verifyToken = input
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
    },
    isForwarder(state) {
      return (state.user.role == "freight-forwarder")
    },
    isDriver(state) {
      return (state.user.role == "driver")
    },
    isTgAdmin(state) {
      return (state.user.role == "tg-admin")
    },
    isAdmin(state) {
      return (state.user.role == "tg-admin")
    },
    getLoadingStatus(state) {
      return state.loading
    },
    getStatusVerifyToken(state) {
      return state.verifyToken
    }
  }
};