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
    console.log(regisuser)
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
      taxid: companyInfo.taxid,
      province: companyInfo.province,
      postal: companyInfo.postal,
      address: companyInfo.address,
      name: companyInfo.name
    });
  }

  verifyEmailRegister(token) {
    axios.get(`auth/verify/${token}`)
    return ;
  }

  requestTokenForResetPWD(email) {
    return axios.get(`auth/forgot/${email}`);
  }

  verifyTokenForResetPWD(token) {
    return axios.get(`auth/reset/${token}`);
  }

  saveChangedPassword(newPasswordInfo) {
    return axios.post(`auth/reset`, {
      token: newPasswordInfo.token,
      password: newPasswordInfo.password
    });
  }
}

export default new AuthService();