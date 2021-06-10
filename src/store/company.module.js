import CompanyService from '../services/company.service';
import Overview from '../models/company-info';
import moment from 'moment';

let temp_variable = new Overview(0, 0, 0, 0, 0, 0, 0, 0);

export const company = {
    namespaced: true,
    state: {
      message: 'Hello World!',
      overview: temp_variable,
      loading: false
    },
    actions: {
        get_overview({ commit }) {
            commit('change_status_loading', true);
            CompanyService.getCountJob().then(
              companys => {
                // let temp_variable = new Overview();
                for (let i = 0; i <  companys.data.docs.length; i++) {
                    let temp = {
                        awbNumber: { 
                            type: 'link', text: companys.data.docs[i].awbNumber,
                            href: '/forwarder/job-request-view'
                        },
                        hwbSerialNumber: { text: companys.data.docs[i].hwbSerialNumber },
                        flightNumber: { text: companys.data.docs[i].flightNumber },
                        jobNumber: { text: companys.data.docs[i].jobNumber },
                        customsEntryNumber: { text: companys.data.docs[i].customsEntryNumber },
                        customsEntryNumberDate: { text: moment(String(companys.data.docs[i].customsEntryNumberDate)).format('YYYYMMDD') },
                        status: { type: 'tag', value: companys.data.docs[i].status, text: 'รอการ Matching', classer: 'ss-tag-danger' },
                        options: {
                            type: 'options',
                            view: { type: 'link', href: '/forwarder/job-request-view' }
                        }
                    }
                    commit('update_overview', temp)
                }

                commit('change_status_loading', false)
                return ;
              },
              error => {
                console.log('error')
                return ;
              }
            );
          },
    },
    mutations: {
        update_overview(state, data_detail){
            if (data_detail.status.value == 0){

                state.overview.state_0 = state.overview.state_0 + 1
                state.overview.job_detail_0.push(data_detail)

            } else if (data_detail.status.value == 1) {

                state.overview.state_1 = state.overview.state_1 + 1
                state.overview.job_detail_1.push(data_detail)

            } else if (data_detail.status.value == 2) {

                state.overview.state_2 = state.overview.state_2 + 1
                state.overview.job_detail_2.push(data_detail)

            } else if (data_detail.status.value == 3) {

                state.overview.state_3 = state.overview.state_3 + 1
                state.overview.job_detail_3.push(data_detail)

            } else if (data_detail.status.value == 4) {

                state.overview.state_4 = state.overview.state_4 + 1
                state.overview.job_detail_4.push(data_detail)

            } else if (data_detail.status.value == 5) {

                state.overview.state_5 = state.overview.state_5 + 1
                state.overview.job_detail_5.push(data_detail)

            } else if (data_detail.status.value == 6) {

                state.overview.state_6 = state.overview.state_6 + 1
                state.overview.job_detail_6.push(data_detail)

            } else if (data_detail.status.value == 7) {

                state.overview.state_7 = state.overview.state_7 + 1
                state.overview.job_detail_7.push(data_detail)
            }
        },
        change_status_loading(state, input){
            state.loading = input
        },
    },
    getters: {
        print_overview(state) {
            return state.overview
        },
        get_status(state) {
            return state.loading
        }
    }
}