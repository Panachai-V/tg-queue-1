//import Vuex from 'vuex';
import { createStore } from 'vuex'

import { auth } from './auth.module';
import { master } from './master.module';
import { requests } from './request.module';
import { freight_forwarder } from './freight_forwarder.module';
import { driver } from './driver.module';
import { ff_driver } from './ff_driver.module';
import { tgAdmin } from './tgAdmin.module';
import { admin } from './admin.module';
import { socketIO } from './socketIO.module';

const store = createStore({
  modules: {
    auth,
    master,
    requests,
    freight_forwarder,
    ff_driver,
    driver,
    tgAdmin,
    admin,
    socketIO
  }
})

export default store;