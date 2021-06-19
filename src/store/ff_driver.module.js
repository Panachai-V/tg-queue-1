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
          province: null,
          address: null,
          zipcode: null,
          status: null
      },
      selfDriver: {
        avatar: '',
        username: '',
        prefix: '',
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        province: '',
        address: '',
        zipcode: '',
        status: '',
        password: '',
        confPassword: ''
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
          },
          editDriver({ state , commit }, id) {           
            var formData = new FormData();
            if (state.selfDriver.avatar) {
                formData.append("avatar", state.selfDriver.avatar);
            }
            formData.append("password", state.selfDriver.password);
            formData.append("status", state.selfDriver.status);
            formData.append("prefix", state.selfDriver.prefix);
            formData.append("firstname", state.selfDriver.firstname);
            formData.append("lastname", state.selfDriver.lastname);
            formData.append("phone", state.selfDriver.phone);
            formData.append("address", state.selfDriver.address);
            formData.append("province", state.selfDriver.province);
            formData.append("zipcode", state.selfDriver.zipcode);
            console.log('module id: ', id)
            console.log('module fomrdata: ', formData)
            return CompanyService.ffDriverEdit(id, formData).then(
                respond => {
                    return Promise.resolve(respond);
                },
                error => {
                    return Promise.reject(error);
                }
              );
          },
          deleteDriver({ commit }, id) {
              console.log('deleting')
            return CompanyService.ffDriverDelete(id).then(
                respond => {
                    return Promise.resolve(detail);
                },
                error => {
                    return Promise.reject(error);
                }
              );
          },
          createDriver({ state , commit }, formData) {
            var formData = new FormData();
            if (state.selfDriver.avatar) {
                formData.append("avatar", state.selfDriver.avatar);
            }
            formData.append("username", state.selfDriver.username);
            formData.append("email", state.selfDriver.email);
            formData.append("password", state.selfDriver.password);
            formData.append("status", state.selfDriver.status);
            formData.append("prefix", state.selfDriver.prefix);
            formData.append("firstname", state.selfDriver.firstname);
            formData.append("lastname", state.selfDriver.lastname);
            formData.append("phone", state.selfDriver.phone);
            formData.append("address", state.selfDriver.address);
            formData.append("province", state.selfDriver.province);
            formData.append("zipcode", state.selfDriver.zipcode);
            return CompanyService.ffDriverCreate(formData).then(
                respond => {
                    return Promise.resolve(detail);
                },
                error => {
                    return Promise.reject(error);
                }
              );
          }
    },
    mutations: {
        fetchOverview(state, allDriver) {
            console.log('allDriver',allDriver)
            allDriver.forEach(driver => 
                {if (driver.avatar[0]) {
                    state.overview.push({
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
                        },
                        id: driver._id
                    })
                }}
            );
        },
        fetchDriver(state, driver) {
            console.log('driver is ',driver)
            state.currentDriver.avatar = driver.avatar[0].value
            state.currentDriver.username = driver.username
            state.currentDriver.prefix = driver.user_detail[0].prefix
            state.currentDriver.firstname = driver.user_detail[0].firstname
            state.currentDriver.lastname = driver.user_detail[0].lastname
            state.currentDriver.phone = driver.user_detail[0].phone
            state.currentDriver.email = driver.email
            state.currentDriver.province = driver.user_detail[0].province
            state.currentDriver.address = driver.user_detail[0].address
            state.currentDriver.zipcode = driver.user_detail[0].zipcode
            state.currentDriver.status = driver.status
            console.log('driver is ',state.currentDriver)
            state.selfDriver = {...state.currentDriver}
            state.selfDriver.avatar = ''
            state.selfDriver.password = '',
            state.selfDriver.confPassword = ''
        },
        change_status_loading(state, input) {
            state.loading = input
        }
    },
    getters: {
        getOverview(state) {
            return state.overview
        },
        getDriverList(state) {
            var driverList = []
            state.overview.forEach(driver => driverList.push({
                value: driver.id, 
                text: driver.prefix.text + driver.firstname.text + ' ' + driver.lastname.text
            }))
            console.log('driver list: ', driverList)
            return driverList
        },
        getDetail(state) {
            return state.currentDriver
        },
        getSelfDriver(state) {
            return state.selfDriver
        },
        get_status(state) {
            return state.loading
        }
    }
}