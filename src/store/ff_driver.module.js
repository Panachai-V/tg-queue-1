import CompanyService from '../services/company.service';

export const ff_driver = {
    namespaced: true,
    state: {
      overview: [],
      currentDriver: {
          avatar: null,
          username: null,
          prefix: null,
          firstname: null,
          lastname: null,
          phone: null,
          email: null,
          status: null
      },
      loading: false
    },
    actions: {
        overview({ commit }) {
            commit('change_status_loading', true);
            return CompanyService.driverOverview().then(
                allDriver => {
                    commit('fetchOverview', allDriver.data);
                    commit('change_status_loading', false);
                    return Promise.resolve(allDriver);
                },
                error => {
                  console.log(error)
                  return Promise.reject(error);
                }
              );
          },
          driverDetail({ commit }, id) {
            commit('change_status_loading', true);
            return CompanyService.ffDriverDetail(id).then(
                driver => {
                    commit('fetchDriver', driver.data);
                    commit('change_status_loading', false);
                    return Promise.resolve(driver);
                },
                error => {
                  console.log(error)
                  return Promise.reject(error);
                }
              );
          }
    },
    mutations: {
        fetchOverview(state, allDriver) {
            console.log('allDriver',allDriver)
            allDriver.forEach(driver => state.overview.push({
                avatar: { type: 'avatar', text: 'data:image/png;base64,' + driver.avatar[0].value },
                username: { text: driver.username },
                prefix: { text: driver.user_detail[0].prefix },
                firstname: { text: driver.user_detail[0].firstname },
                lastname: { text: driver.user_detail[0].lastname },
                phone: { text: driver.user_detail[0].phone },
                email: { text: driver.email },
                status: driver.status ? 
                    { type: 'tag', value: 1, text: 'เปิดใช้งาน', classer: 'ss-tag-success' } :
                    { type: 'tag', value: 0, text: 'ปิดใช้งาน', classer: 'ss-tag-danger' },
                options: {
                  type: 'options',
                  view: { type: 'link', href: '/forwarder/driver-view/'+ driver._id },
                  edit: { type: 'link', href: '/forwarder/driver-edit/'+ driver._id }
                }
            }));
        },
        fetchDriver(state, driver) {
            state.currentDriver.avatar = driver.avatar[0].value
            state.currentDriver.username = driver.username
            state.currentDriver.prefix = driver.user_detail[0].prefix
            state.currentDriver.firstname = driver.user_detail[0].firstname
            state.currentDriver.lastname = driver.user_detail[0].lastname
            state.currentDriver.phone = driver.user_detail[0].phone
            state.currentDriver.email = driver.email
            state.currentDriver.status = driver.status
            console.log('driver is ',state.currentDriver)
        },
        change_status_loading(state, input) {
            state.loading = input
        }
    },
    getters: {
        getOverview(state) {
            return state.overview
        },
        getDetail(state) {
            return state.currentDriver
        },
        get_status(state) {
            return state.loading
        }
    }
}