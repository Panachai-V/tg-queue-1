//import Vuex from 'vuex';
import { createStore } from 'vuex'

import { auth } from './auth.module';

//Vue.use(Vuex);

/*export default new Vuex.Store({
  modules: {
    auth
  }
});*/

/*export default store = createStore({
  modules: {
    auth
  }
});*/

const store = createStore({
  modules: {
    auth
  }
})

export default store;