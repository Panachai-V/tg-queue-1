<template>
  <nav v-if="isAdmin()" class="sidenav" :class="{ 'active': isActive }">
    <div class="wrapper">
      <div class="filter" @click="isActive = !isActive"></div>
      <div class="menu-container">
        <div class="btn-toggle" @click="isActive = !isActive">
          <div class="hamburger sm" :class="{ 'active': isActive }">
            <div></div><div></div><div></div>
          </div>
        </div>
        <div class="scroll-wrapper">

          <div class="menu" :class="{ 'active': activeIndex==0 }">
            <a href="/admin">
              <div class="icon">
                <img src="/assets/img/icon/dashboard-admin.svg" alt="Image Icon" />
              </div>
              <div class="text">Dashboard</div>
            </a>
          </div>
          <div class="menu" :class="{ 'active': activeIndex==1 }">
            <a href="/admin/job-requests">
              <div class="icon">
                <img src="/assets/img/icon/request-admin.svg" alt="Image Icon" />
              </div>
              <div class="text">Job Requests</div>
            </a>
          </div>
          <div class="menu" :class="{ 'active': activeIndex==2 }">
            <a href="/admin/customers">
              <div class="icon">
                <img src="/assets/img/icon/users-admin.svg" alt="Image Icon" />
              </div>
              <div class="text">Product Owners</div>
            </a>
          </div>
          <div class="menu" :class="{ 'active': activeIndex==3 }">
            <a href="/admin/companies">
              <div class="icon">
                <img src="/assets/img/icon/user-settings-admin.svg" alt="Image Icon" />
              </div>
              <div class="text">Companies</div>
            </a>
          </div>
          <!-- <div class="menu" :class="{ 'active': activeIndex==4 }">
            <a href="/admin/records">
              <div class="icon">
                <img src="/assets/img/icon/history-admin.svg" alt="Image Icon" />
              </div>
              <div class="text">History</div>
            </a>
          </div> -->
          
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Sidenav',
  props: {
    user: { type: Object, default: null },
    company: { type: Object, default: null },
    activeIndex: { type: Number, default: null }
  },
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    isAdmin() {
      if(this.user && this.user.role == 'Admin'){
        return true;
      }else{
        return false;
      }
    }
  }
}
</script>
