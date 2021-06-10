import axios from 'axios';
import authHeader from './auth-header';

class UserService {
  getUserDetail() {
    return axios.get('user/', { headers: authHeader() }).then(response => {
      localStorage.setItem('userDetail', JSON.stringify(response.data));
      return response.data
    })
  }
  
  editUserDetail(fromData) {
    return axios.post('user/edit-personal-information', fromData, { headers: authHeader() })
  }
  
  getUserCompanyDetail() {
    return axios.get('user/user-company-detail', { headers: authHeader() })
  }

  editUserCompanyDetail(companyDetail) {
    return axios.post('user/edit-company', {
      companyName: companyDetail.name,
      address: companyDetail.address,
      province: companyDetail.province,
      postal: companyDetail.zipcode
    }, { headers: authHeader() })
  }

  changePWD(pwd) {
    return axios.post('user/change-pwd', {
      oldpassword: pwd.password,
      newpassword: pwd.newPassword
    }, { headers: authHeader() })
  }

  getJobFreightforwarder() {
    return axios.get('ff/jrq', { headers: authHeader() })
  }
}

export default new UserService();