<template>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" />

  <section class="section-full">
    <div class="container">
      <form action="/customer/job-requests" method="GET" @submit="onSubmit">

        <div class="section-header mb-4" data-aos="fade-up" data-aos-delay="0">
          <div class="btns mt-0">
            <a href="/customer/job-requests" class="btn color-gray h-color-01">
              <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
              ย้อนกลับ
            </a>
          </div>
          <div class="header-wrapper">
            <div class="text-container">
              <h6 class="h3">Edit Job Request</h6>
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
  
  <!-- Popup Delete -->
  <div class="popup-container" :class="{ 'active': openedPopupDelete }">
    <div class="wrapper">
      <div class="close-filter" @click="openedPopupDelete = !openedPopupDelete"></div>
      <form action="/customer/job-requests" method="GET" class="w-full">
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
  name: 'CustomerJobRequestEditPage',
  components: {
    Topnav
  },
  data() {
    return {
      topnavActiveIndex: 1,
      user: {
        id: 1,
        role: 'Product Owner', /* Product Owner, Company, Driver, Admin */
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
        name: 'ขนส่งบรรจุภัณฑ์ทางการแพทย์',
        desc: 'ขนส่งจาก TG Cargo มาที่บริษัทสาขาหลักตามที่อยู่',
        pickupDate: new Date(),
        fromProvince: 'กรุงเทพมหานคร',
        fromAddress: 'Racha Thewa, Bang Phli District, Samut Prakan 10540',
        toProvince: 'กรุงเทพมหานคร',
        toAddress: 'Racha Thewa, Bang Phli District, Samut Prakan 10540',
        confPickupDate: null,
        confPickupTime: null,
        qrCode: null,
      },
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
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
