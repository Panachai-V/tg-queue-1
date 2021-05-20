<template>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" />

  <section class="section-full">
    <div class="container">
      <div class="section-header mb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="btns mt-0">
          <a href="/company/drivers" class="btn color-gray h-color-01">
            <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
            ย้อนกลับ
          </a>
        </div>
        <div class="header-wrapper">
          <div class="text-container">
            <h6 class="h3">View Truck Driver</h6>
          </div>
        </div>
      </div>

      <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
        <p class="fw-400">ข้อมูลทั่วไป</p>
      </div>
      <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
        <div class="grids">
          <div class="grid xl-10 lg-15 md-20 sm-30 xs-50">
            <FormGroup type="plain" label="คำนำหน้า" :value="dataset.prefix" />
          </div>
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="ชื่อ" :value="dataset.firstname" />
          </div>
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="นามสกุล" :value="dataset.lastname" />
          </div>
          <div class="sep"></div>
          
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="เบอร์โทรศัพท์" :value="dataset.phone" />
          </div>
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="รูปโปรไฟล์" />
          </div>
          <div class="sep"></div>
          
          <div class="grid lg-60 md-80 sm-100">
            <FormGroup type="plain" label="ที่อยู่" :value="dataset.address" />
          </div>
          <div class="sep"></div>
          
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="จังหวัด" :value="dataset.province" />
          </div>
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="รหัสไปรษณีย์" :value="dataset.zipcode" />
          </div>
        </div>
      </div>
      
      <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
        <p class="fw-400">บัญชีผู้ใช้</p>
      </div>
      <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
        <div class="grids">
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="ชื่อผู้ใช้" :value="dataset.username" />
          </div>
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="อีเมล" :value="dataset.email" />
          </div>
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="สถานะ" :value="dataset.status? 'เปิดใช้งาน': 'ปิดใช้งาน'" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <Topnav :user="user" :activeIndex="topnavActiveIndex" :isBottom="true" />
</template>

<script>
import Topnav from '../../components/Topnav';

export default {
  name: 'CompanyDriverViewPage',
  components: {
    Topnav
  },
  data() {
    return {
      topnavActiveIndex: 3,
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
        avatar: '/assets/img/misc/profile.jpg'
      },

      isValidated: false,
      dataset: {
        prefix: 'นาย',
        firstname: 'จริงใจ',
        lastname: 'ใจมั่นคง',
        phone: '091-234 5678',
        address: 'Racha Thewa, Bang Phli District',
        province: 'Samut Prakan',
        zipcode: '10540',
        
        username: 'User0001',
        email: 'employee@gmail.com',
        password: '',
        confPassword: '',
        statue: 1,
      }
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    document.getElementById('color_style').href = '/assets/css/color-company.css';
  }
}
</script>
