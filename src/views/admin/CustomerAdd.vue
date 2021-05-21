<template>
  <Topnav :user="user" />
  <Sidenav :user="user" :activeIndex="sidenavActiveIndex" />

  <section class="section-full pull-right">
    <div class="container">
      <form action="/admin/customers" method="GET" @submit="onSubmit">

        <div class="section-header mb-4" data-aos="fade-up" data-aos-delay="0">
          <div class="btns mt-0">
            <a href="/admin/customers" class="btn color-gray h-color-01">
              <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
              ย้อนกลับ
            </a>
          </div>
          <div class="header-wrapper">
            <div class="text-container">
              <h6 class="h3">Add Product Owner</h6>
            </div>
            <div class="btns hide-mobile">
              <Button 
                type="submit" text="เพิ่ม" 
                classer="btn-color-01" :prepend="true" icon="plus-white.svg" 
              />
            </div>
            <div class="btns show-mobile">
              <Button type="submit" text="เพิ่ม" classer="btn-color-01 btn-sm" />
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
                type="select" label="คำนำหน้า *" 
                :value="dataset.prefix" @input="dataset.prefix = $event" 
                :options="[
                  { value: 'นาย', text: 'นาย' },
                  { value: 'นาง', text: 'นาง' },
                  { value: 'นางสาว', text: 'นางสาว' }
                ]"
              />
            </div>
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="text" label="ชื่อ *" placeholder="โปรดระบุ" 
                :value="dataset.firstname" @input="dataset.firstname = $event" 
                :errorText="isValidated && !dataset.firstname? 'กรุณาระบุ': ''" 
                :classer="isValidated && !dataset.firstname? 'error': ''" 
              />
            </div>
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="text" label="นามสกุล *" placeholder="โปรดระบุ" 
                :value="dataset.lastname" @input="dataset.lastname = $event" 
                :errorText="isValidated && !dataset.lastname? 'กรุณาระบุ': ''" 
                :classer="isValidated && !dataset.lastname? 'error': ''" 
              />
            </div>
            <div class="sep"></div>
            
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="text" label="เบอร์โทรศัพท์" placeholder="โปรดระบุ" 
                :value="dataset.phone" @input="dataset.phone = $event" 
              />
            </div>
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="file-image" label="รูปโปรไฟล์" 
              />
            </div>
            <div class="sep"></div>
            
            <div class="grid lg-60 md-80 sm-100">
              <FormGroup 
                type="textarea" label="ที่อยู่ *" placeholder="โปรดระบุ" 
                :value="dataset.address" @input="dataset.address = $event" 
                :errorText="isValidated && !dataset.address? 'กรุณาระบุ': ''" 
                :classer="isValidated && !dataset.address? 'error': ''" 
              />
            </div>
            <div class="sep"></div>
            
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="text" label="จังหวัด *" placeholder="โปรดระบุ" 
                :value="dataset.province" @input="dataset.province = $event" 
                :errorText="isValidated && !dataset.province? 'กรุณาระบุ': ''" 
                :classer="isValidated && !dataset.province? 'error': ''" 
              />
            </div>
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="text" label="รหัสไปรษณีย์ *" placeholder="โปรดระบุ" 
                :value="dataset.zipcode" @input="dataset.zipcode = $event" 
                :errorText="isValidated && !dataset.zipcode? 'กรุณาระบุ': ''" 
                :classer="isValidated && !dataset.zipcode? 'error': ''" 
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
                type="text" label="ชื่อผู้ใช้ *" placeholder="โปรดระบุ" 
                :value="dataset.username" @input="dataset.username = $event" 
                :errorText="isValidated && !dataset.username? 'กรุณาระบุ': ''" 
                :classer="isValidated && !dataset.username? 'error': ''" 
              />
            </div>
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="email" label="อีเมล *" placeholder="โปรดระบุ" 
                :value="dataset.email" @input="dataset.email = $event" 
                :errorText="isValidated && !dataset.email? 'กรุณาระบุ': ''" 
                :classer="isValidated && !dataset.email? 'error': ''" 
              />
            </div>
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="select" label="สถานะ" placeholder="โปรดเลือก" 
                :value="dataset.status" @input="dataset.status = $event" 
                :options="[
                  { value: 1, text: 'เปิดใช้งาน' },
                  { value: 0, text: 'ปิดใช้งาน' }
                ]"
              />
            </div>
            <div class="sep"></div>
            
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="password" label="รหัสผ่าน *" placeholder="โปรดระบุ" 
                :value="dataset.password" @input="dataset.password = $event" 
                :errorText="isValidated && !dataset.password? 'กรุณาระบุ': ''" 
                :classer="isValidated && !dataset.password? 'error': ''" 
              />
            </div>
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="password" label="ยืนยันรหัสผ่าน *" placeholder="โปรดระบุ" 
                :value="dataset.confPassword" @input="dataset.confPassword = $event" 
                :errorText="isValidated && !dataset.confPassword? 'กรุณาระบุ': ''" 
                :classer="isValidated && !dataset.confPassword? 'error': ''" 
              />
            </div>
          </div>
        </div>

      </form>
    </div>
  </section>
</template>

<script>
import Topnav from '../../components/Topnav';
import Sidenav from '../../components/Sidenav';

export default {
  name: 'AdminCustomerAddPage',
  components: {
    Topnav,
    Sidenav
  },
  data() {
    return {
      sidenavActiveIndex: 2,
      user: {
        id: 1,
        role: 'Admin', /* Product Owner, Company, Driver, Admin */
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
        firstname: '',
        lastname: '',
        phone: '',
        address: '',
        province: '',
        zipcode: '',
        
        username: '',
        email: '',
        password: '',
        confPassword: '',
        status: 1,
      }
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    document.getElementById('color_style').href = '/assets/css/color-admin.css';
  },
  methods: {
    onSubmit(e) {
      var that = this;
      that.isValidated = true;
      
      var isValid = true;
      [
        'prefix', 'firstname', 'lastname', 'address', 'province', 'zipcode',
        'username', 'email', 'password', 'confPassword'
      ].forEach(function(k){
        if(!that.dataset[k]){
          isValid = false;
        }
      });

      if(!isValid){
        e.preventDefault();
      }else{
        that.isValidated = false;
      }
    }
  }
}
</script>
