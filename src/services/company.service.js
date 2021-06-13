import axios from 'axios';
import authHeader from './auth-header';
import Overview from '../models/company-info';

class CompanyService {
    ff_jobRequest(condition) {
        // console.log('getting count each job...')
        
        return axios.get(`ff/jrq/?page=${condition.page}&limit=${condition.limit}&sort_by=${condition.sort_by}&order=${condition.order}&status=${condition.status}`, { headers: authHeader() })
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

    driver_jobRequest(jobID) {
        return axios.get(`driver/:${jobID}`, { headers: authHeader() })
    }
}

export default new CompanyService();