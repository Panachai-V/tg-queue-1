import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Home.vue'

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


  // Freight Forwarder
  {
    path: '/forwarder/dashboard',
    name: 'ForwarderDashboardPage',
    component: () => import('../views/forwarder/Dashboard.vue')
  },
  
  // Freight Forwarder - Job Requests
  {
    path: '/forwarder/job-requests/:tab?',
    name: 'ForwarderJobRequestsPage',
    component: () => import('../views/forwarder/JobRequests.vue')
  },
  {
    path: '/forwarder/job-request-add',
    name: 'ForwarderJobRequestAddPage',
    component: () => import('../views/forwarder/JobRequestAdd.vue')
  },
  {
    path: '/forwarder/job-request-view/:status?',
    name: 'ForwarderJobRequestViewPage',
    component: () => import('../views/forwarder/JobRequestView.vue')
  },
  
  // Freight Forwarder - Drivers
  {
    path: '/forwarder/drivers',
    name: 'ForwarderDriversPage',
    component: () => import('../views/forwarder/Drivers.vue')
  },
  {
    path: '/forwarder/driver-add',
    name: 'ForwarderDriverAddPage',
    component: () => import('../views/forwarder/DriverAdd.vue')
  },
  {
    path: '/forwarder/driver-edit',
    name: 'ForwarderDriverEditPage',
    component: () => import('../views/forwarder/DriverEdit.vue')
  },
  {
    path: '/forwarder/driver-view',
    name: 'ForwarderDriverViewPage',
    component: () => import('../views/forwarder/DriverView.vue')
  },


  // Driver - My Jobs
  {
    path: '/driver/my-jobs/:tab?',
    name: 'DriverMyJobsPage',
    component: () => import('../views/driver/MyJobs.vue')
  },
  {
    path: '/driver/my-job-view/:status?',
    name: 'DriverMyJobViewPage',
    component: () => import('../views/driver/MyJobView.vue')
  },


  // TG Admin Dashboard
  {
    path: '/tgadmin/dashboard',
    name: 'TGAdminDashboardPage',
    component: () => import('../views/tgadmin/Dashboard.vue')
  },

  // TG Admin - Job Requests
  {
    path: '/tgadmin/job-requests/:tab?',
    name: 'TGAdminJobRequestsPage',
    component: () => import('../views/tgadmin/JobRequests.vue')
  },
  {
    path: '/tgadmin/job-request-view/:status?',
    name: 'TGAdminJobRequestViewPage',
    component: () => import('../views/tgadmin/JobRequestView.vue')
  },


  // Admin Dashboard
  {
    path: '/admin',
    name: 'AdminDashboardPage',
    component: () => import('../views/admin/Dashboard.vue')
  },

  // Admin - Job Requests
  {
    path: '/admin/job-requests/:tab?',
    name: 'AdminJobRequestsPage',
    component: () => import('../views/admin/JobRequests.vue')
  },
  {
    path: '/admin/job-request-add',
    name: 'AdminJobRequestAddPage',
    component: () => import('../views/admin/JobRequestAdd.vue')
  },
  {
    path: '/admin/job-request-view/:status?',
    name: 'AdminJobRequestViewPage',
    component: () => import('../views/admin/JobRequestView.vue')
  },

  // Admin - Freight Forwarders
  {
    path: '/admin/forwarders',
    name: 'AdminForwardersPage',
    component: () => import('../views/admin/Forwarders.vue')
  },
  {
    path: '/admin/forwarder-add',
    name: 'AdminForwarderAddPage',
    component: () => import('../views/admin/ForwarderAdd.vue')
  },
  {
    path: '/admin/forwarder-edit',
    name: 'AdminForwarderEditPage',
    component: () => import('../views/admin/ForwarderEdit.vue')
  },
  {
    path: '/admin/forwarder-view',
    name: 'AdminForwarderViewPage',
    component: () => import('../views/admin/ForwarderView.vue')
  },

  // Admin - History
  {
    path: '/admin/history',
    name: 'AdminHistoryPage',
    component: () => import('../views/admin/History.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
