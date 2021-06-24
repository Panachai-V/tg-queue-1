import AdminService from '../services/admin.service';
import CompanyService from '../services/company.service';
import Overview from '../models/company-info';
import {StatusCompany, FilterStatus, ConditionSelectViewJob} from '../models/select-company';
import moment from 'moment';

let temp_overview = new Overview(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
let temp_filterstatus = new FilterStatus(false, false, 10, 1, 1, 1, null, 1, 1, 1)
let temp_condition = new ConditionSelectViewJob('1', '10', 'company_name', 'ascending', '0', '')
let temp2_condition = new ConditionSelectViewJob('1', '10', 'company_name', 'ascending', 'all', '')

export const admin = {
    namespaced: true,
    state: {
      loading: false,
      filterStatus: temp_filterstatus,
      overview: temp_overview,
      detailJob: null,
      forwarders: [],
      forwardersDetail: null,
      forwardersFF: [],
      forwardersDriver: [],
      forwardersCurrentUser: null,
      forwardersEditUser: null,
      condition: temp2_condition
    },
    actions: {
      async forwardersOverview({ commit , state }) {
        console.log('forwardersOverview: ', state.condition)
        await commit('change_status_loading', true);
        await AdminService.freightForwarders(state.condition).then(
          companys => {
            console.log('freightForwarders: ', companys.data)
            var tempFF = []
            companys.data.docs.forEach(company => {
              tempFF.push({
                company_name: { text: company.company_name },
                province: { text: company.company_detail[0].company_province },
                zipcode: { text: company.company_detail[0].company_postal },
                totalDrivers: { text: `${company.driver_count} คน` },
                job_count: { text: `${company.job_count} งาน` },
                status: company.status ? 
                  { type: 'tag', value: 1, text: 'เปิดใช้งาน', classer: 'ss-tag-success' } :
                  { type: 'tag', value: 0, text: 'ปิดใช้งาน', classer: 'ss-tag-danger' },
                options: {
                  type: 'options',
                  view: { type: 'link', href: `/admin/forwarder-view/${company._id}` },
                  edit: { type: 'link', href: `/admin/forwarder-edit/${company._id}` }
                }
              })
            });            
            commit('fetchFreightForwarders', tempFF)
            commit('fetchFilterStatus', companys.data)            
          },
          error => {
            console.log('getForwarders error')
          }
        )
        await commit('change_status_loading', false)
      },
      async freightForwardersDetail({ commit }, company_id) {
        await commit('change_status_loading', true);
        await AdminService.freightForwardersDetail(company_id).then(
          company => {
            console.log('freightForwardersDetail',company.data)
            commit('fetchFreightForwardersDetail', company.data)
            commit('fetchFreightForwardersUser', company.data.user_detail)      
          },
          error => {
            console.log('getForwarder detail error')
          }          
        )
        await commit('change_status_loading', false);
      },
      freightForwardersSelectUser({ commit }, condition) {
        commit('fetchFreightForwardersCurrentUser', condition);
      },
      async fetchOverview({ commit }) {
        await commit('change_status_loading', true);
        await AdminService.fetchOverview().then(
          companys => {
            // console.log(companys)
            commit('fetchDashboardOverview', companys);
          }
        )
        await commit('change_status_loading', false);
      },
      async fetchAllJob({ commit, state }, condition) {
        await commit('change_status_loading', true);
        await AdminService.fetchAllJob(condition).then(
          companys => {
            var temp_array = []

            commit('clear_job_requests')

            for(let i = 0; i < companys.data.docs.length; i++){
                console.log('companys.data.docs :', companys.data.docs[i])

                var temp_data = companys.data.docs[i]
                var temp_status = new StatusCompany()

                temp_status.setStatusCompany(temp_data['status'])

                temp_data['date'] = {}
                temp_data['options'] = {}
                temp_data['pickupTime'] = {}
                
                var result = Object.keys(temp_data).reduce(function(r, e) {
                    // console.log('r', r)
                    // console.log('r', e)

                    // ================= 0

                    if (e == "awbNumber"){
                        r[e] = {}
                        r[e]["type"] = "link"
                        r[e]["text"] = temp_data['awbNumber']
                        r[e]["href"] = "/admin/job-request-view/" + temp_data['_id']
                    }

                    if (e == "customsEntryNumber"){
                        r[e] = {}
                        r[e]["text"] = temp_data['customsEntryNumber']
                    }

                    if (e == "customsEntryNumberDate"){
                        r[e] = {}
                        r[e]["text"] = moment(String(temp_data['customsEntryNumberDate'])).format('YYYYMMDD')
                    }

                    if (e == "flightNumber"){
                        r[e] = {}
                        r[e]["text"] = temp_data['flightNumber']
                    }

                    if (e== "flightDate") {
                      r[e] = {}
                      r[e]["text"] = temp_data['flightDate']
                    }

                    if (e == "hwbSerialNumber"){
                        r[e] = {}
                        r[e]["text"] = temp_data['hwbSerialNumber']
                    }

                    if (e == "jobNumber"){
                        r[e] = {}
                        r[e]["text"] = temp_data['jobNumber']
                    }

                    if (e == "options") {
                        r[e] = {}
                        r[e]["type"] = "options"
                        r[e]["view"] = {}
                        r[e]["view"]["href"] = "/admin/job-request-view/" + temp_data['_id']
                        r[e]["view"]["type"] = "link"
                    }

                    if (e == "status") {
                        r[e] = {}
                        r[e]["classer"] = temp_status.classer
                        r[e]["text"] = temp_status.text
                        r[e]["type"] = temp_status.type
                        r[e]["value"] = temp_status.value
                    }

                    if (e == "customsEntryNumberDate") {
                      r[e] = {}
                      r[e]["text"] = moment(String(temp_data['customsEntryNumberDate'])).format('DD MMM YYYY')
                    }

                    if (e == "date") {
                        r[e] = {}
                        r[e]["text"] = moment(String(temp_data['customsEntryNumberDate'])).format('DD MMM YYYY')
                    }

                    if (e == "dockNumber") {
                        r[e] = {}
                        r[e]["text"] = temp_data['dockNumber']
                    }
                    
                    if (e == "numberOfPieces") {
                        r[e] = {}
                        r[e]["text"] = temp_data['dockNumber']
                    }

                    if (e == "pickupTime") {
                      r[e] = {}
                      // r[e]["text"] = temp_data['pickupTimeHours'] + '.' + temp_data['pickupTimeMinutes']
                      if (String(temp_data['pickupTimeHours']).length == 1) {
                          temp_data['pickupTimeHours'] = '0' + temp_data['pickupTimeHours']
                      }

                      if (String(temp_data['pickupTimeMinutes']).length == 1) {
                          temp_data['pickupTimeMinutes'] = '0' + temp_data['pickupTimeMinutes']
                      }
                      r[e]["text"] = moment(String(temp_data['pickupTimeHours']) + String(temp_data['pickupTimeMinutes']), "hhmm").format("HH:mm")
                    }

                    if (e == "truckNumber") {
                        r[e] = {}
                        r[e]["text"] = temp_data['truckNumber']
                    }

                    return r;
                }, {})
                
                console.log('result :', result)

                temp_array.push(result)
            }
            
            if (companys.data.docs.length != 0) {
              if ( companys.data.docs[0].status == 0 ){
                  commit('update_job_request_0', temp_array);

              } else if (companys.data.docs[0].status == 1 ) {
                  commit('update_job_request_1', temp_array);
                  
              } else if ( companys.data.docs[0].status == 2 ) {
                  commit('update_job_request_2', temp_array);
                  
              } else if ( companys.data.docs[0].status == 3 ) {
                  commit('update_job_request_3', temp_array);
                  
              } else if ( companys.data.docs[0].status == 4 ) {
                  commit('update_job_request_4', temp_array); 
                  
              } else if ( companys.data.docs[0].status == 5 ) {
                  commit('update_job_request_5', temp_array);
              }
            }

            // console.log('change_status_loading :', false)

            let temp_filterstatus = new FilterStatus(
              companys.data.hasNextPage,
              companys.data.hasPrevPage,
              companys.data.limit,
              companys.data.nextPage,
              companys.data.page,
              companys.data.pagingCounter,
              companys.data.prevPage,
              companys.data.totalDocs,
              companys.data.totalPages,
              temp_array.length );

            commit('change_filterStatus', temp_filterstatus)
            commit('fetchPage', companys.data.page)
            commit('change_status_loading', false)

            return ;
          }
        )
        await commit('change_status_loading', false);
      },
      fetchJobDetail({ state , commit }, id) {            
          commit('change_status_loading', true)
          CompanyService.tgadmin_jobDetail(id).then(
              company => {
                  var data = company.data
                  if (data.pickupTimeHours.length < 2 && data.pickupTimeHours != '-') {
                      data.pickupTimeHours = '0' + data.pickupTimeHours
                  }
                  if (data.pickupTimeMinutes.length < 2 && data.pickupTimeMinutes != '-') {
                      data.pickupTimeMinutes = '0' + data.pickupTimeMinutes
                  }
                  if (data.confPickupTimeHours.length < 2 && data.confPickupTimeHours != '-') {
                      data.confPickupTimeHours = '0' + data.confPickupTimeHours
                  }
                  if (data.confPickupTimeMinutes.length < 2 && data.confPickupTimeMinutes != '-') {
                      data.confPickupTimeMinutes = '0' + data.confPickupTimeMinutes
                  }
                  commit('update_jobDetail', data)
                  commit('change_status_loading', false);
                  console.log('job detail fetched',data)
              }
          );
      },
      changePage({ commit }, page) {
        console.log('change to page: ', page)
        commit('fetchPage', page)
      },
      changeOrder({ commit }, order) {
        commit('fetchOrder', order)
      },
      changeSearch({ commit }, keyword) {
        commit('fetchSearch', keyword)
      },
      changeStatus({ commit }, status) {
        commit('fetchStatus', status)
      }
    },
    mutations: {
      change_status_loading(state, input) {
        state.loading = input
      },
      fetchFreightForwarders(state, input) {
        state.forwarders = input
      },
      fetchFreightForwardersDetail(state, input) {
        state.forwardersDetail = {
          company_name: input.company_detail.company_name,
          address: input.company_detail.company_detail[0].address,
          province: input.company_detail.company_detail[0].company_province,
          postal: input.company_detail.company_detail[0].company_postal,
          tax_id: input.company_detail.tax_id,
          status: input.company_detail.status
        }
      },
      fetchFreightForwardersUser(state, input) {
        input.forEach((user) => {
          if (user.role[0].name == "freight-forwarder") {
            state.forwardersFF.push({
              avatar: { type: 'avatar', text: 'data:image/png;base64,' + user.avatar[0].value },
              username: { text: user.username },
              prefix: { text: user.user_detail[0].prefix },
              firstname: { text: user.user_detail[0].firstname },
              lastname: { text: user.user_detail[0].lastname },
              email: { text: user.email },
              phone: { text: user.user_detail[0].phone },
              status: user.status ? 
                { type: 'tag', value: 1, text: 'เปิดใช้งาน', classer: 'ss-tag-success' } :
                { type: 'tag', value: 0, text: 'ปิดใช้งาน', classer: 'ss-tag-danger' },
              options: {
                type: 'options',
                view: { type: 'emit', id: { 
                  role: "freight-forwarder", 
                  id: user._id 
                }},
                edit: { type: 'emit', id: { 
                  role: "freight-forwarder", 
                  id: user._id 
                }},
                delete: { type: 'emit', id: { 
                  role: "freight-forwarder", 
                  id: user._id 
                }}
              },
              _id: user._id
            })
          } else {
            state.forwardersDriver.push({
              avatar: { type: 'avatar', text: 'data:image/png;base64,' + user.avatar[0].value },
              username: { text: user.username },
              prefix: { text: user.user_detail[0].prefix },
              firstname: { text: user.user_detail[0].firstname },
              lastname: { text: user.user_detail[0].lastname },
              email: { text: user.email },
              phone: { text: user.user_detail[0].phone },
              status: user.status ? 
                { type: 'tag', value: 1, text: 'เปิดใช้งาน', classer: 'ss-tag-success' } :
                { type: 'tag', value: 0, text: 'ปิดใช้งาน', classer: 'ss-tag-danger' },
              options: {
                type: 'options',
                view: { type: 'emit', id: { 
                  role: "driver", 
                  id: user._id 
                }},
                edit: { type: 'emit', id: { 
                  role: "driver", 
                  id: user._id 
                }},
                delete: { type: 'emit', id: { 
                  role: "driver", 
                  id: user._id 
                }}
              },
              _id: user._id
            })
          }
        })
        console.log('fetchFreightForwardersFF: ',state.forwardersFF)
        console.log('fetchFreightForwardersDriver: ',state.forwardersDriver)
        //state.forwardersUser
      },
      fetchFreightForwardersCurrentUser(state, condition) {
        state.forwardersCurrentUser = condition.role == 'driver' ? 
                                        state.forwardersDriver.find(user => user._id == condition.id) : 
                                        state.forwardersFF.find(user => user._id == condition.id)
        state.forwardersEditUser = {...state.forwardersCurrentUser}
        state.forwardersEditUser.avatar = null
        state.forwardersEditUser.password = ''
        state.forwardersEditUser.confpassword = ''
        /*state.forwardersEditUser.avatar != null ? state.forwardersEditUser.avatar = null : state.forwardersEditUser['avatar'] = null
        state.forwardersEditUser.password != '' ? state.forwardersEditUser.password = '' : state.forwardersEditUser['password'] = ''
        state.forwardersEditUser.confpassword != '' ? state.forwardersEditUser.confpassword = '' : state.forwardersEditUser['confpassword'] = ''*/
      },
      fetchDashboardOverview(state, input) {
        state.overview.company_count = input.data.company_count
        state.overview.driver_count = input.data.driver_count
        state.overview.ff_count = input.data.ff_count
        state.overview.state_0 = input.data.status0
        state.overview.state_1 = input.data.status1
        state.overview.state_2 = input.data.status2
        state.overview.state_3 = input.data.status3
        state.overview.state_4 = input.data.status4
        state.overview.state_5 = input.data.status5
      },
      fetchFilterStatus(state, input) {
        console.log('fetchFilterStatus: ', input)
        state.filterStatus.hasNextPage = input.hasNextPage
        state.filterStatus.hasPrevPage = input.hasPrevPage
        state.filterStatus.limit = input.limit
        state.filterStatus.nextPage = input.nextPage
        state.filterStatus.pagingCounter = input.pagingCounter
        state.filterStatus.prevPage = input.prevPage
        state.filterStatus.totalDocs = input.totalDocs
        state.filterStatus.totalPages = input.totalPages
      },
      update_job_request_0(state, input) {
        state.overview.job_detail_0 = input
      },
      update_job_request_1(state, input) {
          state.overview.job_detail_1 = input
      },
      update_job_request_2(state, input) {
          state.overview.job_detail_2 = input
      },
      update_job_request_3(state, input) {
          state.overview.job_detail_3 = input
      },
      update_job_request_4(state, input) {
          state.overview.job_detail_4 = input
      },
      update_job_request_5(state, input) {
          state.overview.job_detail_5 = input
      },
      update_jobDetail(state, input) {
          state.detailJob = input
      },
      change_filterStatus(state, input) {
        state.filterStatus = input
      },
      clear_job_requests(state) {
        state.overview.job_detail_0 = []
        state.overview.job_detail_1 = []
        state.overview.job_detail_2 = []
        state.overview.job_detail_3 = []
        state.overview.job_detail_4 = []
        state.overview.job_detail_5 = []
      },
      fetchPage(state, input) {
        console.log('fetchPage: ', input)
        state.condition.page = input
        state.filterStatus.page = input
      },
      fetchOrder(state, order) {
        console.log('fetch order')
        state.condition.sort_by = order.sort_by
        state.condition.order = order.order
        state.condition.page = '1'
        state.filterStatus.page = '1'
      },
      fetchSearch(state, keyword) {
        console.log('fetchSearch')
        state.condition.search = keyword
        state.condition.page = '1'
        state.filterStatus.page = '1'
      },
      fetchStatus(state, status) {
        console.log('fetchStatus')
        state.condition.status = status
        state.condition.page = '1'
        state.filterStatus.page = '1'
      }
    },
    getters: {
      getFilterStatus(state) {
        return state.filterStatus
      },
      getLoadingStatus(state) {
        return state.loading
      },
      getCondition(state) {
        return state.condition
      },
      getDashboardOverview(state) {
        return state.overview
      },
      getForwarders(state) {
        return state.forwarders
      },
      getForwardersDetail(state) {
        return state.forwardersDetail
      },
      getforwardersFF(state) {
        return state.forwardersFF
      },
      getforwardersDriver(state) {
        return state.forwardersDriver
      },
      getFreightForwardersCurrentUser(state) {
        return state.forwardersCurrentUser
      },
      getFreightForwardersEditUser(state) {
        return state.forwardersEditUser
      },
      getJobRequest0(state) {
        return state.overview.job_detail_0
      },
      getJobRequest1(state) {
        return state.overview.job_detail_1
      },
      getJobRequest2(state) {
        return state.overview.job_detail_2
      },
      getJobRequest3(state) {
        return state.overview.job_detail_3
      },
      getJobRequest4(state) {
        return state.overview.job_detail_4
      },
      getJobRequest5(state) {
        return state.overview.job_detail_5
      },
      getDetailJob(state) {
          return state.detailJob
      },
    }
}