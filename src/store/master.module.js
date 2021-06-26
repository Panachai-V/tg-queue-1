import MasterService from '../services/master.service';

export const master = {
  namespaced: true,
  state: {
      province: []
  },
  actions: {
    province({ commit }) {
        console.log('getting province')
      return MasterService.province().then(
        province => {
            commit('fetchProvince', province.data)
            return Promise.resolve(province);
        },
        error => {
            return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
      fetchProvince(state, input) {
            input.forEach(province => {
                state.province.push({
                    value: province.PROVINCE_NAME, 
                    text: province.PROVINCE_NAME
                })
            });
        },
    },
    getters: {
      getProvince(state) {
        return state.province
      },
    }
};