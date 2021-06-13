import CompanyService from '../services/company.service';
import Overview from '../models/company-info';
import moment from 'moment';

let temp_variable = new Overview(0, 0, 0, 0, 0, 0, 0, 0);

export const freight_forwarder = {
    namespaced: true,
    state: {
      message: 'Hello World!',
      overview: temp_variable,
      detailJob: null,
      loading: false
    },
    actions: {
        fetchOverview({ commit }) {
            commit('change_status_loading', true);
            CompanyService.ff_Dashboard().then(
              companys => {
                commit('update_overview', companys)
                // for (let i = 0; i <  companys.data.docs.length; i++) {
                    // let temp = {
                    //     awbNumber: { 
                    //         type: 'link', text: companys.data.docs[i].awbNumber,
                    //         href: '/forwarder/job-request-view'
                    //     },
                    //     hwbSerialNumber: { text: companys.data.docs[i].hwbSerialNumber },
                    //     flightNumber: { text: companys.data.docs[i].flightNumber },
                    //     jobNumber: { text: companys.data.docs[i].jobNumber },
                    //     customsEntryNumber: { text: companys.data.docs[i].customsEntryNumber },
                    //     customsEntryNumberDate: { text: moment(String(companys.data.docs[i].customsEntryNumberDate)).format('YYYYMMDD') },
                    //     status: { type: 'tag', value: companys.data.docs[i].status, text: 'รอการ Matching', classer: 'ss-tag-danger' },
                    //     options: {
                    //         type: 'options',
                    //         view: { type: 'link', href: '/forwarder/job-request-view' }
                    //     }
                    // }
                //     commit('update_overview', temp)
                // }
                commit('update_overview', companys)
                commit('change_status_loading', false)
                return ;
              },
              error => {
                console.log('error')
                return ;
              }
            );
        },
        fetchJobRequest({ state, commit }, condition ){
            commit('change_status_loading', true);
            CompanyService.ff_jobRequest(condition).then(
                companys => {
                    console.log('company :', companys.data.docs[0]) 
                    console.log('status data :', companys.data.docs[0].status)  

                    var temp_array = []

                    // for(let i = 0; i < companys.data.docs.length; i++){

                    //     var temp_data = companys.data.docs[i]

                    //     temp_data['options'] = {}
        
                    //     var result = Object.keys(temp_data).reduce(function(r, e) {
                    //         console.log('r', r)
                    //         console.log('r', e)
                    //         if (e == "awbNumber"){
                    //             r[e] = {}
                    //             r[e]["href"] = "/forwarder/job-request-view"
                    //             r[e]["text"] = temp_data['awbNumber']
                    //             r[e]["type"] = "link"
                    //         }
        
                    //         if (e == "customsEntryNumber"){
                    //             r[e] = {}
                    //             r[e]["text"] = temp_data['customsEntryNumber']
                    //         }

                    //         if (e == "customsEntryNumberDate"){
                    //             r[e] = {}
                    //             r[e]["text"] = moment(String(temp_data['customsEntryNumberDate'])).format('YYYYMMDD')
                    //         }

                    //         if (e == "flightNumber"){
                    //             r[e] = {}
                    //             r[e]["text"] = temp_data['flightNumber']
                    //         }

                    //         if (e == "hwbSerialNumber"){
                    //             r[e] = {}
                    //             r[e]["text"] = temp_data['hwbSerialNumber']
                    //         }

                    //         if (e == "jobNumber"){
                    //             r[e] = {}
                    //             r[e]["text"] = temp_data['jobNumber']
                    //         }

                    //         if (e == "options") {
                    //             r[e] = {}
                    //             r[e]["type"] = "options"
                    //             r[e]["view"] = {}
                    //             r[e]["view"]["href"] = "/forwarder/job-request-view"
                    //             r[e]["view"]["type"] = "link"
                    //         }

                    //         if (e == "status") {
                    //             r[e] = {}
                    //             r[e]["classer"] = "ss-tag-danger"
                    //             r[e]["text"] = "รอการ Matching"
                    //             r[e]["type"] = "tag"
                    //             r[e]["value"] = temp_data['status']
                    //         }
                    //         return r;
                    //     }, {})
                        
                    //     console.log('result :', result)

                    //     temp_array.push(result)
                    // }
                    
                    if ( companys.data.docs[0].status == 1 ){
                        commit('update_job_request_1', temp_array);

                    } else if (companys.data.docs[0].status == 2 ) {
                        commit('update_job_request_2', companys.data.docs);
                        
                    } else if ( companys.data.docs[0].status == 3 ) {
                        commit('update_job_request_3', companys.data.docs);
                        
                    } else if ( companys.data.docs[0].status == 4 ) {
                        commit('update_job_request_4', companys.data.docs); 
                        
                    } else if ( companys.data.docs[0].status == 5 ) {
                        commit('update_job_request_5', companys.data.docs);
                    }
                }
            )
            commit('change_status_loading', false)
            return ;
        },
        fetchJobDetail({ commit }, id) {
            CompanyService.ff_jobDetail(id).then(
                company => {
                    commit('update_jobDetail', company)
                    console.log(company)
                }
            );
        }
    },
    mutations: {
        update_overview(state, data_detail){
            state.overview.state_1 = data_detail.data.status1
            state.overview.state_2 = data_detail.data.status2
            state.overview.state_3 = data_detail.data.status3
            state.overview.state_4 = data_detail.data.status4
            state.overview.state_5 = data_detail.data.status5
        },
        change_status_loading(state, input) {
            state.loading = input
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
        }
    },
    getters: {
        getOverviewComapny(state) {
            return state.overview
        },
        get_status(state) {
            return state.loading
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
        }
    }
}