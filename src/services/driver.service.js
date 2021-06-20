import axios from 'axios';
import authHeader from './auth-header';
import Overview from '../models/company-info';

class DriverService {
    jobRequest(condition) {
        // console.log('getting count each job...')
        // console.log('search filter :', condition)
        return axios.get(`/driver/overview/?page=${condition.page}&limit=${condition.limit}&sort_by=${condition.sort_by}&order=${condition.order}&status=${condition.status}`, { headers: authHeader() })
    }

    jobDetail(jobID) {
        return axios.get(`driver/${jobID}`, { headers: authHeader() })
    }
}

export default new DriverService();