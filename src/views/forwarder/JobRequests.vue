<template>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" />
  
  <section class="section-full">
    <div class="container">
      <div class="tab-container">
        <div class="section-header pb-0" data-aos="fade-up" data-aos-delay="0">
          <div class="btns mt-0">
            <a href="/forwarder/dashboard" class="btn color-gray h-color-01">
              <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
              ย้อนกลับ
            </a>
          </div>
          <div class="header-wrapper">
            <div class="text-container">
              <h6 class="h3">Job Requests</h6>
            </div>
            <div class="btns hide-mobile">
              <Button 
                text="สร้าง" href="/forwarder/job-request-add" 
                classer="btn-color-01" :prepend="true" icon="plus-white.svg" 
              />
            </div>
            <div class="btns show-mobile">
              <Button 
                text="สร้าง" href="/forwarder/job-request-add" 
                classer="btn-color-01 btn-sm" 
              />
            </div>
          </div>
          <Tabs01 
            :activeIndex="tabActiveIndex" 
            @clicked="tabActiveIndex = $event" 
            :tabs="[ 
              'รอการ Matching', 'รอการชำระเงิน', 'รอคิวการรับ',
              'รอยืนยันคิว', 'กำลังดำเนินการ', 'ดำเนินการเสร็จสิ้น'
            ]" 
          />
        </div>
        <div  class="tab-contents" data-aos="fade-up" data-aos-delay="150">
          <div v-if="tabActiveIndex == 0" class="tab-content" :class="{ 'active': tabActiveIndex == 0 }">
            <DataTable
              :tabActiveIndex="tabActiveIndex"
              :rows="getJobRequest0"
              :columns="[
                { key: 'awbNumber', text: 'Airway Bill' },
                { key: 'hwbSerialNumber', text: 'House Airway Bill' },
                { key: 'flightNumber', text: 'รหัสเที่ยวบิน' },
                { key: 'jobNumber', text: 'เลขที่งาน' },
                { key: 'customsEntryNumber', text: 'เลขที่ใบขนสินค้า' },
                { key: 'customsEntryNumberDate', text: 'วันที่ได้รับเลขที่ใบสินค้า' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 
                'awbNumber', 'hwbSerialNumber', 'flightNumber', 'jobNumber',
                'customsEntryNumber', 'customsEntryNumberDate'
              ]" 
              :orders="[
                { key: 'awbNumber-desc', text: 'Airway Bill (ใหม่สุด)' },
                { key: 'awbNumber-asc', text: 'Airway Bill (เก่าสุด)' },
                { key: 'hwbSerialNumber-desc', text: 'House Airway Bill (ใหม่สุด)' },
                { key: 'hwbSerialNumber-asc', text: 'House Airway Bill (เก่าสุด)' },
                { key: 'customsEntryNumber-desc', text: 'วันที่ได้รับเลขที่ใบสินค้า (ใหม่สุด)' },
                { key: 'customsEntryNumber-asc', text: 'วันที่ได้รับเลขที่ใบสินค้า (เก่าสุด)' }
              ]" 
            />
          </div>

          <div v-if="tabActiveIndex == 1" class="tab-content" :class="{ 'active': tabActiveIndex == 1 }">
            <DataTable
              :tabActiveIndex="tabActiveIndex"
              :rows="getJobRequest1" 
              :columns="[
                { key: 'awbNumber', text: 'Airway Bill' },
                { key: 'hwbSerialNumber', text: 'House Airway Bill' },
                { key: 'flightNumber', text: 'รหัสเที่ยวบิน' },
                { key: 'jobNumber', text: 'เลขที่งาน' },
                { key: 'customsEntryNumber', text: 'เลขที่ใบขนสินค้า' },
                { key: 'customsEntryNumberDate', text: 'วันที่ได้รับเลขที่ใบสินค้า' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 
                'awbNumber', 'hwbSerialNumber', 'flightNumber', 'jobNumber',
                'customsEntryNumber', 'customsEntryNumberDate'
              ]" 
              :orders="[
                { key: 'awbNumber-desc', text: 'Airway Bill (ใหม่สุด)' },
                { key: 'awbNumber-asc', text: 'Airway Bill (เก่าสุด)' },
                { key: 'hwbSerialNumber-desc', text: 'House Airway Bill (ใหม่สุด)' },
                { key: 'hwbSerialNumber-asc', text: 'House Airway Bill (เก่าสุด)' },
                { key: 'customsEntryNumberDate-desc', text: 'วันที่ได้รับเลขที่ใบสินค้า (ใหม่สุด)' },
                { key: 'customsEntryNumberDate-asc', text: 'วันที่ได้รับเลขที่ใบสินค้า (เก่าสุด)' }
              ]" 
            />
          </div>

          <div v-if="tabActiveIndex == 2" class="tab-content" :class="{ 'active': tabActiveIndex == 2 }">
            <DataTable 
              :tabActiveIndex="tabActiveIndex"
              :rows="getJobRequest2" 
              :columns="[
                { key: 'awbNumber', text: 'Airway Bill' },
                { key: 'hwbSerialNumber', text: 'House Airway Bill' },
                { key: 'flightNumber', text: 'รหัสเที่ยวบิน' },
                { key: 'flightDate', text: 'วันที่เที่ยวบิน' },
                { key: 'dockNumber', text: 'หมายเลขช่องจอด' },
                { key: 'pickupTime', text: 'เวลารับสินค้า' },
                { key: 'truckNumber', text: 'ทะเบียนรถ' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 
                'awbNumber', 'hwbSerialNumber', 'flightNumber', 'date',
                'dockNumber', 'pickupTime'
              ]" 
              :orders="[
                { key: 'dockNumber-desc', text: 'หมายเลขช่องจอด (ใหม่สุด)' },
                { key: 'dockNumber-asc', text: 'หมายเลขช่องจอด (เก่าสุด)' },
                { key: 'flightDate-desc', text: 'วันที่เที่ยวบิน (ใหม่สุด)' },
                { key: 'flightDate-asc', text: 'วันที่เที่ยวบิน (เก่าสุด)' },                
                { key: 'pickupTime-desc', text: 'เวลารับสินค้า (ใหม่สุด)' },
                { key: 'pickupTime-asc', text: 'เวลารับสินค้า (เก่าสุด)' }
              ]" 
            />
          </div>

         <div v-if="tabActiveIndex == 3" class="tab-content" :class="{ 'active': tabActiveIndex == 3 }">
            <DataTable 
              :tabActiveIndex="tabActiveIndex"
              :rows="getJobRequest3" 
              :columns="[
                { key: 'awbNumber', text: 'Airway Bill' },
                { key: 'hwbSerialNumber', text: 'House Airway Bill' },
                { key: 'flightNumber', text: 'รหัสเที่ยวบิน' },
                { key: 'date', text: 'วันที่เที่ยวบิน' },
                { key: 'dockNumber', text: 'หมายเลขช่องจอด' },
                { key: 'pickupTime', text: 'เวลารับสินค้า' },
                { key: 'truckNumber', text: 'ทะเบียนรถ' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 
                'awbNumber', 'hwbSerialNumber', 'flightNumber', 'date',
                'dockNumber', 'pickupTime'
              ]" 
              :orders="[
              { key: 'dockNumber-desc', text: 'หมายเลขช่องจอด (ใหม่สุด)' },
                { key: 'dockNumber-asc', text: 'หมายเลขช่องจอด (เก่าสุด)' },
                { key: 'date-desc', text: 'วันที่เที่ยวบิน (ใหม่สุด)' },
                { key: 'date-asc', text: 'วันที่เที่ยวบิน (เก่าสุด)' },                
                { key: 'pickupTime-desc', text: 'เวลารับสินค้า (ใหม่สุด)' },
                { key: 'pickupTime-asc', text: 'เวลารับสินค้า (เก่าสุด)' }
              ]" 
            />
          </div>

          <div v-if="tabActiveIndex == 4" class="tab-content" :class="{ 'active': tabActiveIndex == 4 }">
            <DataTable 
              :tabActiveIndex="tabActiveIndex"
              :rows="getJobRequest4" 
              :columns="[
                { key: 'awbNumber', text: 'Airway Bill' },
                { key: 'hwbSerialNumber', text: 'House Airway Bill' },
                { key: 'flightNumber', text: 'รหัสเที่ยวบิน' },
                { key: 'date', text: 'วันที่เที่ยวบิน' },
                { key: 'dockNumber', text: 'หมายเลขช่องจอด' },
                { key: 'pickupTime', text: 'เวลารับสินค้า' },
                { key: 'truckNumber', text: 'ทะเบียนรถ' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 
                'awbNumber', 'hwbSerialNumber', 'flightNumber', 'date',
                'dockNumber', 'pickupTime'
              ]" 
              :orders="[
                { key: 'dockNumber-desc', text: 'หมายเลขช่องจอด (ใหม่สุด)' },
                { key: 'dockNumber-asc', text: 'หมายเลขช่องจอด (เก่าสุด)' },
                { key: 'date-desc', text: 'วันที่เที่ยวบิน (ใหม่สุด)' },
                { key: 'date-asc', text: 'วันที่เที่ยวบิน (เก่าสุด)' },                
                { key: 'pickupTime-desc', text: 'เวลารับสินค้า (ใหม่สุด)' },
                { key: 'pickupTime-asc', text: 'เวลารับสินค้า (เก่าสุด)' }
              ]" 
            />
          </div>

          <div v-if="tabActiveIndex == 5" class="tab-content" :class="{ 'active': tabActiveIndex == 5 }">
            <DataTable 
              :tabActiveIndex="tabActiveIndex"
              :rows="getJobRequest5" 
              :columns="[
                { key: 'awbNumber', text: 'Airway Bill' },
                { key: 'hwbSerialNumber', text: 'House Airway Bill' },
                { key: 'flightNumber', text: 'รหัสเที่ยวบิน' },
                { key: 'date', text: 'วันที่เที่ยวบิน' },
                { key: 'dockNumber', text: 'หมายเลขช่องจอด' },
                { key: 'pickupTime', text: 'เวลารับสินค้า' },
                { key: 'truckNumber', text: 'ทะเบียนรถ' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 
                'awbNumber', 'hwbSerialNumber', 'flightNumber', 'date',
                'dockNumber', 'pickupTime'
              ]" 
              :orders="[
                { key: 'dockNumber-desc', text: 'หมายเลขช่องจอด (ใหม่สุด)' },
                { key: 'dockNumber-asc', text: 'หมายเลขช่องจอด (เก่าสุด)' },
                { key: 'date-desc', text: 'วันที่เที่ยวบิน (ใหม่สุด)' },
                { key: 'date-asc', text: 'วันที่เที่ยวบิน (เก่าสุด)' },
                { key: 'pickupTime-desc', text: 'เวลารับสินค้า (ใหม่สุด)' },
                { key: 'pickupTime-asc', text: 'เวลารับสินค้า (เก่าสุด)' }
              ]" 
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" :isBottom="true" />
</template>

<script>
import moment from 'moment';
import Topnav from '../../components/Topnav';
import Tabs01 from '../../components/Tabs01';
import DataTable from '../../components/DataTable-JobRequest';
import { mapState, mapGetters, mapActions } from 'vuex'
import {ConditionSelectViewJob} from '../../models/select-company';

export default {
  name: 'ForwarderJobRequestsPage',
  components: {
    Topnav,
    Tabs01,
    DataTable
  },
  computed: {

  },
  data() {
    return {
      topnavActiveIndex: 1,
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

      tabActiveIndex: this.$route.params.tab? Number(this.$route.params.tab)-1: 0,
      rows1: [],
      rows2: [],
      rows3: [],
      rows4: [],
      rows5: []
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });

    // เมื่อ click เลือก tab ของ job requests ใน freight-forwarder จะทำให้ข้อมูลทุกอย่างรีเป็นหน้า 1 ใน tab นั้นๆ
    let temp_condition = new ConditionSelectViewJob('1', '10', 'awbNumber', 'ascending', (this.tabActiveIndex).toString(), '')
    this.fetchJobRequest(temp_condition);
  },
  methods: {
    
    formatNumber(value, digits=2) {
      let val = (value/1).toFixed(digits);
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    formatDate(value, format='YYYYMMDD') {
      return moment(String(value)).format(format);
    },
    ...mapActions({
      fetchJobRequest: 'freight_forwarder/fetchJobRequest'
    })
  },
  computed: {
    ...mapGetters({
      getUser: 'auth/getUser',
      getLoadingStatus: 'freight_forwarder/getLoadingStatus',
      getJobRequest0: 'freight_forwarder/getJobRequest0',
      getJobRequest1: 'freight_forwarder/getJobRequest1',
      getJobRequest2: 'freight_forwarder/getJobRequest2',
      getJobRequest3: 'freight_forwarder/getJobRequest3',
      getJobRequest4: 'freight_forwarder/getJobRequest4',
      getJobRequest5: 'freight_forwarder/getJobRequest5',
      getFilterStatus: 'freight_forwarder/getFilterStatus',
    })
  },
  mounted() {

  },
  updated() {

  }
}
</script>
