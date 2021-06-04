import axios from 'axios';
import UserService from './user.service';

class AuthService {
  login(user) {
    console.log('username: ',user.username)
    return axios
      .post('auth/signin', {
        username: user.username,
        password: user.password
      }).then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
          console.log('logged in: ', response.data)
          return response.data
        }
      });
  }

  logout() {
    localStorage.removeItem('user');
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
}

export default new AuthService();