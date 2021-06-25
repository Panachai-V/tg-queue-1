import axios from 'axios';
import authHeader from './auth-header';

class SocketIO {
    initializer() {
        let socket = io.connect(process.env.VUE_APP_SERVERURL ,{
            withCredentials: false,
            transports : ['websocket']
        });

        return socket;
    }

    messageHistory(jobID) {
        return axios.get(`chat/${jobID}`, { headers: authHeader() })
    }
}

export default new SocketIO();