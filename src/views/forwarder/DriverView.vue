<template>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" />

  <section class="section-full">
    <div class="container">

      <div class="section-header mb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="btns mt-0">
          <a href="/forwarder/drivers" class="btn color-gray h-color-01">
            <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
            ย้อนกลับ
          </a>
        </div>
        <div class="header-wrapper">
          <div class="text-container">
            <h6 class="h3">View Truck Driver</h6>
          </div>
          <div class="btns hide-mobile">
            <Button 
              text="ย้อนกลับ" href="/forwarder/drivers" classer="btn-color-08 ml-2"
            />
          </div>
          <div class="btns show-mobile">
            <Button 
              text="ย้อนกลับ" href="/forwarder/drivers" classer="btn-color-08 btn-sm ml-1"
            />
          </div>
        </div>
      </div>

      <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
        <p class="fw-400">ข้อมูลทั่วไป</p>
      </div>
      <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
        <div class="grids">
          <div class="grid xl-10 lg-15 md-20 sm-30 xs-50">
            <FormGroup 
              type="plain" label="คำนำหน้า" :value="dataset.detail.prefix"
            />
          </div>
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup 
              type="plain" label="ชื่อ" :value="dataset.detail.firstname"
            />
          </div>
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup 
              type="plain" label="นามสกุล" :value="dataset.detail.lastname"
            />
          </div>
          <div class="sep"></div>
          
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup 
              type="plain" label="เบอร์โทรศัพท์" :value="dataset.detail.phone"
            />
          </div>
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup 
              type="plain" label="รูปโปรไฟล์" value=""
            />
          </div>
          <div class="sep"></div>
          
          <div class="grid lg-60 md-80 sm-100">
            <FormGroup 
              type="plain" label="ที่อยู่" :value="dataset.detail.address"
            />
          </div>
          <div class="sep"></div>
          
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup 
              type="plain" label="จังหวัด" :value="dataset.detail.province" 
            />
          </div>
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup 
              type="plain" label="รหัสไปรษณีย์" :value="dataset.detail.zipcode" 
            />
          </div>
        </div>
      </div>
      
      <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
        <p class="fw-400">บัญชีผู้ใช้</p>
      </div>
      <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
        <div class="grids">
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup 
              type="plain" label="ชื่อผู้ใช้" :value="dataset.username" 
            />
          </div>
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup 
              type="plain" label="อีเมล" :value="dataset.email" 
            />
          </div>
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup 
              type="plain" label="สถานะ" :value="dataset.status? 'เปิดใช้งาน': 'ปิดใช้งาน'" 
            />
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
  name: 'ForwarderDriverViewPage',
  components: {
    Topnav
  },
  data() {
    return {
      topnavActiveIndex: 2,
      user: {
        id: 1,
        role: 'Freight Forwarder', /* Freight Forwarder, Driver, TG Admin, Admin */
        username: 'General User',
        email: 'user@gmail.com',
        avatar: '/assets/img/misc/profile.jpg',
        detail: {
          prefix: 'นาย',
          firstname: 'สมศักดิ์',
          lastname: 'จริงใจ',
          phone: '0811123456'
        },
        company: {
          name: 'บริษัท เอบีดีริเวรี่ จำกัด',
          address: '999 หมู่ 1 ตำบลหนองปรือ อำเภอบางพลี',
          province: 'สมุทรปราการ',
          zipcode: '10540',
          taxId: '500218893025'
        }
      },

      dataset: {
        id: null,
        role: 'Driver',
        username: 'Driver0001',
        email: 'driver@gmail.com',
        avatar: '/assets/img/misc/profile.jpg',
        detail: {
          prefix: 'นาย',
          firstname: 'จริงใจ',
          lastname: 'ใจมั่นคง',
          phone: '0912345678',
          address: '999 หมู่ 1 ตำบลหนองปรือ อำเภอบางพลี',
          province: 'สมุทรปราการ',
          zipcode: '10540'
        },
        password: '',
        confPassword: '',
        status: 1,
      }
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    console.log('params: ',this.$route.query.id)
  }
}
</script>
