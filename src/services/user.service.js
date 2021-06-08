import axios from 'axios';
import authHeader from './auth-header';

class UserService {
  getUserDetail() {
    console.log('getting user data...')
    return axios.get('user/', { headers: authHeader() })
  }
  
  editUserDetail(userDetail) {
    console.log('editting user data...')
    return axios.post('user/edit-personal-information', {
      prefix: userDetail.prefix,
      firstname: userDetail.firstname,
      lastname: userDetail.lastname,
      phone: userDetail.phone
    }, { headers: authHeader() })
  }
  
  getUserCompanyDetail() {
    console.log('getting user company data...')
    return axios.get('user/user-company-detail', { headers: authHeader() })
  }

  editUserCompanyDetail(companyDetail) {
    console.log('editting user data...')
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
    console.log('getting company job request data...')
    return axios.get('ff/jrq', { headers: authHeader() })
  }
}

export default new UserService();