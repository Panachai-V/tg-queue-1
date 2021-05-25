<template>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" />

  <section class="section-full">
    <div class="container">

      <div class="section-header mb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="btns mt-0">
          <a :href="'/driver/my-jobs/'+jobRequest.status" class="btn color-gray h-color-01">
            <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
            ย้อนกลับ
          </a>
        </div>
        <div class="header-wrapper">
          <div class="text-container pr-2">
            <span class="h3 mr-3">View Job Request</span> 
            <span v-if="jobRequest.status==1" class="ss-tag ss-tag-danger">รอการ Matching</span>
            <span v-else-if="jobRequest.status==2" class="ss-tag ss-tag-info">รอคิวการรับ</span>
            <span v-else-if="jobRequest.status==3" class="ss-tag ss-tag-danger">รอยืนยันคิว</span>
            <span v-else-if="jobRequest.status==4" class="ss-tag ss-tag-warning">กำลังดำเนินการ</span>
            <span v-else-if="jobRequest.status==5" class="ss-tag ss-tag-success">ดำเนินการเสร็จสิ้น</span>
          </div>
          <div class="btns hide-mobile">
            <Button 
              text="ย้อนกลับ" :href="'/driver/my-jobs/'+jobRequest.status" 
              classer="btn-color-08"
            />
          </div>
          <div class="btns show-mobile">
            <Button 
              text="ย้อนกลับ" :href="'/driver/my-jobs/'+jobRequest.status" 
              classer="btn-color-08 btn-sm" 
            />
          </div>
        </div>
      </div>
      
      <div v-if="jobRequest.status > 4">
        <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
          <p class="fw-400">ความพึงพอใจ</p>
        </div>
        <div class="section-px pt-2 pb-6" data-aos="fade-up" data-aos-delay="150">
          <div class="grids">
            <div class="grid md-1-3 sm-50 xs-50">
              <FormGroup  type="plain" label="ระดับความพอใจ" :value="jobRequest.rating" />
            </div>
            <div class="grid md-2-3 sm-100">
              <FormGroup  type="plain" label="คำแนะนำ" :value="jobRequest.comment" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="jobRequest.status > 2">
        <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
          <p class="fw-400">ยืนยันการรับสินค้า</p>
        </div>
        <div class="section-px pt-2 pb-6" data-aos="fade-up" data-aos-delay="150">
          <div class="grids">
            <div class="grid xl-30 lg-1-3 sm-50">
              <FormGroup 
                type="plain" label="ผู้ขับรถ" :value="jobRequest.driver"
              />
            </div>
            <div class="grid xl-25 lg-30 sm-50">
              <FormGroup 
                type="plain" label="ทะเบียนรถ" :value="jobRequest.truckNumber"
              />
            </div>
            <div class="grid xl-20 lg-25 sm-50">
              <FormGroup
                type="plain" label="ยืนยันเวลารับสินค้า" 
                :value="jobRequest.confPickupTimeHours && jobRequest.confPickupTimeMinutes
                  ? jobRequest.confPickupTimeHours+'.'+jobRequest.confPickupTimeMinutes+' น.': ''"
              />
            </div>
            <div v-if="jobRequest.status < 5" class="grid sm-100">
              <div class="btns d-flex mt-0">
                <Button 
                  v-if="stepActiveIndex > 3" text="ย้อนกลับ" href="javascript:" 
                  classer="btn-color-11" @click="stepActiveIndex -= 1"
                />
                <Button 
                  :text="
                    stepActiveIndex == 2 ?
                      'ชำระเงินแล้ว' :
                      stepActiveIndex == 3 ?
                        'รับสินค้าแล้ว' :
                          stepActiveIndex == 4 ?
                            'กำลังจัดส่งสินค้า' :
                            'จัดส่งสินค้าแล้ว'
                  " href="javascript:" 
                  classer="btn-color-01 ml-auto" @click="stepActiveIndex += 1"
                />
              </div>
            </div>
          </div>
          <div class="mt-6">
            <Step01 
              :activeIndex="stepActiveIndex" 
              :icons="[
                'step-01-driver.svg', 'step-02-driver.svg', 'step-03-driver.svg', 
                'step-04-driver.svg', 'step-05-driver.svg'
              ]"
            />
          </div>
        </div>
      </div>
      
      <div v-if="jobRequest.status > 1">
        <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
          <p class="fw-400">คิวการรับสินค้า</p>
        </div>
        <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
          <div class="grids">
            <div class="grid md-2-3 sm-100 mt-0">
              <div class="grids">
                <div class="grid sm-50 xs-50">
                  <FormGroup
                    type="plain" label="วันที่เที่ยวบิน" :value="formatDate(jobRequest.date, 'DD MMM YYYY')"
                  />
                </div>
                <div class="grid sm-50 xs-50">
                  <FormGroup
                    type="plain" label="จำนวนสินค้า" :value="formatNumber(jobRequest.numberOfPieces, 0)"
                  />
                </div>
                <div class="grid sm-50 xs-50">
                  <FormGroup
                    type="plain" label="หมายเลขช่องจอด" :value="jobRequest.dockNumber"
                  />
                </div>
                <div class="grid sm-50 xs-50">
                  <FormGroup
                    type="plain" label="เวลารับสินค้า" 
                    :value="jobRequest.pickupTimeHours && jobRequest.pickupTimeMinutes
                      ? jobRequest.pickupTimeHours+'.'+jobRequest.pickupTimeMinutes+' น.': ''"
                  />
                </div>
              </div>
            </div>
            <div v-if="jobRequest.qrCode" class="grid md-1-3 sm-50 xs-50">
              <img class="img-qr" :src="jobRequest.qrCode" alt="QR Code" />
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="jobRequest.status > 2">
        <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
          <p class="fw-400">ข้อมูลการสนทนา</p>
        </div>
        <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
          <div class="mt-6">
            <ChatContainer :chat="chat" :withInput="jobRequest.status <= 4" />
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
              type="plain" label="เลขที่ Airway Bill" :value="jobRequest.awbNumber" 
            />
          </div>
          <div class="grid xl-1-3 lg-40 md-50 sm-80">
            <FormGroup 
              type="plain" label="เลขที่ House Airway Bil" :value="jobRequest.hwbSerialNumber" 
            />
          </div>
          <div class="sep"></div>
          <div class="grid xl-1-3 lg-40 md-50 sm-80">
            <FormGroup 
              type="plain" label="รหัสเที่ยวบิน" :value="jobRequest.flightNumber" 
            />
          </div>
          <div class="grid xl-1-3 lg-40 md-50 sm-80">
            <FormGroup 
              type="plain" label="เลขที่งาน" :value="jobRequest.jobNumber" 
            />
          </div>
          <div class="sep"></div>
          <div class="grid xl-1-3 lg-40 md-50 sm-80">
            <FormGroup 
              type="plain" label="เลขที่ใบขนสินค้า" :value="jobRequest.customsEntryNumber" 
            />
          </div>
          <div class="grid xl-1-3 lg-40 md-50 sm-80">
            <FormGroup 
              type="plain" label="วันที่ได้รับเลขที่ใบสินค้า" 
              :value="formatDate(jobRequest.customsEntryNumberDate)" 
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
import Step01 from '../../components/Step01';
import ChatContainer from '../../components/ChatContainer';
import FormGroupTime from '../../components/FormGroupTime';

export default {
  name: 'DriverMyJobViewPage',
  components: {
    Topnav,
    Step01,
    ChatContainer,
    FormGroupTime
  },
  data() {
    return {
      topnavActiveIndex: 0,
      user: {
        id: 2,
        role: 'Driver', /* Freight Forwarder, Driver, TG Admin, Admin */
        username: 'Driver User',
        email: 'driver@gmail.com',
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
      jobRequest: {
        status: this.$route.params.status? Math.max(4, Number(this.$route.params.status)): 4,
        awbNumber: '131-56591080',
        hwbSerialNumber: 'MLC10131957',
        flightNumber: 'JL0707',
        jobNumber: 'A0020640302798',
        customsEntryNumber: 'A0020640302798',
        customsEntryNumberDate: new Date(),

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

        rating: '5',
        comment: 'จัดส่งรวดเร็วถูกต้องดีมาก'
      },

      jobRequestCommentValid: true,
      jobRequestConfirmValid: false,

      stepActiveIndex: 1,
      chat: [
        {
          self: false,
          message: 'ใน e-PP เวอร์ชั่นใหม่ ทางกนอ: ได้ยกเลิกเรื่องการมอบอำนาจ เพื่อขอสิทธิ์ใช้งานเพิ่มเติมทั้งหมด คงไว้แต่ User หลักของผู้ประกอบการ ซึ่งในระบบใหม่จะเรียกว่า Master User ซึ่งหากผู้ประกอบการรายใด ต้องการสร้าง User เพิ่มในระบบ สามารถบริหารจัดการ User/Password และสิทธิ์การเข้าใช้งานโปรแกรมได้ด้วยตัวเองโดยไม่จำกัด User ใช้งาน',
          avatar: null,
          createdAt: new Date()
        },
        {
          self: true,
          message: 'ใน e-PP เวอร์ชั่นใหม่ ทางกนอ: ได้ยกเลิกเรื่องการมอบอำนาจ เพื่อขอสิทธิ์ใช้งานเพิ่มเติมทั้งหมด คงไว้แต่ User หลักของผู้ประกอบการ ซึ่งในระบบใหม่จะเรียกว่า Master User ซึ่งหากผู้ประกอบการรายใด ต้องการสร้าง User เพิ่มในระบบ สามารถบริหารจัดการ User/Password และสิทธิ์การเข้าใช้งานโปรแกรมได้ด้วยตัวเองโดยไม่จำกัด User ใช้งาน',
          avatar: '/assets/img/misc/profile.jpg',
          createdAt: new Date()
        },
        {
          self: false,
          message: 'ใน e-PP เวอร์ชั่นใหม่ ทางกนอ: ได้ยกเลิกเรื่องการมอบอำนาจ เพื่อขอสิทธิ์ใช้งานเพิ่มเติมทั้งหมด คงไว้แต่ User หลักของผู้ประกอบการ ซึ่งในระบบใหม่จะเรียกว่า Master User ซึ่งหากผู้ประกอบการรายใด ต้องการสร้าง User เพิ่มในระบบ สามารถบริหารจัดการ User/Password และสิทธิ์การเข้าใช้งานโปรแกรมได้ด้วยตัวเองโดยไม่จำกัด User ใช้งาน',
          avatar: null,
          createdAt: new Date()
        },
        {
          self: true,
          message: 'ใน e-PP เวอร์ชั่นใหม่ ทางกนอ: ได้ยกเลิกเรื่องการมอบอำนาจ เพื่อขอสิทธิ์ใช้งานเพิ่มเติมทั้งหมด คงไว้แต่ User หลักของผู้ประกอบการ ซึ่งในระบบใหม่จะเรียกว่า Master User ซึ่งหากผู้ประกอบการรายใด ต้องการสร้าง User เพิ่มในระบบ สามารถบริหารจัดการ User/Password และสิทธิ์การเข้าใช้งานโปรแกรมได้ด้วยตัวเองโดยไม่จำกัด User ใช้งาน',
          avatar: '/assets/img/misc/profile.jpg',
          createdAt: new Date()
        }
      ]
    }
  },
  mounted() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    document.getElementById('color_style').href = '/assets/css/color-driver.css';
    if(this.jobRequest.status > 1){
      this.jobRequest.date = new Date();
      this.jobRequest.numberOfPieces = 2400;
    }
    if(this.jobRequest.status > 2){
      this.jobRequest.dockNumber = 'G14';
      this.jobRequest.pickupTimeHours = '09';
      this.jobRequest.pickupTimeMinutes = '45';
      this.jobRequest.qrCode = '/assets/img/misc/qr-code.jpg';
      this.jobRequest.confPickupTimeHours = this.jobRequest.pickupTimeHours;
      this.jobRequest.confPickupTimeMinutes = this.jobRequest.pickupTimeMinutes;
    }
    if(this.jobRequest.status > 3){
      this.jobRequest.driver = 'นาย ชาญชัย กล้าหาญ';
      this.jobRequest.truckNumber = '5กศ5859';
      this.stepActiveIndex = 3;
      this.jobRequestConfirmValid = true;
    }
    if(this.jobRequest.status > 4){
      this.stepActiveIndex = 6;
    }
  },
  methods: {
    formatNumber(value, digits=2) {
      let val = (value/1).toFixed(digits);
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    formatDate(value, format='YYYYMMDD') {
      return moment(String(value)).format(format);
    }
  }
}
</script>
