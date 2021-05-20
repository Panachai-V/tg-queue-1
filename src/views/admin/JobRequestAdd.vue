<template>
  <Topnav :user="user" />
  <Sidenav :user="user" :activeIndex="sidenavActiveIndex" />

  <section class="section-full pull-right">
    <div class="container">
      <form action="/admin/job-requests" method="GET" @submit="onSubmit">

        <div class="section-header mb-4" data-aos="fade-up" data-aos-delay="0">
          <div class="btns mt-0">
            <a href="/admin/job-requests" class="btn color-gray h-color-01">
              <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
              ย้อนกลับ
            </a>
          </div>
          <div class="header-wrapper">
            <div class="text-container">
              <h6 class="h3">Add Job Request</h6>
            </div>
            <div class="btns hide-mobile">
              <Button 
                type="submit" text="สร้าง" 
                classer="btn-color-01" :prepend="true" icon="plus-white.svg" 
              />
            </div>
            <div class="btns show-mobile">
              <Button type="submit" text="สร้าง" classer="btn-color-01 btn-sm" />
            </div>
          </div>
        </div>

        <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
          <p class="fw-400">ข้อมูลทั่วไป</p>
        </div>
        <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
          <div class="grids">
            <div class="grid xl-1-3 lg-40 md-50 sm-80">
              <FormGroup 
                type="text" label="ชื่องาน *" placeholder="โปรดระบุ" 
                :value="dataset.name" @input="dataset.name = $event" 
                :errorText="isValidated && !dataset.name? 'กรุณาระบุ': ''" 
                :classer="isValidated && !dataset.name? 'error': ''" 
              />
            </div>
            <div class="grid xl-1-3 lg-40 md-50 sm-80">
              <FormGroup 
                type="datepicker" label="วันที่รับสินค้า *" placeholder="โปรดระบุ" 
                wrapperClass="append" :append="true" icon="calendar.svg" 
                :value="dataset.pickupDate" @input="dataset.pickupDate = $event" 
                :errorText="isValidated && !dataset.pickupDate? 'กรุณาระบุ': ''" 
                :classer="isValidated && !dataset.pickupDate? 'error': ''"
              />
            </div>
            <div class="sep"></div>
            <div class="grid xl-2-3 lg-80 sm-100">
              <FormGroup 
                type="textarea" label="รายละเอียด *" placeholder="โปรดระบุ" 
                :value="dataset.desc" @input="dataset.desc = $event" 
                :errorText="isValidated && !dataset.desc? 'กรุณาระบุ': ''" 
                :classer="isValidated && !dataset.desc? 'error': ''" 
              />
            </div>
          </div>
        </div>
        
        <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
          <p class="fw-400">สถานที่รับส่งสินค้า</p>
        </div>
        <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
          <div class="grids">
            <div class="grid lg-1-3 md-40 sm-80">
              <FormGroup 
                type="select" label="จังหวัดที่รับสินค้า *" 
                :value="dataset.fromProvince" @input="dataset.fromProvince = $event" 
                :errorText="isValidated && !dataset.fromProvince? 'กรุณาระบุ': ''" 
                :classer="isValidated && !dataset.fromProvince? 'error': ''" 
                :options="[
                  { value: 'กรุงเทพมหานคร', text: 'กรุงเทพมหานคร' },
                  { value: 'ลพบุรี', text: 'ลพบุรี' }
                ]"
              />
            </div>
            <div class="grid lg-2-3 md-60 sm-100">
              <FormGroup 
                type="textarea" label="ที่อยู่รับสินค้า *" placeholder="โปรดระบุ" 
                :value="dataset.fromAddress" @input="dataset.fromAddress = $event" 
                :errorText="isValidated && !dataset.fromAddress? 'กรุณาระบุ': ''" 
                :classer="isValidated && !dataset.fromAddress? 'error': ''" 
              />
            </div>
            <div class="grid lg-1-3 md-40 sm-80">
              <FormGroup 
                type="select" label="จังหวัดที่ส่งสินค้า *" 
                :value="dataset.toProvince" @input="dataset.toProvince = $event" 
                :errorText="isValidated && !dataset.toProvince? 'กรุณาระบุ': ''" 
                :classer="isValidated && !dataset.toProvince? 'error': ''" 
                :options="[
                  { value: 'กรุงเทพมหานคร', text: 'กรุงเทพมหานคร' },
                  { value: 'ลพบุรี', text: 'ลพบุรี' }
                ]"
              />
            </div>
            <div class="grid lg-2-3 md-60 sm-100">
              <FormGroup 
                type="textarea" label="ที่อยู่ส่งสินค้า *" placeholder="โปรดระบุ" 
                :value="dataset.toAddress" @input="dataset.toAddress = $event" 
                :errorText="isValidated && !dataset.toAddress? 'กรุณาระบุ': ''" 
                :classer="isValidated && !dataset.toAddress? 'error': ''" 
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
  name: 'AdminJobRequestAddPage',
  components: {
    Topnav,
    Sidenav
  },
  data() {
    return {
      sidenavActiveIndex: 1,
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
        name: '',
        desc: '',
        pickupDate: new Date(),
        fromProvince: '',
        fromAddress: '',
        toProvince: '',
        toAddress: '',
        confPickupDate: null,
        confPickupTime: null,
        qrCode: null,
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
        'name', 'pickupDate', 'desc', 
        'fromProvince', 'fromAddress', 'toProvince', 'toAddress'
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
