import RequestService from '../services/request.service';

export const requests = {
  namespaced: true,
  actions: {
    add({ commit }, request) {
      return RequestService.add(request).then(
        user => {
          return Promise.resolve(request);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  }
};