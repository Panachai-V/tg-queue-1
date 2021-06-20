import DriverService from '../services/driver.service';
import Overview from '../models/company-info';
import {StatusCompany, FilterStatus} from '../models/select-company';
import moment from 'moment';

let temp_overview = new Overview(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
let temp_filterstatus = new FilterStatus(false, false, 10, 1, 1, 1, null, 1, 1, 1)

export const driver = {
    namespaced: true,
    state: {
      message: 'Hello World!',
      overview: temp_overview,
      detailJob: null,
      loading: false,
      filterStatus: temp_filterstatus
    },
    actions: {
        async fetchJobRequest({ commit }, condition ){
            await commit('change_status_loading', true);
            // console.log('change_status_loading :', true)
            await DriverService.jobRequest(condition).then(
                companys => {
                    // console.log('companys.data.docs :', companys.data.docs[0])
                    // console.log('status data :', companys.data.docs[0].status)
                    //console.log('companys.data :', companys.data)  

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
                                r[e]["href"] = "/driver/my-job-view/" + temp_data['_id']
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
                                r[e]["view"]["href"] = "/driver/my-job-view/" + temp_data['_id']
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
                                r[e]["text"] = temp_data['pickupTimeHours'] + '.' + temp_data['pickupTimeMinutes']
                            }

                            if (e == "truckNumber") {
                                r[e] = {}
                                r[e]["text"] = temp_data['truckNumber']
                            }

                            return r;
                        }, {})
                        
                        // console.log('result :', result)

                        temp_array.push(result)
                    }
                    console.log('companys.data.docs[0]: ',companys)
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
            
        },
        fetchJobDetail({ state , commit }, id) {            
            commit('change_status_loading', true)
            DriverService.jobDetail(id).then(
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
        }
    },
    mutations: {
        update_overview(state, data_detail){
            state.overview.state_0 = data_detail.data.status0
            state.overview.state_1 = data_detail.data.status1
            state.overview.state_2 = data_detail.data.status2
            state.overview.state_3 = data_detail.data.status3
            state.overview.state_4 = data_detail.data.status4
            state.overview.state_5 = data_detail.data.status5
        },
        change_status_loading(state, input) {
            state.loading = input
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
        }
    },
    getters: {
        getOverviewComapny(state) {
            return state.overview
        },
        getLoadingStatus(state) {
            return state.loading
        },
        getJobRequest0(state) {
            console.log('getting job_0')
            return state.overview.job_detail_0
        },
        getJobRequest1(state) {
            console.log('getting job_1')
            return state.overview.job_detail_1
        },
        getJobRequest2(state) {
            console.log('getting job_2')
            return state.overview.job_detail_2
        },
        getJobRequest3(state) {
            console.log('getting job_3')
            return state.overview.job_detail_3
        },
        getJobRequest4(state) {
            console.log('getting job_4')
            return state.overview.job_detail_4
        },
        getJobRequest5(state) {
            console.log('getting job_5')
            return state.overview.job_detail_5
        },
        getDetailJob(state) {
            return state.detailJob
        },
        getFilterStatus(state) {
            return state.filterStatus
        }
    }
}