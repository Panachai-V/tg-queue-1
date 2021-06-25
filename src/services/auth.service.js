import axios from 'axios';

class AuthService {
  login(user) {
    return axios
      .post('auth/signin', {
        username: user.username,
        password: user.password
      }).then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
          return response.data
        }
      });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userDetail');
  }

  register(regisuser) {
    return axios.post('auth/signup/', {
      username: regisuser.username,
      password: regisuser.password,
      email: regisuser.email,
      taxid: regisuser.taxId,
      roles: regisuser.roleId,
      prefix: regisuser.prefix,
      firstname: regisuser.firstname,
      lastname: regisuser.lastname,
      phone: regisuser.phone
    });
  }
  
  createCompany(companyInfo) {
    return axios.post('auth/checktaxid', {
      taxid: regisuser.taxid,
      province: regisuser.province,
      postal: regisuser.postal,
      address: regisuser.address,
      name: regisuser.name
    });
  }

  verifyEmailRegister(token) {
    axios.get(`auth/verify/${token}`)
    return ;
  }

  forgetPWDSendTokenToEmail(email) {
    axios.get(`auth/forgot/${email}`)
    return ;
  }
}

export default new AuthService();