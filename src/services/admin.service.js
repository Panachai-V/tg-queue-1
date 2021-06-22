import axios from 'axios';
import authHeader from './auth-header';

class AdminService {
    freightForwarders(condition) {
        return axios.get(`admin/company/?page=${condition.page}&limit=${condition.limit}&sort_by=${condition.sort_by}&order=${condition.order}&status=${condition.status}&search=${condition.search}`, { headers: authHeader() })
    }

    fetchOverview() {
        return axios.get('admin/overview', { headers: authHeader() });
    }

    fetchAllJob(condition) {
        return axios.get(`admin/all_Job/?page=${condition.page}&limit=${condition.limit}&sort_by=${condition.sort_by}&order=${condition.order}&status=${condition.status}&search=${condition.search}`, { headers: authHeader() })
    }

    freightForwardersDetail(company_id) {
        return axios.get(`admin/company/${company_id}`, { headers: authHeader() })
    }
}

export default new AdminService();