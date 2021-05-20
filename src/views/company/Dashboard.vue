<template>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" />

  <section class="section-full">
    <div class="container">
      <div class="section-header" data-aos="fade-up" data-aos-delay="0">
        <div class="btns mt-0">
          <a href="/company/dashboard" class="btn color-gray h-color-01 disabled">
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
                label="Job Requests ที่เสนอราคา" :count="3" unit="งาน" 
                classer="no-hover"
              />
            </div>
            <div class="grid xl-25 lg-1-3">
              <SpecialCard03 
                label="Job Requests ที่กำลังดำเนินการ" :count="2" unit="งาน" 
                classer="no-hover"
              />
            </div>
            <div class="grid xl-25 lg-1-3">
              <SpecialCard03 
                label="Job Requests ที่ดำเนินการเสร็จสิ้น" :count="34" unit="งาน" 
                classer="no-hover"
              />
            </div>
            <div class="sep"></div>
            <div class="grid xl-25 lg-1-3">
              <SpecialCard03 
                label="ความพึงพอใจเฉลี่ย" :count="4.75" unit="/ 5" 
                classer="no-hover"
              />
            </div>
            <div class="grid xl-25 lg-1-3">
              <SpecialCard03 
                label="พนักงานในบริษัท" :count="8" unit="คน" 
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

export default {
  name: 'CompanyDashboardPage',
  components: {
    Topnav,
    SpecialCard03
  },
  data() {
    return {
      topnavActiveIndex: 0,
      user: {
        id: 1,
        role: 'Company', /* Product Owner, Company, Driver, Admin */
        company: 'บริษัท พีอาร์เดริเวรี่ จำกัด',
        username: 'General User',
        prefix: 'นาย',
        firstname: 'สมศักดิ์',
        lastname: 'จริงใจ',
        email: 'user@gmail.com',
        phone: '081-1123456',
        avatar: '/assets/img/misc/profile-01.svg'
      }
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    document.getElementById('color_style').href = '/assets/css/color-company.css';
  }
}
</script>
