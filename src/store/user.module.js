import UserService from '../services/user.service';
import UserDetail from '../models/userDetail.js';

const detail = new UserDetail('', '', '', '');

export const user = {
  namespaced: true,
  state: {userDetial: detail},
  actions: {
    editUser({ commit }, formData) {
      return UserService.editUserDetail(formData).then(
        detail => {
          commit('updateUserDetail', detail.data);
          return Promise.resolve(detail);
        },
        error => {
          //commit('loginFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    updateUserDetail(state, detail) {
        state.userDetial.prefix = detail.prefix
        state.userDetial.firstname = detail.firstname
        state.userDetial.lastname = detail.lastname
        state.userDetial.phone = detail.phone
    }
  }
};