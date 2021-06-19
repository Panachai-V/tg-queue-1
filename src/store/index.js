//import Vuex from 'vuex';
import { createStore } from 'vuex'

import { auth } from './auth.module';
import { requests } from './request.module';
import { freight_forwarder } from './freight_forwarder.module';
import { ff_driver } from './ff_driver.module';
import { tgAdmin } from './tgAdmin.module';

const store = createStore({
  modules: {
    auth,
    requests,
    freight_forwarder,
    ff_driver,
    tgAdmin
  }
})

export default store;