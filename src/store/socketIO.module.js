import SocketIO from '../services/socketIO.service';

export const socketIO = {
    namespaced: true,
    state: {
        roomid: null,
        userid: null,
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
                user_id: state.userid,
            });
            
            await SocketIO.messageHistory(state.roomid).then( oldMessage => {
                let lengthOldMessagee = (oldMessage.data).length
                let profileAvatar = (oldMessage.data)[lengthOldMessagee - 1]
                oldMessage.data.pop()
                var newArr = oldMessage.data.map(function(item){

                    let avatarindex = profileAvatar.find(element => element.name == item.avatar)
                    return {
                        self: item.self, 
                        message: item.message,
                        avatar: avatarindex['value'],
                        createdAt: item.createdAt,
                    };
                });
                state.messageHistory = [...newArr]
            })

            await commit('chageLoadingStatus', false)
        },
        async leaveChatRoom ({ commit, state }) {
            await commit('chageLoadingStatus', true)
            await state.socket.emit('leave', state.userid)
            await commit('chageLoadingStatus', false)
        },
        async receiveMessage ({ commit, state }) {
            await state.socket.on('recive-message', (data) => {
                state.messageHistory.push({
                    self: false,
                    message: data.message,
                    avatar: data.avatar,
                    createdAt: data.createdAt
                })
            });
        },
        async sendMessage ({ commit, state }, message ) {
            await commit('chageLoadingStatus', true)
            await state.socket.emit('send-message', { 
                user_id: state.userid,                
                job_id: state.roomid,
                message: message,
                createAt : Date.now()
              });

            await state.messageHistory.push({
                self: true,
                message: message,
                avatar: state.avatar,
                createdAt: Date.now()
            })
            await commit('chageLoadingStatus', false)
        }
    },
    mutations: {
        InitialInfo(state, input) {
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
        },
        getMessageHistory(state) {
            return state.messageHistory
        }
    }
}