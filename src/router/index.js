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


  // Customer Dashboard
  {
    path: '/customer/dashboard',
    name: 'CustomerDashboardPage',
    component: () => import('../views/customer/Dashboard.vue')
  },

  // Customer - Job Requests
  {
    path: '/customer/job-requests/:tab?',
    name: 'CustomerJobRequestsPage',
    component: () => import('../views/customer/JobRequests.vue')
  },
  {
    path: '/customer/job-request-add',
    name: 'CustomerJobRequestAddPage',
    component: () => import('../views/customer/JobRequestAdd.vue')
  },
  {
    path: '/customer/job-request-edit',
    name: 'CustomerJobRequestEditPage',
    component: () => import('../views/customer/JobRequestEdit.vue')
  },
  {
    path: '/customer/job-request-view',
    name: 'CustomerJobRequestViewPage',
    component: () => import('../views/customer/JobRequestView.vue')
  },
  {
    path: '/customer/job-request-tracking',
    name: 'CustomerJobRequestTrackingPage',
    component: () => import('../views/customer/JobRequestTracking.vue')
  },
  {
    path: '/customer/job-request-result',
    name: 'CustomerJobRequestResultPage',
    component: () => import('../views/customer/JobRequestResult.vue')
  },


  // Company Dashboard
  {
    path: '/company/dashboard',
    name: 'CompanyDashboardPage',
    component: () => import('../views/company/Dashboard.vue')
  },

  // Company - Job Requests
  {
    path: '/company/job-requests/:tab?',
    name: 'CompanyJobRequestsPage',
    component: () => import('../views/company/JobRequests.vue')
  },
  {
    path: '/company/job-request-view',
    name: 'CompanyJobRequestViewPage',
    component: () => import('../views/company/JobRequestView.vue')
  },

  // Company - My Jobs
  {
    path: '/company/my-jobs/:tab?',
    name: 'CompanyMyJobsPage',
    component: () => import('../views/company/MyJobs.vue')
  },
  {
    path: '/company/my-job-assignment',
    name: 'CompanyMyJobAssignmentPage',
    component: () => import('../views/company/MyJobAssignment.vue')
  },
  {
    path: '/company/my-job-tracking',
    name: 'CompanyMyJobTrackingPage',
    component: () => import('../views/company/MyJobTracking.vue')
  },
  {
    path: '/company/my-job-result',
    name: 'CompanyMyJobResultPage',
    component: () => import('../views/company/MyJobResult.vue')
  },

  // Company - Drivers
  {
    path: '/company/drivers',
    name: 'CompanyDriversPage',
    component: () => import('../views/company/Drivers.vue')
  },
  {
    path: '/company/driver-add',
    name: 'CompanyDriverAddPage',
    component: () => import('../views/company/DriverAdd.vue')
  },
  {
    path: '/company/driver-view',
    name: 'CompanyDriverViewPage',
    component: () => import('../views/company/DriverView.vue')
  },
  {
    path: '/company/driver-edit',
    name: 'CompanyDriverEditPage',
    component: () => import('../views/company/DriverEdit.vue')
  },


  // Driver - My Jobs
  {
    path: '/driver/my-jobs/:tab?',
    name: 'DriverMyJobsPage',
    component: () => import('../views/driver/MyJobs.vue')
  },
  {
    path: '/driver/my-job-tracking',
    name: 'DriverMyJobTrackingPage',
    component: () => import('../views/driver/MyJobTracking.vue')
  },
  {
    path: '/driver/my-job-result',
    name: 'DriverMyJobResultPage',
    component: () => import('../views/driver/MyJobResult.vue')
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

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
