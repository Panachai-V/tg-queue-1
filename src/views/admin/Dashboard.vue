<template>
  <Topnav :user="user" />
  <Sidenav :user="user" :activeIndex="sidenavActiveIndex" />

  <section class="section-full pull-right">
    <div class="container">
      <div class="section-header" data-aos="fade-up" data-aos-delay="0">
        <div class="btns mt-0">
          <a href="/admin/dashboard" class="btn color-gray h-color-01 disabled">
            <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
            ย้อนกลับ
          </a>
        </div>
        <div class="header-wrapper">
          <div class="text-container">
            <h6 class="h3">Dashboard</h6>
          </div>
        </div>
      </div>
      <div class="section-px section-py">

        <div data-aos="fade-up" data-aos-delay="150">
          <p class="fw-500 color-gray">ภาพรวม</p>
          <div class="grids grid-mt">
            <div class="grid xl-25 lg-1-3">
              <SpecialCard03 
                label="Job Requests รอการ Matching" :count="getDashboardOverview.state_0" unit="งาน" 
                classer="no-hover"
              />
            </div>
            <div class="grid xl-25 lg-1-3">
              <SpecialCard03 
                label="Job Requests รอการชำระเงิน" :count="getDashboardOverview.state_1" unit="งาน" 
                classer="no-hover"
              />
            </div>
            <div class="grid xl-25 lg-1-3">
              <SpecialCard03 
                label="Job Requests รอคิวการรับ" :count="getDashboardOverview.state_2" unit="งาน" 
                classer="no-hover"
              />
            </div>
            <div class="grid xl-25 lg-1-3">
              <SpecialCard03 
                label="Job Requests รอยืนยันคิว" :count="getDashboardOverview.state_3" unit="งาน" 
                classer="no-hover"
              />
            </div>
            <div class="sep"></div>
            <div class="grid xl-25 lg-1-3">
              <SpecialCard03 
                label="Job Requests ที่กำลังดำเนินการ" :count="getDashboardOverview.state_4" unit="งาน" 
                classer="no-hover"
              />
            </div>
            <div class="grid xl-25 lg-1-3">
              <SpecialCard03 
                label="Job Requests ที่ดำเนินการเสร็จสิ้น" :count="getDashboardOverview.state_5" unit="งาน" 
                classer="no-hover"
              />
            </div>
            <div class="sep"></div>
            
            <div class="grid xl-25 lg-1-3">
              <SpecialCard03 
                label="Total Freight Forwarders" :count="getDashboardOverview.company_count" unit="บริษัท" 
                classer="no-hover"
              />
            </div>
            <div class="grid xl-25 lg-1-3">
              <SpecialCard03 
                label="Total Freight Forwarder Accounts" :count="getDashboardOverview.ff_count" unit="คน" 
                classer="no-hover"
              />
            </div>
            <div class="grid xl-25 lg-1-3">
              <SpecialCard03 
                label="Total Truck Drivers" :count="getDashboardOverview.driver_count" unit="คน" 
                classer="no-hover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Topnav from '../../components/Topnav';
import Sidenav from '../../components/Sidenav';
import SpecialCard03 from '../../components/SpecialCard03';
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'AdminDashboardPage',
  components: {
    Topnav,
    Sidenav,
    SpecialCard03
  },
  data() {
    return {
      sidenavActiveIndex: 0,
      user: {
        id: 4,
        role: 'Admin', /* Freight Forwarder, Driver, TG Admin, Admin */
        username: 'Admin',
        email: 'admin@gmail.com',
        avatar: '/assets/img/misc/profile.jpg',
        detail: {
          prefix: 'นาย',
          firstname: 'สมศักดิ์',
          lastname: 'จริงใจ',
          phone: '0811123456'
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      getDashboardOverview: 'admin/getDashboardOverview',
    })
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    document.getElementById('color_style').href = '/assets/css/color-admin.css';

    this.fetchOverview()
  },
  methods: {
    ...mapActions({
      fetchOverview: 'admin/fetchOverview'
    })
  }
}
</script>
