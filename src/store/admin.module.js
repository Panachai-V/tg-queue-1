import AdminService from '../services/admin.service';
import Overview from '../models/company-info';
import {StatusCompany, FilterStatus, ConditionSelectViewJob} from '../models/select-company';
import moment from 'moment';

let temp_overview = new Overview(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
let temp_filterstatus = new FilterStatus(false, false, 10, 1, 1, 1, null, 1, 1, 1)
let temp_condition = new ConditionSelectViewJob('1', '10', 'company_name', 'ascending', '0', '')

export const admin = {
    namespaced: true,
    state: {
      loading: false,
      filterStatus: temp_filterstatus,
      overview: temp_overview,
      forwarders: [],
      condition: temp_condition
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
                  view: { type: 'link', href: `/admin/forwarder-view/${company.tax_id}` },
                  edit: { type: 'link', href: `/admin/forwarder-edit/${company.tax_id}` }
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
      async fetchAllJob({ commit }, condition) {
        await commit('change_status_loading', true);
        await AdminService.fetchAllJob(condition).then(
          companys => {
            var temp_array = []

            for(let i = 0; i < companys.data.docs.length; i++){
                //console.log('companys.data.docs :', companys.data.docs[i])

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
                        r[e]["href"] = "/tgadmin/job-request-view/" + temp_data['_id']
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
                        r[e]["view"]["href"] = "/tgadmin/job-request-view/" + temp_data['_id']
                        r[e]["view"]["type"] = "link"
                    }

                    if (e == "status") {
                        r[e] = {}
                        r[e]["classer"] = temp_status.classer
                        r[e]["text"] = temp_status.text
                        r[e]["type"] = temp_status.type
                        r[e]["value"] = temp_status.value
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
            commit('change_status_loading', false)

            return ;
          }
        )
        await commit('change_status_loading', false);
      },
      changePage({ commit }, page) {
        console.log('change to page: ', page)
        commit('fetchPage', page)
      },
      changeOrder({ commit }, order) {
        commit('fetchorder', order)
      }
    },
    mutations: {
      change_status_loading(state, input) {
        state.loading = input
      },
      fetchFreightForwarders(state, input) {
        state.forwarders = input
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
        state.filterStatus.hasNextPage = input.hasNextPage
        state.filterStatus.hasPrevPage = input.hasPrevPage
        state.filterStatus.limit = input.limit
        state.filterStatus.nextPage = input.nextPage
        state.filterStatus.page = input.page
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
      change_filterStatus(state, input) {
        state.filterStatus = input
      },
      fetchPage(state, input) {
        state.condition.page = input
      },
      fetchorder(state, order) {
        state.condition.sort_by = order.sort_by
        state.condition.order = order.order
        state.condition.page = '1'
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
    }
}