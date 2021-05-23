<template>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" />

  <section class="section-full">
    <div class="container">

      <div class="section-header mb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="btns mt-0">
          <a :href="'/forwarder/job-requests/'+jobRequest.status" class="btn color-gray h-color-01">
            <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
            ย้อนกลับ
          </a>
        </div>
        <div class="header-wrapper">
          <div class="text-container pr-2">
            <span class="h3 mr-3">View Job Request</span> 
            <span v-if="jobRequest.status==1" class="ss-tag ss-tag-danger">รอการ Matching</span>
            <span v-else-if="jobRequest.status==2" class="ss-tag ss-tag-info">รอคิวการรับ</span>
            <span v-else-if="jobRequest.status==3" class="ss-tag ss-tag-warning">กำลังดำเนินการ</span>
            <span v-else-if="jobRequest.status==4" class="ss-tag ss-tag-success">ดำเนินการเสร็จสิ้น</span>
          </div>
          <div class="btns hide-mobile">
            <Button 
              text="ย้อนกลับ" :href="'/forwarder/job-requests/'+jobRequest.status" 
              classer="btn-color-08"
            />
          </div>
          <div class="btns show-mobile">
            <Button text="ย้อนกลับ" :href="'/forwarder/job-requests/'+jobRequest.status" 
            classer="btn-color-08 btn-sm" />
          </div>
        </div>
      </div>
      
      <div v-if="jobRequest.status > 3">
        <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
          <p class="fw-400">ความพึงพอใจ</p>
        </div>
        <div class="section-px pt-2 pb-6" data-aos="fade-up" data-aos-delay="150">
          <form v-if="!jobRequestCommentValid" action="/" method="GET" @submit.prevent="onSubmitComment">
            <div class="grids">
              <div class="grid md-1-3 sm-50 xs-50 mt-4">
                <FormGroup 
                  type="select" label="ระดับความพอใจ *" 
                  placeholder="เลือกระดับความพอใจ" :required="true" 
                  :options="[
                    { value: 5, text: '5 - พอใจมาก' },
                    { value: 4, text: '4 - พอใจ' },
                    { value: 3, text: '3 - ปาณกลาง' },
                    { value: 2, text: '2 - ไม่พอใจ' },
                    { value: 1, text: '1 - ไม่พอใจมาก' }
                  ]" 
                  :value="jobRequest.rating" 
                  @input="(event)=>jobRequest.rating = event" 
                />
              </div>
              <div class="grid md-2-3 sm-100 mt-4">
                <FormGroup 
                  type="textarea" label="คำแนะนำ" placeholder="คำแนะนำ" :rows="1" 
                  :value="jobRequest.comment" 
                  @input="(event)=>jobRequest.comment = event" 
                />
              </div>
            </div>
            <div class="btns w-auto mt-4">
              <Button 
                type="submit" text="ส่งข้อความ" 
                classer="btn-color-01" :append="true" icon="send-white.svg" 
              />
            </div>
          </form>
          <div v-else class="grids">
            <div class="grid md-1-3 sm-50 xs-50">
              <FormGroup  type="plain" label="ระดับความพอใจ" :value="jobRequest.rating" />
            </div>
            <div class="grid md-2-3 sm-100">
              <FormGroup  type="plain" label="คำแนะนำ" :value="jobRequest.comment" />
            </div>
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
          <p class="fw-400">การดำเนินงาน</p>
        </div>
        <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
          <div class="mt-6" @click="stepActiveIndex = stepActiveIndex + 1">
            <Step01 :activeIndex="stepActiveIndex" />
          </div>
          <div class="mt-4">
            <ChatContainer :chat="chat" :withInput="jobRequest.status < 4" />
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

export default {
  name: 'ForwarderJobRequestViewPage',
  components: {
    Topnav,
    Step01,
    ChatContainer
  },
  data() {
    return {
      topnavActiveIndex: 1,
      user: {
        id: 1,
        role: 'Freight Forwarder', /* Freight Forwarder, Driver, TG Admin, Admin */
        username: 'General User',
        email: 'user@gmail.com',
        avatar: '/assets/img/misc/profile-01.svg',
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
        status: this.$route.params.status? Number(this.$route.params.status): 1,
        awbNumber: '131-56591080',
        hwbSerialNumber: 'MLC10131957',
        flightNumber: 'JL0707',
        jobNumber: 'A0020640302798',
        customsEntryNumber: 'A0020640302798',
        customsEntryNumberDate: new Date(),

        date: null,
        numberOfPieces: null,
        dockNumber: null,
        pickupTimeHours: null,
        pickupTimeMinutes: null,
        qrCode: null,

        rating: '',
        comment: ''
      },

      jobRequestCommentValid: false,
      stepActiveIndex: 2,
      chat: [
        {
          self: false,
          message: 'ใน e-PP เวอร์ชั่นใหม่ ทางกนอ: ได้ยกเลิกเรื่องการมอบอำนาจ เพื่อขอสิทธิ์ใช้งานเพิ่มเติมทั้งหมด คงไว้แต่ User หลักของผู้ประกอบการ ซึ่งในระบบใหม่จะเรียกว่า Master User ซึ่งหากผู้ประกอบการรายใด ต้องการสร้าง User เพิ่มในระบบ สามารถบริหารจัดการ User/Password และสิทธิ์การเข้าใช้งานโปรแกรมได้ด้วยตัวเองโดยไม่จำกัด User ใช้งาน',
          avatar: null,
          createdAt: '05/15/2021 11:54:24'
        },
        {
          self: true,
          message: 'ใน e-PP เวอร์ชั่นใหม่ ทางกนอ: ได้ยกเลิกเรื่องการมอบอำนาจ เพื่อขอสิทธิ์ใช้งานเพิ่มเติมทั้งหมด คงไว้แต่ User หลักของผู้ประกอบการ ซึ่งในระบบใหม่จะเรียกว่า Master User ซึ่งหากผู้ประกอบการรายใด ต้องการสร้าง User เพิ่มในระบบ สามารถบริหารจัดการ User/Password และสิทธิ์การเข้าใช้งานโปรแกรมได้ด้วยตัวเองโดยไม่จำกัด User ใช้งาน',
          avatar: '/assets/img/misc/profile.jpg',
          createdAt: '05/15/2021 11:54:24'
        },
        {
          self: false,
          message: 'ใน e-PP เวอร์ชั่นใหม่ ทางกนอ: ได้ยกเลิกเรื่องการมอบอำนาจ เพื่อขอสิทธิ์ใช้งานเพิ่มเติมทั้งหมด คงไว้แต่ User หลักของผู้ประกอบการ ซึ่งในระบบใหม่จะเรียกว่า Master User ซึ่งหากผู้ประกอบการรายใด ต้องการสร้าง User เพิ่มในระบบ สามารถบริหารจัดการ User/Password และสิทธิ์การเข้าใช้งานโปรแกรมได้ด้วยตัวเองโดยไม่จำกัด User ใช้งาน',
          avatar: null,
          createdAt: '05/15/2021 11:54:24'
        },
        {
          self: true,
          message: 'ใน e-PP เวอร์ชั่นใหม่ ทางกนอ: ได้ยกเลิกเรื่องการมอบอำนาจ เพื่อขอสิทธิ์ใช้งานเพิ่มเติมทั้งหมด คงไว้แต่ User หลักของผู้ประกอบการ ซึ่งในระบบใหม่จะเรียกว่า Master User ซึ่งหากผู้ประกอบการรายใด ต้องการสร้าง User เพิ่มในระบบ สามารถบริหารจัดการ User/Password และสิทธิ์การเข้าใช้งานโปรแกรมได้ด้วยตัวเองโดยไม่จำกัด User ใช้งาน',
          avatar: '/assets/img/misc/profile.jpg',
          createdAt: '05/15/2021 11:54:24'
        }
      ]
    }
  },
  mounted() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    if(this.jobRequest.status > 1){
      this.jobRequest.date = new Date();
      this.jobRequest.numberOfPieces = 2400;
    }
    if(this.jobRequest.status > 2){
      this.jobRequest.dockNumber = 'G14';
      this.jobRequest.pickupTimeHours = '09';
      this.jobRequest.pickupTimeMinutes = '45';
      this.jobRequest.qrCode = '/assets/img/misc/qr-code.jpg';
    }
    if(this.jobRequest.status > 3){
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
    },
    onSubmitComment() {
      this.jobRequestCommentValid = true;
    }
  }
}
</script>
