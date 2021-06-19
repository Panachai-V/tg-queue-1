<template>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" />

  <section class="section-full">
    <div class="container">
      <form action="/forwarder/drivers" method="GET" @submit="onSubmit">

        <div class="section-header mb-4" data-aos="fade-up" data-aos-delay="0">
          <div class="btns mt-0">
            <a href="/forwarder/drivers" class="btn color-gray h-color-01">
              <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
              ย้อนกลับ
            </a>
          </div>
          <div class="header-wrapper">
            <div class="text-container">
              <h6 class="h3">Add Truck Driver</h6>
            </div>
            <div class="btns hide-mobile">
              <Button 
                type="submit" text="เพิ่ม" 
                classer="btn-color-01" :prepend="true" icon="plus-white.svg" 
              />
              <Button 
                text="ย้อนกลับ" href="/forwarder/drivers" classer="btn-color-08 ml-2"
              />
            </div>
            <div class="btns show-mobile">
              <Button type="submit" text="เพิ่ม" classer="btn-color-01 btn-sm" />
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
                type="select" label="คำนำหน้า *" :required="true" 
                :value="getSelfDriver.prefix" @input="getSelfDriver.prefix = $event" 
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
                :maxlength="64" :required="true" 
                :value="getSelfDriver.firstname" @input="getSelfDriver.firstname = $event" 
              />
            </div>
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="text" label="นามสกุล *" placeholder="โปรดระบุ" 
                :maxlength="64" :required="true" 
                :value="getSelfDriver.lastname" @input="getSelfDriver.lastname = $event" 
              />
            </div>
            <div class="sep"></div>
            
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="text" label="เบอร์โทรศัพท์ *" placeholder="โปรดระบุ" 
                :maxlength="10" :required="true" 
                :value="getSelfDriver.phone" @input="getSelfDriver.phone = $event" 
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
                :rows="3" :maxlength="128" :required="true" 
                :value="getSelfDriver.address" @input="getSelfDriver.address = $event" 
              />
            </div>
            <div class="sep"></div>
            
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="select" label="จังหวัด *" :required="true" placeholder="โปรดเลือก" 
                :value="getSelfDriver.province" 
                @input="getSelfDriver.province = $event" 
                :options="provinces"
              />
            </div>
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="text" label="รหัสไปรษณีย์ *" :required="true" 
                placeholder="โปรดระบุ" :minlength="5" :maxlength="5" 
                :value="getSelfDriver.zipcode" 
                @input="getSelfDriver.zipcode = $event" 
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
                type="text" label="ชื่อผู้ใช้ *" placeholder="โปรดระบุ" :required="true" 
                :value="getSelfDriver.username" @input="getSelfDriver.username = $event" 
              />
            </div>
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="email" label="อีเมล *" placeholder="โปรดระบุ" :required="true" 
                :value="getSelfDriver.email" @input="getSelfDriver.email = $event" 
              />
            </div>
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="select" label="สถานะ *" placeholder="โปรดเลือก" 
                :value="getSelfDriver.status" @input="getSelfDriver.status = $event" 
                :options="[
                  { value: true, text: 'เปิดใช้งาน' },
                  { value: false, text: 'ปิดใช้งาน' }
                ]"
              />
            </div>
            <div class="sep"></div>
            
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="password" label="รหัสผ่าน *" placeholder="โปรดระบุ" :required="true" 
                :value="getSelfDriver.password" @input="getSelfDriver.password = $event" 
              />
            </div>
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="password" label="ยืนยันรหัสผ่าน *" placeholder="โปรดระบุ" :required="true" 
                :value="getSelfDriver.confPassword" @input="getSelfDriver.confPassword = $event" 
              />
            </div>
          </div>
        </div>

      </form>
    </div>
  </section>

  <Topnav :user="user" :activeIndex="topnavActiveIndex" :isBottom="true" />
</template>

<script>
import Topnav from '../../components/Topnav';
import axios from 'axios';
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ForwarderDriverAddPage',
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
        username: '',
        email: '',
        avatar: '',
        detail: {
          prefix: 'นาย',
          firstname: '',
          lastname: '',
          phone: '',
          address: '',
          province: '',
          zipcode: ''
        },
        password: '',
        confPassword: '',
        status: 1,
      },
      provinces: []
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    const response = axios.get('master-module/province').then(response => {
      console.log('province: ', response.data)
      for(let i in response.data){
        this.provinces.push({ value: response.data[i].PROVINCE_NAME, text: response.data[i].PROVINCE_NAME })
      }
    });
  },
  computed: {
    ...mapGetters({
      getDetail: 'ff_driver/getDetail',
      getSelfDriver: 'ff_driver/getSelfDriver',
      loadingStatus: 'ff_driver/get_status'
    })
  },
  methods: {
    ...mapActions({
      driverDetail: 'ff_driver/driverDetail',
      editDriver: 'ff_driver/editDriver',
      deleteDriver: 'ff_driver/deleteDriver',
      createDriver: 'ff_driver/createDriver',
      loadingStatus: 'ff_driver/get_status'
    }),
    onSubmit() {
      this.createDriver().then(
        response => {
          console.log(response)
        }, error => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      )
    }
  }
}
</script>
