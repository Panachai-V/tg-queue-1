import axios from 'axios';
import UserService from './user.service';

class AuthService {
  login(user) {
    console.log('username: ',user.username)
    return axios
      .post('auth/signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          UserService.getUserDetail()
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        console.log('user: ',response.data)

        return response.data;
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
      
      // username:{{username}}
      // password:{{password}}
      // email:{{email}}
      // taxid:{{Tax_ID}}
      // roles:{{roles}}
      // prefix:{{prefix}}
      // firstname:{{firstname}}
      // lastname:{{lastname}}
      // phone:{{phone}}
    });
  }
}

export default new AuthService();