//import Vuex from 'vuex';
import { createStore } from 'vuex'

import { auth } from './auth.module';
import { requests } from './request.module';
import { company } from './company.module';
import { user } from './user.module';

const store = createStore({
  modules: {
    auth,
    requests,
    company,
    user
  }
})

export default store;