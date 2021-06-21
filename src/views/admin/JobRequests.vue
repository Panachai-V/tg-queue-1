<template>
  <Topnav :user="user" />
  <Sidenav :user="user" :activeIndex="sidenavActiveIndex" />

  <section class="section-full pull-right">
    <div class="container">
      <div class="tab-container">
        <div class="section-header pb-0" data-aos="fade-up" data-aos-delay="0">
          <div class="btns mt-0">
            <a href="/admin/dashboard" class="btn color-gray h-color-01">
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
                text="สร้าง" href="/admin/job-request-add" 
                classer="btn-color-01" :prepend="true" icon="plus-white.svg" 
              />
            </div>
            <div class="btns show-mobile">
              <Button 
                text="สร้าง" href="/admin/job-request-add" 
                classer="btn-color-01 btn-sm" 
              />
            </div>
          </div>
          <Tabs01 
            :activeIndex="tabActiveIndex" 
            @clicked="tabActiveIndex = $event" 
            :tabs="[ 
              'รอการ Matching', 'รอคิวการรับ', 'รอยืนยันคิว',
              'กำลังดำเนินการ', 'ดำเนินการเสร็จสิ้น'
            ]" 
          />
        </div>
        <div class="tab-contents" data-aos="fade-up" data-aos-delay="150">

          <div class="tab-content" :class="{ 'active': tabActiveIndex == 0 }">
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
                { key: 'customsEntryNumberDate-desc', text: 'วันที่ได้รับเลขที่ใบสินค้า (ใหม่สุด)' },
                { key: 'customsEntryNumberDate-asc', text: 'วันที่ได้รับเลขที่ใบสินค้า (เก่าสุด)' }
              ]" 
            />
          </div>

          <div class="tab-content" :class="{ 'active': tabActiveIndex == 1 }">
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

          <div class="tab-content" :class="{ 'active': tabActiveIndex == 2 }">
            <DataTable 
              :tabActiveIndex="tabActiveIndex"
              :rows="getJobRequest2" 
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
                { key: 'date-desc', text: 'วันที่เที่ยวบิน (ใหม่สุด)' },
                { key: 'date-asc', text: 'วันที่เที่ยวบิน (เก่าสุด)' },
                { key: 'dockNumber-desc', text: 'หมายเลขช่องจอด (ใหม่สุด)' },
                { key: 'dockNumber-asc', text: 'หมายเลขช่องจอด (เก่าสุด)' },
                { key: 'pickupTime-desc', text: 'เวลารับสินค้า (ใหม่สุด)' },
                { key: 'pickupTime-asc', text: 'เวลารับสินค้า (เก่าสุด)' }
              ]" 
            />
          </div>

         <div class="tab-content" :class="{ 'active': tabActiveIndex == 3 }">
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
                { key: 'date-desc', text: 'วันที่เที่ยวบิน (ใหม่สุด)' },
                { key: 'date-asc', text: 'วันที่เที่ยวบิน (เก่าสุด)' },
                { key: 'dockNumber-desc', text: 'หมายเลขช่องจอด (ใหม่สุด)' },
                { key: 'dockNumber-asc', text: 'หมายเลขช่องจอด (เก่าสุด)' },
                { key: 'pickupTime-desc', text: 'เวลารับสินค้า (ใหม่สุด)' },
                { key: 'pickupTime-asc', text: 'เวลารับสินค้า (เก่าสุด)' }
              ]" 
            />
          </div>

          <div class="tab-content" :class="{ 'active': tabActiveIndex == 4 }">
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
                { key: 'date-desc', text: 'วันที่เที่ยวบิน (ใหม่สุด)' },
                { key: 'date-asc', text: 'วันที่เที่ยวบิน (เก่าสุด)' },
                { key: 'dockNumber-desc', text: 'หมายเลขช่องจอด (ใหม่สุด)' },
                { key: 'dockNumber-asc', text: 'หมายเลขช่องจอด (เก่าสุด)' },
                { key: 'pickupTime-desc', text: 'เวลารับสินค้า (ใหม่สุด)' },
                { key: 'pickupTime-asc', text: 'เวลารับสินค้า (เก่าสุด)' }
              ]" 
            />
          </div>

          <div class="tab-content" :class="{ 'active': tabActiveIndex == 5 }">
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
                { key: 'date-desc', text: 'วันที่เที่ยวบิน (ใหม่สุด)' },
                { key: 'date-asc', text: 'วันที่เที่ยวบิน (เก่าสุด)' },
                { key: 'dockNumber-desc', text: 'หมายเลขช่องจอด (ใหม่สุด)' },
                { key: 'dockNumber-asc', text: 'หมายเลขช่องจอด (เก่าสุด)' },
                { key: 'pickupTime-desc', text: 'เวลารับสินค้า (ใหม่สุด)' },
                { key: 'pickupTime-asc', text: 'เวลารับสินค้า (เก่าสุด)' }
              ]" 
            />
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment';
import Topnav from '../../components/Topnav';
import Sidenav from '../../components/Sidenav';
import Tabs01 from '../../components/Tabs01';
import DataTable from '../../components/DataTable-JobRequest';
import {ConditionSelectViewJob} from '../../models/select-company';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'AdminJobRequestsPage',
  components: {
    Topnav,
    Sidenav,
    Tabs01,
    DataTable
  },
  data() {
    return {
      sidenavActiveIndex: 1,
      user: {
        id: 4,
        role: 'Admin', /* Freight Forwarder, Driver, TG Admin, Admin */
        username: 'Admin',
        email: 'admin@gmail.com',
        avatar: '/assets/img/misc/profile.jpg',
        detail: {
          prefix: 'นาย',
          firstname: 'สมศักดิ์',
          lastname: 'จริงใจ',
          phone: '0811123456'
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
    for(var i=0; i<4; i++){
      this.rows1.push({
        awbNumber: { 
          type: 'link', text: '131-56591080',
          href: '/admin/job-request-view'
        },
        hwbSerialNumber: { text: 'MLC10131957' },
        flightNumber: { text: 'JL0707' },
        jobNumber: { text: 'A0020640302798' },
        customsEntryNumber: { text: 'A0020640302798' },
        customsEntryNumberDate: { text: this.formatDate(new Date()) },
        status: { type: 'tag', value: 1, text: 'รอการ Matching', classer: 'ss-tag-danger' },
        options: {
          type: 'options',
          view: { type: 'link', href: '/admin/job-request-view' }
        }
      });
      
      this.rows2.push({
        awbNumber: { 
          type: 'link', text: '131-56591080',
          href: '/admin/job-request-view/2'
        },
        flightNumber: { text: 'JL0707' },
        numberOfPieces: { text: this.formatNumber(2400, 0) },
        date: { text: this.formatDate(new Date(), 'DD MMM YYYY') },
        dockNumber: { text: '-' },
        pickupTime: { text: '-' },
        truckNumber: { text: '-' },
        status: { type: 'tag', value: 2, text: 'รอคิวการรับ', classer: 'ss-tag-info' },
        options: {
          type: 'options',
          view: { type: 'link', href: '/admin/job-request-view/2' }
        }
      });
      
      this.rows3.push({
        awbNumber: { 
          type: 'link', text: '131-56591080',
          href: '/admin/job-request-view/3'
        },
        flightNumber: { text: 'JL0707' },
        numberOfPieces: { text: this.formatNumber(2400, 0) },
        date: { text: this.formatDate(new Date(), 'DD MMM YYYY') },
        dockNumber: { text: 'G14' },
        pickupTime: { text: '09.45 น.' },
        truckNumber: { text: '-' },
        status: { type: 'tag', value: 3, text: 'รอยืนยันคิว', classer: 'ss-tag-danger' },
        options: {
          type: 'options',
          view: { type: 'link', href: '/admin/job-request-view/3' }
        }
      });
      
      this.rows4.push({
        awbNumber: { 
          type: 'link', text: '131-56591080',
          href: '/admin/job-request-view/4'
        },
        flightNumber: { text: 'JL0707' },
        numberOfPieces: { text: this.formatNumber(2400, 0) },
        date: { text: this.formatDate(new Date(), 'DD MMM YYYY') },
        dockNumber: { text: 'G14' },
        pickupTime: { text: '09.45 น.' },
        truckNumber: { text: '5กศ5859' },
        status: i < 2 ?
          { type: 'tag', value: 3, text: 'รอการชำระเงิน', classer: 'ss-tag-danger' } :
          { type: 'tag', value: 3, text: 'กำลังดำเนินการ', classer: 'ss-tag-warning' },
        options: {
          type: 'options',
          view: { type: 'link', href: '/admin/job-request-view/4' }
        }
      });
      
      this.rows5.push({
        awbNumber: { 
          type: 'link', text: '131-56591080',
          href: '/admin/job-request-view/5'
        },
        flightNumber: { text: 'JL0707' },
        numberOfPieces: { text: this.formatNumber(2400, 0) },
        date: { text: this.formatDate(new Date(), 'DD MMM YYYY') },
        dockNumber: { text: 'G14' },
        pickupTime: { text: '09.45 น.' },
        truckNumber: { text: '5กศ5859' },
        status: i < 2 ? 
          { 
            type: 'tag', value: 4, text: 'ดำเนินการเสร็จสิ้น', classer: 'ss-tag-success',
            append: true, icon: '/assets/img/icon/comment-black.svg'
          } :
          { type: 'tag', value: 4, text: 'ดำเนินการเสร็จสิ้น', classer: 'ss-tag-success' },
        options: {
          type: 'options',
          view: { type: 'link', href: '/admin/job-request-view/5' }
        }
      });
    }

    // เมื่อ click เลือก tab ของ job requests ใน freight-forwarder จะทำให้ข้อมูลทุกอย่างรีเป็นหน้า 1 ใน tab นั้นๆ
    let temp_condition = new ConditionSelectViewJob('1', '10', 'awbNumber', 'ascending', (this.tabActiveIndex).toString())
    this.fetchAllJob(temp_condition);
  },
  methods: {
    formatNumber(value, digits=2) {
      let val = (value/1).toFixed(digits);
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    formatDate(value, format='YYYYMMDD') {
      return moment(String(value)).format(format);
    },
    ...mapMutations({
      changeConditionLoadData: 'admin/changeConditionLoadData' // map `this.add()` to `this.$store.commit('increment')`
    }),
    ...mapActions({
      fetchAllJob: 'admin/fetchAllJob'
    })
  },
  computed: {
    ...mapGetters({
      getUser: 'auth/getUser',
      getJobRequest0: 'admin/getJobRequest0',
      getJobRequest1: 'admin/getJobRequest1',
      getJobRequest2: 'admin/getJobRequest2',
      getJobRequest3: 'admin/getJobRequest3',
      getJobRequest4: 'admin/getJobRequest4',
      getJobRequest5: 'admin/getJobRequest5',
    })
  },
}
</script>
