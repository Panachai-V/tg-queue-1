import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Home.vue'
import store from '../store/index.js';

function requireAuth (to, from, next) {
  if ( store.getters['auth/isAuthenticated'] ) {
    next()
  } else{
    next('/auth/signin');
  }  
}

function isForwarder (to, from, next) {
  if ( store.getters['auth/isAuthenticated'] && store.getters['auth/isForwarder'] ) {
    next()
  } else{
    next('/auth/signin');
  }  
}

const routes = [

  // Home Page
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },


  // Auth Pages
  {
    path: '/auth/signin',
    name: 'AuthSignInPage',
    component: () => import('../views/auth/SignIn.vue')
  },
  {
    path: '/auth/register',
    name: 'AuthRegisterPage',
    component: () => import('../views/auth/Register.vue')
  },
  {
    path: '/auth/forget-password',
    name: 'AuthForget',
    component: () => import('../views/auth/Forget.vue')
  },
  {
    path: '/auth/verifyRegister/:token?',
    name: 'VerifyRegisterToken',
    component: () => import('../views/auth/verifyRegister.vue')
  },


  // Freight Forwarder
  {
    path: '/forwarder/dashboard',
    name: 'ForwarderDashboardPage',
    component: () => import('../views/forwarder/Dashboard.vue'),
    beforeEnter: isForwarder
  },
  
  // Freight Forwarder - Job Requests
  {
    path: '/forwarder/job-requests/:tab?',
    name: 'ForwarderJobRequestsPage',
    component: () => import('../views/forwarder/JobRequests.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/forwarder/job-request-add',
    name: 'ForwarderJobRequestAddPage',
    component: () => import('../views/forwarder/JobRequestAdd.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/forwarder/job-request-view/:jobID',
    name: 'ForwarderJobRequestViewPage',
    component: () => import('../views/forwarder/JobRequestView.vue'),
    beforeEnter: requireAuth
  },
  
  // Freight Forwarder - Drivers
  {
    path: '/forwarder/drivers',
    name: 'ForwarderDriversPage',
    component: () => import('../views/forwarder/Drivers.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/forwarder/driver-add',
    name: 'ForwarderDriverAddPage',
    component: () => import('../views/forwarder/DriverAdd.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/forwarder/driver-edit/:id',
    name: 'ForwarderDriverEditPage',
    component: () => import('../views/forwarder/DriverEdit.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/forwarder/driver-view/:id',
    name: 'ForwarderDriverViewPage',
    component: () => import('../views/forwarder/DriverView.vue'),
    beforeEnter: requireAuth
  },


  // Driver - My Jobs
  {
    path: '/driver/my-jobs',
    name: 'DriverMyJobsPage',
    component: () => import('../views/driver/MyJobs.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/driver/my-job-view/:id',
    name: 'DriverMyJobViewPage',
    component: () => import('../views/driver/MyJobView.vue'),
    beforeEnter: requireAuth
  },


  // TG Admin Dashboard
  {
    path: '/tgadmin/dashboard',
    name: 'TGAdminDashboardPage',
    component: () => import('../views/tgadmin/Dashboard.vue'),
    beforeEnter: requireAuth
  },

  // TG Admin - Job Requests
  {
    path: '/tgadmin/job-requests/:tab?',
    name: 'TGAdminJobRequestsPage',
    component: () => import('../views/tgadmin/JobRequests.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/tgadmin/job-request-view/:id?',
    name: 'TGAdminJobRequestViewPage',
    component: () => import('../views/tgadmin/JobRequestView.vue'),
    beforeEnter: requireAuth
  },


  // Admin Dashboard
  {
    path: '/admin',
    name: 'AdminDashboardPage',
    component: () => import('../views/admin/Dashboard.vue'),
    beforeEnter: requireAuth
  },

  // Admin - Job Requests
  {
    path: '/admin/job-requests/:tab?',
    name: 'AdminJobRequestsPage',
    component: () => import('../views/admin/JobRequests.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/admin/job-request-add',
    name: 'AdminJobRequestAddPage',
    component: () => import('../views/admin/JobRequestAdd.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/admin/job-request-view/:id',
    name: 'AdminJobRequestViewPage',
    component: () => import('../views/admin/JobRequestView.vue'),
    beforeEnter: requireAuth
  },

  // Admin - Freight Forwarders
  {
    path: '/admin/forwarders',
    name: 'AdminForwardersPage',
    component: () => import('../views/admin/Forwarders.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/admin/forwarder-add',
    name: 'AdminForwarderAddPage',
    component: () => import('../views/admin/ForwarderAdd.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/admin/forwarder-edit/:tax_id',
    name: 'AdminForwarderEditPage',
    component: () => import('../views/admin/ForwarderEdit.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/admin/forwarder-view/:tax_id',
    name: 'AdminForwarderViewPage',
    component: () => import('../views/admin/ForwarderView.vue'),
    beforeEnter: requireAuth
  },

  // Admin - History
  {
    path: '/admin/history',
    name: 'AdminHistoryPage',
    component: () => import('../views/admin/History.vue'),
    beforeEnter: requireAuth
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
