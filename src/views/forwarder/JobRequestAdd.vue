<template>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" />

  <section class="section-full">
    <div class="container">
      <form @submit="onSubmit">

        <div class="section-header mb-4" data-aos="fade-up" data-aos-delay="0">
          <div class="btns mt-0">
            <a href="/forwarder/job-requests" class="btn color-gray h-color-01">
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
          <div class="grids">
            <div class="grid xl-1-3 lg-40 md-50 sm-80">
              <FormGroup 
                type="text" label="เลขที่ Airway Bill *" placeholder="โปรดระบุ" 
                :required="true" :maxlength="12" 
                :value="jobRequest.awbNumber" @input="jobRequest.awbNumber = $event" 
              />
            </div>
            <div class="grid xl-1-3 lg-40 md-50 sm-80">
              <FormGroup 
                type="text" label="เลขที่ House Airway Bill *" placeholder="โปรดระบุ" 
                :required="true" :maxlength="12" 
                :value="jobRequest.hwbSerialNumber" @input="jobRequest.hwbSerialNumber = $event" 
              />
            </div>
            <div class="sep"></div>
            <div class="grid xl-1-3 lg-40 md-50 sm-80">
              <FormGroup 
                type="text" label="รหัสเที่ยวบิน *" placeholder="โปรดระบุ" 
                :required="true" :maxlength="6" 
                :value="jobRequest.flightNumber" @input="jobRequest.flightNumber = $event" 
              />
            </div>
            <div class="grid xl-1-3 lg-40 md-50 sm-80">
              <FormGroup 
                type="text" label="เลขที่งาน *" placeholder="โปรดระบุ" 
                :required="true" :maxlength="14" 
                :value="jobRequest.jobNumber" @input="jobRequest.jobNumber = $event" 
              />
            </div>
            <div class="sep"></div>
            <div class="grid xl-1-3 lg-40 md-50 sm-80">
              <FormGroup 
                type="text" label="เลขที่ใบขนสินค้า *" placeholder="โปรดระบุ" 
                :required="true" :maxlength="14" 
                :value="jobRequest.customsEntryNumber" @input="jobRequest.customsEntryNumber = $event" 
              />
            </div>
            <div class="grid xl-1-3 lg-40 md-50 sm-80">
              <FormGroup 
                type="datepicker" label="วันที่ได้รับเลขที่ใบสินค้า *" placeholder="YYYYMMDD" 
                :required="true" :minlength="8" :maxlength="8" 
                :value="jobRequest.customsEntryNumberDate" @input="jobRequest.customsEntryNumberDate = $event" 
                wrapperClass="append" :append="true" icon="calendar.svg" 
                dateFormat="YYYYMMDD"
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

export default {
  name: 'ForwarderJobRequestAddPage',
  components: {
    Topnav
  },
  data() {
    return {
      topnavActiveIndex: 1,
      user: {
        id: 1,
        role: '', /* Freight Forwarder, Driver, TG Admin, Admin */
        username: '',
        email: '',
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
  mounted() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
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
        //e.preventDefault();
        console.log('not valid')
      } else {
        console.log('adding request...')
        this.$store.dispatch('requests/add', this.jobRequest).then(
            () => {
              console.log("job request created")
              this.$router.push('/forwarder/job-requests');
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
                this.text_notification = 'username or password is incorrect'
                this.user.username = ''
                this.user.password = ''
            }
          );
      }
    }
  }
}
</script>
