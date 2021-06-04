import axios from 'axios';
import authHeader from './auth-header';

class RequestService {
    add(jobRequest) {
        console.log('request service')
        return axios.post('ff/jrq/create', {
            awbNumber: jobRequest.awbNumber,
            hwbSerialNumber: jobRequest.hwbSerialNumber,
            flightNumber: jobRequest.flightNumber,
            jobNumber: jobRequest.jobNumber,
            customsEntryNumber: jobRequest.customsEntryNumber,
            customsEntryNumberDate: jobRequest.customsEntryNumberDate
          }, { 
              headers: authHeader() 
            })
    }
}

export default new RequestService();