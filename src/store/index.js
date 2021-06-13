//import Vuex from 'vuex';
import { createStore } from 'vuex'

import { auth } from './auth.module';
import { requests } from './request.module';
import { freight_forwarder } from './freight_forwarder.module';
import { driver } from './driver.module';

const store = createStore({
  modules: {
    auth,
    requests,
    freight_forwarder,
    driver
  }
})

export default store;