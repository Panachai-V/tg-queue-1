import axios from 'axios';
import authHeader from './auth-header';

class AdminService {
    freightForwarders(condition) {
        return axios.get(`admin/company/?page=${condition.page}&limit=${condition.limit}&sort_by=${condition.sort_by}&order=${condition.order}&status=${condition.status}&search=${condition.search}`, { headers: authHeader() })
    }

    freightForwardersDetail(company_id) {
        return axios.get(`admin/company/${company_id}`, { headers: authHeader() })
    }

    freightForwardersEdit(id, forwardersEditDetail) {
        return axios.post(`admin/company/${id}/update`, forwardersEditDetail, { headers: authHeader() })
    }

    freightForwardersCreate(forwardersCreateDetail) {
        return axios.post('admin/company/create', forwardersCreateDetail, { headers: authHeader() })
    }

    freightForwardersDelete(id) {
        return axios.get(`admin/company/${id}/delete`, { headers: authHeader() })
    }

    fetchOverview() {
        return axios.get('admin/overview', { headers: authHeader() });
    }

    fetchAllJob(condition) {
        return axios.get(`admin/all_Job/?page=${condition.page}&limit=${condition.limit}&sort_by=${condition.sort_by}&order=${condition.order}&status=${condition.status}&search=${condition.search}`, { headers: authHeader() })
    }

    jobCreate(detailCreateJob) {
        return axios.post('admin/all_Job/create', detailCreateJob, { headers: authHeader() })
    }  

    userCreate(id, forwardersCreateUser) {
        return axios.post(`admin/company/${id}/create_user`, forwardersCreateUser, { headers: authHeader() })
    }  

    userEdit(id, forwardersEditUser) {
        console.log('service edit user: ',id, forwardersEditUser)
        return axios.post(`admin/company/${id}/${forwardersEditUser._id}/edit`, forwardersEditUser, { headers: authHeader() })
    }  
}

export default new AdminService();