class SocketIO {
    initializer() {
        let socket = io.connect(process.env.VUE_APP_SERVERURL ,{
            withCredentials: false,
            transports : ['websocket']
        });

        return socket;
    }
}

export default new SocketIO();