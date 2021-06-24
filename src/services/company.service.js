import axios from 'axios';
import authHeader from './auth-header';
import Overview from '../models/company-info';

class CompanyService {
    ff_jobRequest(condition) {
        // console.log('getting count each job...')
        // console.log('search filter :', condition)
        return axios.get(`ff/jrq/?page=${condition.page}&limit=${condition.limit}&sort_by=${condition.sort_by}&order=${condition.order}&status=${condition.status}&search=${condition.search}`, { headers: authHeader() })
    }

    ff_Dashboard() {
        return axios.get('ff/jrq/overview', { headers: authHeader() })
    }

    ff_jobDetail(jobID) {
        return axios.get(`ff/jrq/${jobID}`, { headers: authHeader() })
    }

    driverOverview() {
        return axios.get('ff/tdv/overview', { headers: authHeader() })
    }

    ffDriverDetail(id) {
        return axios.get('ff/tdv/' + id, { headers: authHeader() })
    }

    ffDriverEdit(id,formData) {        
        console.log('service fomrdata: ', formData)
        return axios.post('ff/tdv/edit/' + id, formData, { headers: authHeader() })
    }

    ffDriverDelete(id) {  
        console.log('deleter')      
        return axios.get('ff/tdv/delete/' + id, { headers: authHeader() })
    }

    ffDriverCreate(formData) {  
        return axios.post('ff/tdv/create', formData, { headers: authHeader() })
    }

    driver_jobRequest(jobID) {
        return axios.get(`driver/:${jobID}`, { headers: authHeader() })
    }

    tgadmin_Dashboard() {
        return axios.get('tgadmin/overview', { headers: authHeader() })
    }

    tgadmin_jobRequest(condition) {
        // console.log('getting count each job...')
        // console.log('search filter :', condition)
        return axios.get(`tgadmin/all/?page=${condition.page}&limit=${condition.limit}&sort_by=${condition.sort_by}&order=${condition.order}&status=${condition.status}&search=${condition.search}`, { headers: authHeader() })
    }

    tgadmin_jobDetail(jobID) {
        return axios.get(`tgadmin/${jobID}`, { headers: authHeader() })
    }

    tgadmin_confirmPayment(jobID) {
        return axios.get(`tgadmin/${jobID}/confirm_payment`, { headers: authHeader() })
    }

    tgadmin_pickup(jobID,detailPickup) {
        return axios.post(`tgadmin/${jobID}/pickup`, detailPickup, { headers: authHeader() })
    }
}

export default new CompanyService();