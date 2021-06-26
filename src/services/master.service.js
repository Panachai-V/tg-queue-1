import axios from 'axios';
import authHeader from './auth-header';

class MasterService {
    province() {
        return axios.get('master-module/province')         
    }
}
export default new MasterService();