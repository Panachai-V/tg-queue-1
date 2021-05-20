<template>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" />

  <section class="section-full">
    <div class="container">
      <form action="/company/drivers" method="GET" @submit="onSubmit">

        <div class="section-header mb-4" data-aos="fade-up" data-aos-delay="0">
          <div class="btns mt-0">
            <a href="/company/drivers" class="btn color-gray h-color-01">
              <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
              ย้อนกลับ
            </a>
          </div>
          <div class="header-wrapper">
            <div class="text-container">
              <h6 class="h3">Edit Truck Driver</h6>
            </div>
            <div class="btns hide-mobile">
              <Button 
                text="ลบ" href="javascript:" @click="openedPopupDelete = !openedPopupDelete" 
                classer="btn-color-06 mr-2" :prepend="true" icon="close-white.svg" 
              />
              <Button 
                type="submit" text="แก้ไข" 
                classer="btn-color-01" :prepend="true" icon="check-white.svg" 
              />
            </div>
            <div class="btns show-mobile">
              <Button 
                text="ลบ" href="javascript:" @click="openedPopupDelete = !openedPopupDelete" 
                classer="btn-color-06 btn-sm mr-1" 
              />
              <Button type="submit" text="แก้ไข" classer="btn-color-01 btn-sm" />
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
                type="password" label="รหัสผ่าน" placeholder="โปรดระบุ" 
                :value="dataset.password" @input="dataset.password = $event" 
              />
            </div>
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="password" label="ยืนยันรหัสผ่าน" placeholder="โปรดระบุ" 
                :value="dataset.confPassword" @input="dataset.confPassword = $event" 
              />
            </div>
          </div>
        </div>

      </form>
    </div>
  </section>
  
  <!-- Popup Delete -->
  <div class="popup-container" :class="{ 'active': openedPopupDelete }">
    <div class="wrapper">
      <div class="close-filter" @click="openedPopupDelete = !openedPopupDelete"></div>
      <form action="/company/drivers" method="GET" class="w-full">
        <div class="popup-box">
          <div class="header">
            <div class="btns mt-0">
              <a href="javascript:" class="btn btn-close" @click="openedPopupDelete = !openedPopupDelete">
                <img class="icon-prepend xs" src="/assets/img/icon/close.svg" alt="Image Icon" />
                ปิดหน้าต่าง
              </a>
            </div>
            <div class="header-wrapper">
              <div class="text-container">
                <h6 class="h3">ยืนยันการลบ</h6>
              </div>
              <div class="btns hide-mobile">
                <Button 
                  type="submit" text="ลบ" classer="btn-color-06 mr-2" 
                  :prepend="true" icon="close-white.svg" 
                />
                <Button 
                  text="ปิด" href="javascript:" classer="btn-color-08" 
                  @click="openedPopupDelete = !openedPopupDelete"
                />
              </div>
              <div class="btns show-mobile">
                <Button 
                  type="submit" text="ลบ" classer="btn-color-06 btn-sm mr-1" 
                />
                <Button 
                  text="ปิด" href="javascript:" classer="btn-color-08 btn-sm" 
                  @click="openedPopupDelete = !openedPopupDelete"
                />
              </div>
            </div>
          </div>
          <div class="body pt-4 pb-5">
            <p class="color-gray">หมายเหตุ</p>
            <p class="mt-2">
              หมายเลขประจำตัวผู้ป่วยที่คุณค้นหาอาจจะ ไม่ถูกต้อง คุณสามารถ “ปิดหน้าต่าง” 
              เพื่อระบุหมายเลขประจำตัวผู้ป่วยใหม่อีกครั้ง หรือ ผู้ป่วยที่คุณต้องการหา อาจจะ ไม่มีข้อมูลในระบบ 
              คุณสามารถเพิ่มข้อมูลผู้ป่วยใหม่ โดยการคลิกที่ปุ่ม “เพิ่มข้อมูล”
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>

  <Topnav :user="user" :activeIndex="topnavActiveIndex" :isBottom="true" />
</template>

<script>
import Topnav from '../../components/Topnav';

export default {
  name: 'CompanyDriverEditPage',
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

      openedPopupDelete: false,
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
        status: 1,
      }
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    document.getElementById('color_style').href = '/assets/css/color-company.css';
  },
  methods: {
    onSubmit(e) {
      var that = this;
      that.isValidated = true;
      
      var isValid = true;
      [
        'prefix', 'firstname', 'lastname', 'address', 'province', 'zipcode',
        'username', 'email'
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
