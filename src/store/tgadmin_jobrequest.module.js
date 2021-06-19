import CompanyService from '../services/company.service';
import Overview from '../models/company-info';
import {StatusCompany, FilterStatus} from '../models/select-company';
import moment from 'moment';

let tempOverview = new Overview(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
let tempFilterstatus = new FilterStatus(false, false, 10, 1, 1, 1, null, 1, 1, 1)

export const tg_jobrequest = {
    namespaced: true,
    state: {
      overview: tempOverview,
      detailJob: null,
      loading: false,
      filterStatus: tempFilterstatus
    },
    actions: {
        fetchOverview({ commit }) {
            commit('change_status_loading', true);
            CompanyService.tgOverview().then(
              companys => {
                // console.log(companys)
                // commit('update_overview', companys)
                // commit('change_status_loading', false)
                return ;
              },
              error => {
                console.log('fetchOverview error')
                commit('change_status_loading', false)
                return ;
              }
            );
        },
    },
    mutations: {
        change_status_loading(state, input) {
            state.loading = input
        },
        update_overview(state, data_detail){
            state.overview.state_0 = data_detail.data.status0
            state.overview.state_1 = data_detail.data.status1
            state.overview.state_2 = data_detail.data.status2
            state.overview.state_3 = data_detail.data.status3
            state.overview.state_4 = data_detail.data.status4
            state.overview.state_5 = data_detail.data.status5
        },
    },
    getters: {
        getOverviewComapny(state) {
            return state.overview
        },
        getLoadingStatus(state) {
            return state.loading
        },
    }
}