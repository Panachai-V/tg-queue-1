<template>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" />

  <section class="section-full">
    <div class="container">
      <div class="tab-container">
        <div class="section-header pb-0" data-aos="fade-up" data-aos-delay="0">
          <div class="btns mt-0">
            <a href="/driver/my-jobs" class="btn color-gray h-color-01 disabled">
              <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
              ย้อนกลับ
            </a>
          </div>
          <div class="header-wrapper">
            <div class="text-container">
              <h6 class="h3">My Jobs</h6>
            </div>
          </div>
          <Tabs01 
            :activeIndex="tabActiveIndex" 
            @clicked="tabActiveIndex = $event" 
            :tabs="[ 'กำลังดำเนินการ', 'ดำเนินการเสร็จสิ้น' ]" 
          />
        </div>
        <div class="tab-contents" v-if="getLoadingStatus == false" data-aos="fade-up" data-aos-delay="150">
          
          <div class="tab-content" :class="{ 'active': tabActiveIndex == 0 }">
            <DataTable 
              :tabActiveIndex="tabActiveIndex"
              :rows="getJobRequest4" 
              :columns="[
                { key: 'awbNumber', text: 'Airway Bill' },
                { key: 'flightNumber', text: 'รหัสเที่ยวบิน' },
                { key: 'numberOfPieces', text: 'จำนวนสินค้า' },
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
          
          <div class="tab-content" v-if="getLoadingStatus == false" :class="{ 'active': tabActiveIndex == 1 }">
            <DataTable 
              :tabActiveIndex="tabActiveIndex"
              :rows="getJobRequest5" 
              :columns="[
                { key: 'awbNumber', text: 'Airway Bill' },
                { key: 'flightNumber', text: 'รหัสเที่ยวบิน' },
                { key: 'numberOfPieces', text: 'จำนวนสินค้า' },
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
import Tabs01 from '../../components/Tabs01';
import DataTable from '../../components/DataTable-JobRequest-ff';
import UserService from '../../services/user.service';
import { mapState, mapGetters, mapActions } from 'vuex'
import {ConditionSelectViewJob} from '../../models/select-company';

export default {
  name: 'DriverMyJobsPage',
  components: {
    Topnav,
    Tabs01,
    DataTable
  },
  data() {
    return {
      topnavActiveIndex: 0,
      user: {
        id: this.$store.state.auth.user.id,
        role: this.$store.state.auth.user.role, /* Freight Forwarder, Driver, TG Admin, Admin */
        username: this.$store.state.auth.user.username,
        email: this.$store.state.auth.user.email,
        avatar: '/assets/img/misc/profile.jpg',
        detail: {
          prefix: '',
          firstname: '',
          lastname: '',
          phone: ''
        },
        company: {
          name: '',
          address: '',
          province: '',
          zipcode: '',
          taxId: ''
        }
      },

      tabActiveIndex: 0,
      rows1: [],
      rows2: []
    }
  },
  computed: {
    ...mapGetters({
      getOverview: 'driver/getOverviewComapny',
      getLoadingStatus: 'driver/getLoadingStatus',
      getJobRequest4: 'driver/getJobRequest4',
      getJobRequest5: 'driver/getJobRequest5',
      getFilterStatus: 'driver/getFilterStatus'
    })
  },
  mounted() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    document.getElementById('color_style').href = '/assets/css/color-driver.css';
    for(var i=0; i<4; i++){
      this.rows1.push({
        awbNumber: { 
          type: 'link', text: '131-56591080',
          href: '/driver/my-job-view/4'
        },
        flightNumber: { text: 'JL0707' },
        numberOfPieces: { text: this.formatNumber(2400, 0) },
        date: { text: this.formatDate(new Date(), 'DD MMM YYYY') },
        dockNumber: { text: 'G14' },
        pickupTime: { text: '09.45 น.' },
        truckNumber: { text: '5กศ5859' },
        status: { type: 'tag', value: 3, text: 'กำลังดำเนินการ', classer: 'ss-tag-warning' },
        options: {
          type: 'options',
          view: { type: 'link', href: '/driver/my-job-view/4' }
        }
      });
      
      this.rows2.push({
        awbNumber: { 
          type: 'link', text: '131-56591080',
          href: '/driver/my-job-view/5'
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
          view: { type: 'link', href: '/driver/my-job-view/5' }
        }
      });
    }
    
    // เมื่อ click เลือก tab ของ job requests ใน freight-forwarder จะทำให้ข้อมูลทุกอย่างรีเป็นหน้า 1 ใน tab นั้นๆ
    let temp_condition = new ConditionSelectViewJob('1', '10', 'awbNumber', 'ascending', (this.tabActiveIndex + 4).toString())
    this.fetchJobRequest(temp_condition);
    console.log('over: ',this.getOverview)
    console.log('getJobRequest4: ', this.getJobRequest4)
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
      fetchJobRequest: 'driver/fetchJobRequest'
    })
  }
}
</script>
