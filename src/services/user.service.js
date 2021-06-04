import axios from 'axios';
import authHeader from './auth-header';

class UserService {
  getUserDetail() {
    console.log('getting user data...')
    return axios.get('user/', { headers: authHeader() })
  }
  
  getUserCompanyDetail() {
    console.log('getting user company data...')
    return axios.get('user/user-company-detail', { headers: authHeader() })
  }
  getJobFreightforwarder() {
    console.log('getting company job request data...')
    return axios.get('ff/jrq', { headers: authHeader() })
  }
}

export default new UserService();