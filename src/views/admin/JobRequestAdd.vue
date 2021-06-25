<template>
  <Topnav :user="user" />
  <Sidenav :user="user" :activeIndex="sidenavActiveIndex" />

  <section class="section-full pull-right">
    <div class="container">
      <form action="/admin/job-requests" method="GET" @submit="createJob">

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
          <p class="fw-400">ข้อมูลสินค้า</p>
        </div>
        <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
          {{getDetailCreateJob}}
          <div class="grids">
            <div class="grid xl-1-3 lg-40 md-50 sm-80">
              <FormGroup 
                type="text" label="เลขที่ Airway Bill *" placeholder="โปรดระบุ" 
                :required="true" :maxlength="12" 
                :value="getDetailCreateJob.awbNumber" @input="getDetailCreateJob.awbNumber = $event" 
              />
            </div>
            <div class="grid xl-1-3 lg-40 md-50 sm-80">
              <FormGroup 
                type="text" label="เลขที่ House Airway Bill *" placeholder="โปรดระบุ" 
                :required="true" :maxlength="12" 
                :value="getDetailCreateJob.hwbSerialNumber" @input="getDetailCreateJob.hwbSerialNumber = $event" 
              />
            </div>
            <div class="sep"></div>
            <div class="grid xl-1-3 lg-40 md-50 sm-80">
              <FormGroup 
                type="text" label="รหัสเที่ยวบิน *" placeholder="โปรดระบุ" 
                :required="true" :maxlength="6" 
                :value="getDetailCreateJob.flightNumber" @input="getDetailCreateJob.flightNumber = $event" 
              />
            </div>
            <div class="grid xl-1-3 lg-40 md-50 sm-80">
              <FormGroup 
                type="text" label="เลขที่งาน *" placeholder="โปรดระบุ" 
                :required="true" :maxlength="14" 
                :value="getDetailCreateJob.jobNumber" @input="getDetailCreateJob.jobNumber = $event" 
              />
            </div>
            <div class="sep"></div>
            <div class="grid xl-1-3 lg-40 md-50 sm-80">
              <FormGroup 
                type="text" label="เลขที่ใบขนสินค้า *" placeholder="โปรดระบุ" 
                :required="true" :maxlength="14" 
                :value="getDetailCreateJob.customsEntryNumber" @input="getDetailCreateJob.customsEntryNumber = $event" 
              />
            </div>
            <div class="grid xl-1-3 lg-40 md-50 sm-80">
              <FormGroup 
                type="datepicker" label="วันที่ได้รับเลขที่ใบสินค้า *" placeholder="YYYYMMDD" 
                :required="true" :minlength="8" :maxlength="8" 
                :value="getDetailCreateJob.customsEntryNumberDate" @input="getDetailCreateJob.customsEntryNumberDate = $event" 
                wrapperClass="append" :append="true" icon="calendar.svg" 
                dateFormat="YYYYMMDD"
              />
            </div>
            <div class="sep"></div>
            <div class="grid xl-1-3 lg-40 md-50 sm-80">
              <FormGroup 
                type="text" label="เลขประจำตัวผู้เสียภาษี *" placeholder="โปรดระบุ" 
                :required="true" :minlength="13" :maxlength="13"
                :value="getDetailCreateJob.taxid" @input="getDetailCreateJob.taxid = $event" 
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
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

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
      jobRequest: {
        status: 0,
        awbNumber: '',
        hwbSerialNumber: '',
        flightNumber: '',
        jobNumber: '',
        customsEntryNumber: '',
        customsEntryNumberDate: '',

        date: '',
        numberOfPieces: '',
        dockNumber: '',
        pickupTimeHours: '',
        pickupTimeMinutes: '',
        qrCode: '',

        confPickupTimeHours: '',
        confPickupTimeMinutes: '',
        truckNumber: '',
        driver: '',

        rating: '',
        comment: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      getDetailCreateJob: 'admin/getDetailCreateJob'
    })
  },
  mounted() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
  },
  methods: {
    ...mapActions({
      createJob: 'admin/createJob'
    }),
    onSubmit(e) {
      var that = this;
      var isValid = true;
      [
        'awbNumber', 'hwbSerialNumber', 'flightNumber', 
        'customsEntryNumber', 'customsEntryNumberDate', 'jobNumber'
      ].forEach(function(k){
        if(!that.jobRequest[k]){
          isValid = false;
        }
      });

      if(!isValid){
        e.preventDefault();
      }
    }
  }
}
</script>
