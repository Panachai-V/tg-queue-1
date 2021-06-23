import ChatService from '../services/chat.service';

export const chat = {
    namespaced: true,
    state: {
        loadingStatus: false,
        socketID: '',
    },
    actions: {
        async connectToIO ({ commit }, user) {
            await ChatService.initializer().then(
                socket => {
                    commit('InitialSocket', socket)
                    return Promise.resolve();
                },
                error => {
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        InitialSocket({state}, input) {
            state.socketID = input
        }
    },
    getters: {
        getSocketID(state) {
            return state.socketID
        }
    }
}