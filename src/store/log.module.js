import AdminService from '../services/admin.service';
import Overview from '../models/company-info';
import {StatusCompany, FilterStatus, ConditionSelectViewJob} from '../models/select-company';

let temp_filterstatus = new FilterStatus(false, false, 10, 1, 1, 1, null, 1, 1, 1)
let temp_condition = new ConditionSelectViewJob('1', '10', 'action', 'ascending', 'all', '')

export const log = {
    namespaced: true,
    state: {
      loading: false,
      filterStatus: temp_filterstatus,
      condition: temp_condition,
      log: []
    },
    actions: {
        async overview({ commit , state }) {
            console.log('forwardersOverview: ', state.condition)
            //await commit('change_status_loading', true);
            await AdminService.getLog(state.condition).then(
                companys => {
                    console.log('freightForwarders: ', companys.data)
                    /*var tempFF = []
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
                    commit('fetchFilterStatus', companys.data)      */      
                },
                error => {
                    console.log('getForwarders error')
                }
            )
        await commit('change_status_loading', false)
      },

    },
    mutations: {
        change_status_loading(state, input) {
          state.loading = input
        },
        change_filterStatus(state, input) {
          state.filterStatus = input
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
        getLog(state) {
          return state.log
        },
    }
}