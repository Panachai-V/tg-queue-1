import SocketIO from '../services/socketIO.service';

export const socketIO = {
    namespaced: true,
    state: {
        roomid: '',
        userid: '',
        avatar: '',
        loadingStatus: false,
        message: '',
        messageHistory: [],
        socket: SocketIO.initializer(),
    },
    actions: {
        async joinChatRoom ({ commit, state }) {
            await commit('chageLoadingStatus', true)
            await state.socket.emit('join', {
                job_id: state.roomid,
                user_id: state.getUser.id,
            });
            await commit('chageLoadingStatus', false)
        },
        async leaveChatRoom ({ commit, state }) {
            await commit('chageLoadingStatus', true)
            await state.socket.emit('leave', this.username)
            await commit('chageLoadingStatus', false)
        },
        async receiveMessage ({ commit, state }) {
            await commit('chageLoadingStatus', true)
            await socket.on('recive-message', (data) => {
                console.log(data);
                  this.chat.push({
                    self: false,
                    message: data.message,
                    avatar: data.avatar,
                    createdAt: data.createdAt
                  })
              });
            await commit('chageLoadingStatus', false)
        }
    },
    mutations: {
        InitialInfo(state, input) {
            console.log(input)
            state.roomid = input.roomid
            state.userid = input.userid
            state.avatar = input.avatar
        },
        chageLoadingStatus(state, input) {
            state.loadingStatus = input
        },
    },
    getters: {
        getSocketID(state) {
            return state.socket
        }
    }
}