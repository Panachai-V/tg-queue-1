<template>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" />

  <section class="section-full">
    <div class="container">

      <div class="section-header mb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="btns mt-0">
          <a href="/company/job-requests" class="btn color-gray h-color-01">
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
        <p class="fw-400">การเสนอราคา</p>
      </div>
      <div data-aos="fade-up" data-aos-delay="150">
        <div v-if="dataOffer" class="pb-2">
          <DataTable 
            :rows="rows" :key="rows.length" 
            :columns="[
              { key: 'companyName', text: 'ชื่อบริษัท' },
              { key: 'contactName', text: 'ชื่อผู้เสนอราคา' },
              { key: 'price', text: 'ราคา' },
              { key: 'createdDate', text: 'วันที่เสนอราคา' },
              { key: 'options', classer: 'options' }
            ]" 
            :withOptions="false" 
            @click-view="(id)=>openDeliveryInfo(id)" 
            @click-edit="(id)=>openDeliveryEdit(id)" 
            @click-delete="(id)=>openDeliveryDelete(id)" 
          />
        </div>
        <div v-else class="section-px pt-2 pb-6">
          <form action="/" method="GET" @submit="onOfferSubmit">
            <div class="grids">
              <div class="grid xl-20 lg-25 mt-4">
                <FormGroup 
                  type="number" placeholder="ราคา" :min="0" :step="1" :required="true" 
                  @input="(event) => offerPrice = event"
                />
              </div>
              <div class="btns w-auto mt-4">
                <Button 
                  type="submit" text="เสนอราคา" 
                  classer="btn-color-01" :append="true" icon="send-white.svg" 
                />
              </div>
            </div>
          </form>
        </div>
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
  <div v-if="dataOffer" class="popup-container" :class="{ 'active': openedPopup }">
    <div class="wrapper">
      <div class="close-filter" @click="openedPopup = !openedPopup"></div>
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
                text="ปิด" @click="openedPopup = !openedPopup" 
                classer="btn-color-09 ml-2"
              />
            </div>
            <div class="btns show-mobile">
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
    </div>
  </div>

  <!-- Popup Edit -->
  <div v-if="dataOffer" class="popup-container" :class="{ 'active': openedPopupEdit }">
    <div class="wrapper">
      <div class="close-filter" @click="openedPopupEdit = !openedPopupEdit"></div>
      <form action="/" method="GET" class="w-full" @submit="onOfferEdit">
        <div class="popup-box">
          <div class="header">
            <div class="btns mt-0">
              <a href="javascript:" class="btn btn-close" @click="openedPopupEdit = !openedPopupEdit">
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
                  type="submit" text="บันทึก" 
                  classer="btn-color-01" :prepend="true" icon="check-white.svg" 
                />
                <Button 
                  text="ปิด" @click="openedPopupEdit = !openedPopupEdit" 
                  classer="btn-color-09 ml-2"
                />
              </div>
              <div class="btns show-mobile">
                <Button 
                  type="submit" text="บันทึก" classer="btn-color-01 btn-sm" 
                />
                <Button 
                  text="ปิด" @click="openedPopupEdit = !openedPopupEdit" 
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
                  type="number" label="ราคา" placeholder="ราคา" :min="0" :step="1"
                  :required="true" :value="offerPrice" @input="(event) => offerPrice = event"
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
  
  <!-- Popup Delete -->
  <div class="popup-container" :class="{ 'active': openedPopupDelete }">
    <div class="wrapper">
      <div class="close-filter" @click="openedPopupDelete = !openedPopupDelete"></div>
      <form action="/" method="GET" class="w-full" @submit="onSubmitDeliveryDelete">
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
import moment from 'moment';
import Topnav from '../../components/Topnav';
import DataTable from '../../components/DataTable';
import SpecialCard03 from '../../components/SpecialCard03';

export default {
  name: 'CompanyJobRequestViewPage',
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

      openedPopup: false,
      openedPopupEdit: false,
      openedPopupDelete: false,

      isValidated: false,
      dataset: {
        name: 'ขนส่งบรรจุภัณฑ์ทางการแพทย์',
        pickupDate: new Date(),
        desc: 'ขนส่งจาก TG Cargo มาที่บริษัทสาขาหลักตามที่อยู่',
        fromProvince: 'กรุงเทพมหานคร',
        fromAddress: 'Racha Thewa, Bang Phli District, Samut Prakan 10540',
        toProvince: 'กรุงเทพมหานคร',
        toAddress: 'Racha Thewa, Bang Phli District, Samut Prakan 10540',
        confPickupDate: null,
        confPickupTime: null,
      },

      offerPrice: null,
      dataOffer: null,
      rows: []
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    document.getElementById('color_style').href = '/assets/css/color-company.css';
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
    },
    openDeliveryEdit(id) {
      this.openedPopupEdit = !this.openedPopupEdit;
    },
    openDeliveryDelete(id) {
      this.openedPopupDelete = !this.openedPopupDelete;
    },
    onSubmitDeliveryDelete(e) {
      e.preventDefault();
      this.offerPrice = null;
      this.dataOffer = null;
      this.rows = [];
      this.openedPopupDelete = !this.openedPopupDelete;
    },

    onOfferSubmit(e) {
      e.preventDefault();
      this.dataOffer = {
        companyName: this.user.company,
        contactName: this.user.prefix+' '+this.user.firstname+' '+this.user.lastname,
        price: this.offerPrice,
        createdDate: '20/05/2564 10:34 น.',
        driverName: null,
        truckDetail: null
      };
      this.rows.push({
        companyName: { text: this.dataOffer.companyName },
        contactName: { text: this.dataOffer.contactName },
        price: { text: this.formatPrice(this.dataOffer.price)+' บาท' },
        createdDate: { text: this.dataOffer.createdDate },
        status: { type: 'tag', text: 'รอการตอบรับ' },
        options: {
          type: 'options',
          view: { type: 'emit', id: 1 },
          edit: { type: 'emit', id: 1 },
          delete: { type: 'emit', id: 1 }
        }
      });
    },
    onOfferEdit(e) {
      e.preventDefault();
      this.dataOffer.price =  this.offerPrice;
      this.rows[0].price.text = this.formatPrice(this.dataOffer.price)+' บาท';
      this.openedPopupEdit = !this.openedPopupEdit;
    }
  }
}
</script>
