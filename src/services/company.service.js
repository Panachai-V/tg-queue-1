import axios from 'axios';
import authHeader from './auth-header';
import Overview from '../models/company-info';

class CompanyService {
    getCountJob() {
        // console.log('getting count each job...')
        
        return axios.get('ff/jrq/?page=1&limit=20', { headers: authHeader() })
    }

    driver() {
        return axios.get('ff/tdv/overview', { headers: authHeader() }).then(response => {            
              console.log('driver: ', response.data)
            })
    }
}

export default new CompanyService();