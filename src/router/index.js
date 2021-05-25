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
    path: '/admin/job-request-view',
    name: 'AdminJobRequestViewPage',
    component: () => import('../views/admin/JobRequestView.vue')
  },
  {
    path: '/admin/job-request-edit',
    name: 'AdminJobRequestEditPage',
    component: () => import('../views/admin/JobRequestEdit.vue')
  },
  {
    path: '/admin/job-request-assignment',
    name: 'AdminJobRequestAssignmentPage',
    component: () => import('../views/admin/JobRequestAssignment.vue')
  },
  {
    path: '/admin/job-request-tracking',
    name: 'AdminJobRequestTrackingPage',
    component: () => import('../views/admin/JobRequestTracking.vue')
  },
  {
    path: '/admin/job-request-result',
    name: 'AdminJobRequestResultPage',
    component: () => import('../views/admin/JobRequestResult.vue')
  },

  // Admin - Customers
  {
    path: '/admin/customers',
    name: 'AdminCustomersPage',
    component: () => import('../views/admin/Customers.vue')
  },
  {
    path: '/admin/customer-add',
    name: 'AdminCustomerAddPage',
    component: () => import('../views/admin/CustomerAdd.vue')
  },
  {
    path: '/admin/customer-view',
    name: 'AdminCustomerViewPage',
    component: () => import('../views/admin/CustomerView.vue')
  },
  {
    path: '/admin/customer-edit',
    name: 'AdminCustomerEditPage',
    component: () => import('../views/admin/CustomerEdit.vue')
  },

  // Admin - Companies
  {
    path: '/admin/companies',
    name: 'AdminCompaniesPage',
    component: () => import('../views/admin/Companies.vue')
  },
  {
    path: '/admin/company-add',
    name: 'AdminCompanyAddPage',
    component: () => import('../views/admin/CompanyAdd.vue')
  },
  {
    path: '/admin/company-edit',
    name: 'AdminCompanyEditPage',
    component: () => import('../views/admin/CompanyEdit.vue')
  },
  {
    path: '/admin/company-view',
    name: 'AdminCompanyViewPage',
    component: () => import('../views/admin/CompanyView.vue')
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
