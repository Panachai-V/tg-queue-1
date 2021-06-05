import axios from 'axios';
import authHeader from './auth-header';

class CompanyService {
    getCountJob() {
        console.log('getting count each job...')
        return axios.get('ff/jrq/', { headers: authHeader() })
    }
}

export default new CompanyService();