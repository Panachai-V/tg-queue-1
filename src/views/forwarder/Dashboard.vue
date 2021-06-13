y<template>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" />

  <section class="section-full">
    <div class="container">
      <div class="section-header" data-aos="fade-up" data-aos-delay="0">
        <div class="btns mt-0">
          <a href="/forwarder/dashboard" class="btn color-gray h-color-01 disabled">
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
                label="Job Requests รอการ Matching" :count="getOverviewCompany.state_1" unit="งาน" 
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
import UserService from '../../services/user.service';
import CompanyService from '../../services/company.service';
import {mapGetters, mapActions, mapState} from "vuex"

export default {
  name: 'ForwarderDashboardPage',
  components: {
    Topnav,
    SpecialCard03
  },
  
  data() {
    return {
      topnavActiveIndex: 0,
      user: {
        id: 1,
        role: '', /* Freight Forwarder, Driver, TG Admin, Admin */
        username: '',
        email: '',
        avatar: '/assets/img/misc/profile.jpg',
        detail: {
          prefix: '',
          firstname: '',
          lastname: '',
          phone: ''
        },
        company: {
          name: '',
          address: '',
          province: '',
          zipcode: '',
          taxId: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      getOverviewCompany: 'freight_forwarder/getOverviewComapny',
    })
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });

    this.fetchOverview()
  },
  mounted() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
  },
  methods: {
    ...mapActions({
      fetchOverview: 'freight_forwarder/fetchOverview'
    })
  }
}
</script>
