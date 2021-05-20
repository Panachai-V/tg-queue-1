<template>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" />

  <section class="section-full">
    <div class="container">
      <div class="section-header mb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="btns mt-0">
          <a href="/customer/job-requests" class="btn color-gray h-color-01">
            <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
            ย้อนกลับ
          </a>
        </div>
        <div class="header-wrapper">
          <div class="text-container">
            <h6 class="h3">View Job Request</h6>
          </div>
        </div>
      </div>
      
      <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
        <p class="fw-400">ค่าขนส่งเสนอโดยบริษัท</p>
      </div>
      <div class="pb-2" data-aos="fade-up" data-aos-delay="150">
        <DataTable 
          :rows="rows" 
          :columns="[
            { key: 'companyName', text: 'ชื่อบริษัท' },
            { key: 'contactName', text: 'ชื่อผู้เสนอราคา' },
            { key: 'price', text: 'ราคา' },
            { key: 'createdDate', text: 'วันที่เสนอราคา' },
            { key: 'options', classer: 'options' }
          ]" 
          :search="[ 'companyName', 'contactName', 'price', 'createdDate' ]" 
          :orders="[
            { key: 'price-asc', text: 'ราคาที่เสนอ (ต่ำสุด)' },
            { key: 'price-desc', text: 'ราคาที่เสนอ (สูงสุด)' },
            { key: 'createdDate-desc', text: 'วันที่สร้าง (ใหม่สุด)' },
            { key: 'createdDate-asc', text: 'วันที่สร้าง (เก่าสุด)' }
          ]" 
          @click-view="(id)=>openDeliveryInfo(id)"
        />
      </div>

      <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
        <p class="fw-400">ข้อมูลทั่วไป</p>
      </div>
      <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
        <div class="grids">
          <div class="grid xl-1-3 lg-40 md-50 sm-80">
            <FormGroup type="plain" label="ชื่องาน" :value="dataset.name" />
          </div>
          <div class="grid xl-1-3 lg-40 md-50 sm-80">
            <FormGroup type="plain" label="วันที่รับสินค้า" :value="formatDate(dataset.pickupDate)" />
          </div>
          <div class="sep"></div>
          <div class="grid xl-2-3 lg-80 sm-100">
            <FormGroup type="plain" label="รายละเอียด" :value="dataset.desc" />
          </div>
        </div>
      </div>
      
      <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
        <p class="fw-400">สถานที่รับส่งสินค้า</p>
      </div>
      <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
        <div class="grids">
          <div class="grid lg-1-3 md-40 sm-80">
            <FormGroup type="plain" label="จังหวัดที่รับสินค้า" :value="dataset.fromProvince" />
          </div>
          <div class="grid lg-2-3 md-60 sm-100">
            <FormGroup type="plain" label="ที่อยู่รับสินค้า" :value="dataset.fromAddress" />
          </div>
          <div class="grid lg-1-3 md-40 sm-80">
            <FormGroup type="plain" label="จังหวัดที่ส่งสินค้า" :value="dataset.toProvince" />
          </div>
          <div class="grid lg-2-3 md-60 sm-100">
            <FormGroup type="plain" label="ที่อยู่ส่งสินค้า" :value="dataset.toAddress" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Popup View -->
  <div class="popup-container" :class="{ 'active': openedPopup }">
    <div class="wrapper">
      <div class="close-filter" @click="openedPopup = !openedPopup"></div>
      <form action="/customer/job-request-tracking" method="GET" class="w-full">
        <div class="popup-box">
          <div class="header">
            <div class="btns mt-0">
              <a href="javascript:" class="btn btn-close" @click="openedPopup = !openedPopup">
                <img class="icon-prepend xs" src="/assets/img/icon/close.svg" alt="Image Icon" />
                ปิดหน้าต่าง
              </a>
            </div>
            <div class="header-wrapper">
              <div class="text-container pr-2">
                <h6 class="h3">ข้อเสนอโดยบริษัท</h6>
              </div>
              <div class="btns hide-mobile">
                <Button 
                  type="submit" text="เลือก" 
                  classer="btn-color-01" :prepend="true" icon="check-white.svg" 
                />
                <Button 
                  text="ปิด" @click="openedPopup = !openedPopup" 
                  classer="btn-color-09 ml-2"
                />
              </div>
              <div class="btns show-mobile">
                <Button 
                  type="submit" text="เลือก" classer="btn-color-01 btn-sm" 
                />
                <Button 
                  text="ปิด" @click="openedPopup = !openedPopup" 
                  classer="btn-color-09 btn-sm ml-1"
                />
              </div>
            </div>
          </div>
          <div class="body">
            <div class="grids">
              <div class="grid sm-50">
                <FormGroup
                  type="plain" label="ชื่อบริษัท" :value="dataOffer.companyName"
                />
              </div>
              <div class="grid sm-50">
                <FormGroup
                  type="plain" label="ชื่อผู้เสนอราคา" :value="dataOffer.contactName"
                />
              </div>
              <div class="grid sm-50">
                <FormGroup
                  type="plain" label="ราคา" :value="formatPrice(dataOffer.price)+' บาท'"
                />
              </div>
              <div class="grid sm-50">
                <FormGroup
                  type="plain" label="วันที่เสนอราคา" :value="dataOffer.createdDate"
                />
              </div>
              <div class="grid sm-50">
                <SpecialCard03 
                  label="งานที่สำเร็จแล้ว" :count="48" unit="งาน" 
                  classer="sm no-hover"
                />
              </div>
              <div class="grid sm-50">
                <SpecialCard03 
                  label="ความพึงพอใจโดยรวม" :count="4.68" unit="/ 5" 
                  classer="sm no-hover"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>

  <Topnav :user="user" :activeIndex="topnavActiveIndex" :isBottom="true" />
</template>

<script>
import moment from 'moment';
import Topnav from '../../components/Topnav';
import DataTable from '../../components/DataTable';
import SpecialCard03 from '../../components/SpecialCard03';

export default {
  name: 'CustomerJobRequestViewPage',
  components: {
    Topnav,
    DataTable,
    SpecialCard03
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

      openedPopup: false,
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

      dataOffer: {
        companyName: 'บริษัท พีอาร์เดริเวรี่ จำกัด',
        contactName: 'นาย สมพล ใจกว้าง',
        price: 3000,
        createdDate: '20/05/2564 10:34 น.',
        driverName: null,
        truckDetail: null
      },

      rows: []
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    for(var i=0; i<3; i++){
      this.rows.push({
        companyName: { text: 'บริษัท พีอาร์เดริเวรี่ จำกัด' },
        contactName: { text: 'นาย สมพล ใจกว้าง' },
        price: { text: '3,000.00 บาท' },
        createdDate: { text: '20/05/2564 10:34 น.' },
        status: { type: 'tag', text: 'รอการตอบรับ' },
        options: {
          type: 'options',
          view: { type: 'emit', id: i+1 },
        }
      });
    }
  },
  methods: {
    formatPrice(value) {
      let val = (value/1).toFixed(2);
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    formatDate(value) {
      return moment(String(value)).format('DD/MM/YYYY');
    },
    openDeliveryInfo(id) {
      this.openedPopup = !this.openedPopup;
    }
  }
}
</script>
