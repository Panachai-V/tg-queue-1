<template>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" />

  <section class="section-full">
    <div class="container">
      <div class="section-header" data-aos="fade-up" data-aos-delay="0">
        <div class="btns mt-0">
          <a href="/tgadmin/dashboard" class="btn color-gray h-color-01 disabled">
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
                label="Job Requests รอการ Matching" :count="getOverviewCompany.state_0" unit="งาน" 
                classer="no-hover"
              />
            </div>
            <div class="grid xl-25 lg-1-3">
              <SpecialCard03 
                label="Job Requests รอการจ่ายเงิน" :count="getOverviewCompany.state_1" unit="งาน" 
                classer="no-hover"
              />
            </div>
            <div class="grid xl-25 lg-1-3">
              <SpecialCard03 
                label="Job Requests รอคิวการรับ" :count="getOverviewCompany.state_2" unit="งาน" 
                classer="no-hover"
              />
            </div>
            <div class="grid xl-25 lg-1-3">
              <SpecialCard03 
                label="Job Requests รอยืนยันคิว" :count="getOverviewCompany.state_3" unit="งาน" 
                classer="no-hover"
              />
            </div>
            <div class="sep"></div>
            <div class="grid xl-25 lg-1-3">
              <SpecialCard03 
                label="Job Requests ที่กำลังดำเนินการ" :count="getOverviewCompany.state_4" unit="งาน" 
                classer="no-hover"
              />
            </div>
            <div class="grid xl-25 lg-1-3">
              <SpecialCard03 
                label="Job Requests ที่ดำเนินการเสร็จสิ้น" :count="getOverviewCompany.state_5" unit="งาน" 
                classer="no-hover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Topnav :user="user" :activeIndex="topnavActiveIndex" :isBottom="true" />
</template>

<script>
import Topnav from '../../components/Topnav';
import SpecialCard03 from '../../components/SpecialCard03';
import {mapGetters, mapActions, mapState} from "vuex"

export default {
  name: 'TGAdminDashboardPage',
  components: {
    Topnav,
    SpecialCard03
  },
  data() {
    return {
      topnavActiveIndex: 0,
      user: {
        id: 3,
        role: 'TG Admin', /* Freight Forwarder, Driver, TG Admin, Admin */
        subrole: null,
        username: 'TG Admin',
        email: 'tg-admin@gmail.com',
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
  created() {
    this.fetchOverview()
  },
  computed: {
    ...mapGetters({
      getOverviewCompany: 'tgAdmin/getOverviewComapny',
    })
  },
  mounted() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    document.getElementById('color_style').href = '/assets/css/color-company.css';
  },
  methods: {
    ...mapActions({
      fetchOverview: 'tgAdmin/fetchOverview'
    })
  }
}
</script>
