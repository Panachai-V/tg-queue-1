import axios from 'axios';
import authHeader from './auth-header';

class UserService {
  getUserDetail() {
    console.log('getting user data...')
    return axios.get('user/', { headers: authHeader() }).then(response => {
      if (response) {
        localStorage.setItem('userDetail', JSON.stringify(response.data));
      }
      console.log('user detail: ',response.data)

      return response.data;
    });
  }
  
  getUserCompanyDetail() {
    console.log('getting user company data...')
    return axios.get('user/user-company-detail', { headers: authHeader() })
  }
  getJobFreightforwarder() {
    console.log('getting company job request data...')
    return axios.get('ff/jrq', { headers: authHeader() })
  }
  /*getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }*/
}

//getFreightforwarder 

export default new UserService();