import ChatService from '../services/chat.service';

export const chat = {
    namespaced: true,
    state: {
        loadingStatus: false,
        socket: null,
    },
    actions: {
        async connectToIO ({ commit }) {
            await commit('chageLoadingStatus', true)
            await ChatService.initializer().then(
                socketID => {
                    commit('InitialSocket', socketID)
                    return Promise.resolve();
                },
                error => {
                    return Promise.reject(error);
                }
            );
            await commit('chageLoadingStatus', false)
        },
        async joinChatRoom ({ commit, state }) {
            await commit('chageLoadingStatus', true)
            await state.socket.emit('join', {
                job_id: this.roomid,
                user_id: this.getUser.id,
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
        InitialSocket({state}, input) {
            state.socket = input
        },
        chageLoadingStatus({state}, input) {
            state.loadingStatus = input
        },
    },
    getters: {
        getSocketID(state) {
            return state.socket
        }
    }
}