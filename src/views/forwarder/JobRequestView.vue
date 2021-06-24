<template>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" />

  <section class="section-full">
    <div class="container" v-if="getLoadingStatus == false">

      <div class="section-header mb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="btns mt-0">
          <a :href="'/forwarder/job-requests/'+getDetailJob.status" class="btn color-gray h-color-01">
            <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
            ย้อนกลับ
          </a>
        </div>
        <div class="header-wrapper">
          <div class="text-container pr-2">
            <span class="h3 mr-3">View Job Request</span> 
            <span v-if="getDetailJob.status==0" class="ss-tag ss-tag-danger">รอการ Matching</span>
            <span v-else-if="getDetailJob.status==1" class="ss-tag ss-tag-info">รอการชำระเงิน</span>
            <span v-else-if="getDetailJob.status==2" class="ss-tag ss-tag-info">รอคิวการรับ</span>
            <span v-else-if="getDetailJob.status==3" class="ss-tag ss-tag-danger">รอยืนยันคิว</span>
            <span v-else-if="getDetailJob.status==4" class="ss-tag ss-tag-warning">กำลังดำเนินการ</span>
            <span v-else-if="getDetailJob.status==5" class="ss-tag ss-tag-warning">ดำเนินการเสร็จสิ้น</span>
          </div>
          <div class="btns hide-mobile">
            <Button 
              text="ย้อนกลับ" :href="'/forwarder/job-requests/'+(getDetailJob.status+1)" 
              classer="btn-color-08 ml-2"
            />
          </div>
          <div class="btns show-mobile">
            <Button 
              text="ย้อนกลับ" :href="'/forwarder/job-requests/'+(getDetailJob.status+1)" 
              classer="btn-color-08 btn-sm ml-1" 
            />
          </div>
        </div>
      </div>
      <div v-if="getDetailJob.status == 4">
        <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
          <p class="fw-400">ยืนยันการรับสินค้า</p>
        </div>
        <div class="section-px pt-2 pb-6" data-aos="fade-up" data-aos-delay="150">
          <form :action="'/forwarder/job-request-view/' + getDetailJob._id" method="GET">
            <div class="grids">
              <div class="grid sm-100">
                <div class="btns mt-0">
                  <Button 
                    type="submit" text="ได้รับสินค้าแล้ว" 
                    classer="btn-color-01" :append="true" icon="check-white.svg" @click="receivedPackage()"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <div v-if="getDetailJob.status > 4">
        <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
          <p class="fw-400">ความพึงพอใจ</p>
        </div>
        <div class="section-px pt-2 pb-6" data-aos="fade-up" data-aos-delay="150">
          <form v-if="!getDetailJob.rating" action="/" method="GET" @submit.prevent="onSubmitComment">
            {{getJobRating}}
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
                  :value="getJobRating.rating" 
                  @input="getJobRating.rating = $event" 
                />
              </div>
              <div class="grid md-2-3 sm-100 mt-4">
                <FormGroup 
                  type="textarea" label="คำแนะนำ" placeholder="คำแนะนำ" :rows="1" 
                  :value="getJobRating.comment" 
                  @input="getJobRating.comment = $event" 
                />
              </div>
            </div>
            <div class="btns w-auto mt-4">
              <Button 
                type="submit" text="ส่งข้อความ" 
                classer="btn-color-01" :append="true" icon="send-white.svg" @click="comment()"
              />
            </div>
          </form>
          <div v-else class="grids">
            <div class="grid md-1-3 sm-50 xs-50">
              <FormGroup  type="plain" label="ระดับความพอใจ" :value="getDetailJob.rating" />
            </div>
            <div class="grid md-2-3 sm-100">
              <FormGroup  type="plain" label="คำแนะนำ" :value="getDetailJob.comment" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="getDetailJob.status == 3">
        <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
          <p class="fw-400">ยืนยันการรับสินค้า</p>
        </div>
        <div class="section-px pt-2 pb-6" data-aos="fade-up" data-aos-delay="150">
          <form v-if="!jobRequestConfirmValid" :action="'/forwarder/job-request-view/' + $route.params.jobID" method="GET">
            <div class="grids">
              <div class="grid xl-30 lg-1-3 sm-50">
                <FormGroup 
                  type="select" label="ผู้ขับรถ *" placeholder="เลือกผู้ขับรถ" :required="true" 
                  :value="getSelectDriver.driver" @input="getSelectDriver.driver = $event" 
                  :options="getDriverList"
                />
              </div>
              <div class="grid xl-25 lg-30 sm-50">
                <FormGroupTrucks
                  :required="true" :value="[
                  { 
                    number: getSelectDriver.truckNumber, 
                    numberOfPieces: getSelectDriver.numberOfPieces 
                  }
                ]" 
                  @input="[
                  { 
                    number: getSelectDriver.truckNumber, 
                    numberOfPieces: getSelectDriver.numberOfPieces 
                  }
                ] = $event" 
                />
              </div>
              <div class="grid xl-20 lg-25 sm-50">
                <FormGroupTime
                  label="ยืนยันเวลารับสินค้า *" placeholder="โปรดระบุ" :required="true" 
                  :value0="getSelectDriver.confPickupTimeHours" 
                  @input0="getSelectDriver.confPickupTimeHours = $event" 
                  :value1="getSelectDriver.confPickupTimeMinutes" 
                  @input1="getSelectDriver.confPickupTimeMinutes = $event" 
                />
              </div>
              <div class="grid sm-100">
                <div class="btns mt-0">
                  <Button 
                    type="submit" text="ยืนยันการรับสินค้า" 
                    classer="btn-color-01" :append="true" icon="check-white.svg" @click="driverSelect()"
                  />
                </div>
              </div>
            </div>
          </form>
          <div v-else class="grids">
            <div class="grid xl-30 lg-1-3 sm-50">
              <FormGroup 
                type="plain" label="ผู้ขับรถ" :value="getDetailJob.driver"
              />
            </div>
            <div class="grid xl-25 lg-30 sm-50">
              <FormGroupTrucks
                type="plain" :value="[
                  { 
                    number: getDetailJob.truckNumber, 
                    numberOfPieces: getDetailJob.numberOfPieces 
                  }
                ]" 
              />
            </div>
            <div class="grid xl-20 lg-25 sm-50">
              <FormGroup
                type="plain" label="ยืนยันเวลารับสินค้า" 
                :value="getDetailJob.confPickupTimeHours && getDetailJob.confPickupTimeMinutes
                  ? getDetailJob.confPickupTimeHours+'.'+getDetailJob.confPickupTimeMinutes+' น.': ''"
              />
            </div>
            <div v-if="getDetailJob.status < 4" class="grid sm-100">
              <div class="btns d-flex mt-0">
                <Button 
                  v-if="stepActiveIndex > 2" text="ย้อนกลับ" href="javascript:" 
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
          <!--<div class="mt-6">
            <Step01 :activeIndex="stepActiveIndex" />
          </div>-->
        </div>
      </div>
      
      <div v-if="getDetailJob.status > 0">
        <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
          <p class="fw-400">คิวการรับสินค้า</p>
        </div>
        <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
          <div class="grids">
            <div class="grid md-2-3 sm-100 mt-0">
              <div class="grids">
                <div class="grid sm-50 xs-50">
                  <FormGroup
                    type="plain" label="วันที่เที่ยวบิน" :value="formatDate(getDetailJob.flightDate, 'DD MMM YYYY')"
                  />
                </div>
                <div class="grid sm-50 xs-50">
                  <FormGroup
                    type="plain" label="จำนวนสินค้า" :value="formatNumber(getDetailJob.numberOfPieces, 0)"
                  />
                </div>
                <div class="grid sm-50 xs-50">
                  <FormGroup
                    type="plain" label="หมายเลขช่องจอด" :value="getDetailJob.dockNumber"
                  />
                </div>
                <div class="grid sm-50 xs-50">
                  <FormGroup
                    type="plain" label="เวลารับสินค้า" 
                    :value="getDetailJob.pickupTimeHours && getDetailJob.pickupTimeMinutes
                      ? getDetailJob.pickupTimeHours+'.'+getDetailJob.pickupTimeMinutes+' น.': ''"
                  />
                </div>
              </div>
            </div>
            <div v-if="getDetailJob.qrCode" class="grid md-1-3 sm-50 xs-50">
              <img class="img-qr" v-bind:src="'data:image/jpeg;base64,' + getDetailJob.qrCode" alt="QR Code" />
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="getDetailJob.status > 1">
        <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
          <p class="fw-400">ข้อมูลการสนทนา</p>
        </div>
        <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
          <div class="mt-6">
            <ChatContainer :chat="chat" :withInput="getDetailJob.status <= 4"  :roomid="$route.params.jobID"/>
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
              type="plain" label="เลขที่ Airway Bill" :value="getDetailJob.awbNumber" 
            />
          </div>
          <div class="grid xl-1-3 lg-40 md-50 sm-80">
            <FormGroup 
              type="plain" label="เลขที่ House Airway Bil" :value="getDetailJob.hwbSerialNumber" 
            />
          </div>
          <div class="sep"></div>
          <div class="grid xl-1-3 lg-40 md-50 sm-80">
            <FormGroup 
              type="plain" label="รหัสเที่ยวบิน" :value="getDetailJob.flightNumber" 
            />
          </div>
          <div class="grid xl-1-3 lg-40 md-50 sm-80">
            <FormGroup 
              type="plain" label="เลขที่งาน" :value="getDetailJob.jobNumber" 
            />
          </div>
          <div class="sep"></div>
          <div class="grid xl-1-3 lg-40 md-50 sm-80">
            <FormGroup 
              type="plain" label="เลขที่ใบขนสินค้า" :value="getDetailJob.customsEntryNumber" 
            />
          </div>
          <div class="grid xl-1-3 lg-40 md-50 sm-80">
            <FormGroup 
              type="plain" label="วันที่ได้รับเลขที่ใบสินค้า" 
              :value="formatDate(getDetailJob.customsEntryNumberDate, 'DD MMM YYYY')" 
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
import ChatContainer from '../../components/ChatContainer-ver1';
import FormGroupTime from '../../components/FormGroupTime';
import FormGroupTrucks from '../../components/FormGroupTrucksOneTruck';
import {mapGetters, mapActions, mapState} from "vuex"

export default {
  name: 'ForwarderJobRequestViewPage',
  components: {
    Topnav,
    Step01,
    ChatContainer,
    FormGroupTime,
    FormGroupTrucks
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
      jobRequest: {
        id: "60c4a753346ad76c7277ec4d",
        status: this.$route.params.status? Number(this.$route.params.status): 1,
        // status: 4,
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
        trucks: [
          { number: '', numberOfPieces: '' }
        ],
        driver: '',

        rating: '',
        comment: ''
      },

      jobRequestCommentValid: false,
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
  created() {
    this.fetchJobDetail(this.$route.params.jobID);
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
      this.jobRequest.confPickupTimeHours = this.jobRequest.pickupTimeHours;
      this.jobRequest.confPickupTimeMinutes = this.jobRequest.pickupTimeMinutes;
    }
    if(this.jobRequest.status > 3){
      this.jobRequest.driver = 'นาย ชาญชัย กล้าหาญ';
      this.jobRequest.trucks = [
        { number: '5กศ5859', numberOfPieces: 2400 }
      ];
      this.stepActiveIndex = 2;
      this.jobRequestConfirmValid = true;
    }
    if(this.jobRequest.status > 4){
      this.stepActiveIndex = 6;
    }
    console.log('detail job: ', this.getDetailJob)
  },
  computed: {
    ...mapGetters({
      getDriverList: 'ff_driver/getDriverList',
      getLoadingStatus: 'freight_forwarder/getLoadingStatus',
      getDetailJob: 'freight_forwarder/getDetailJob',
      getSelectDriver: 'freight_forwarder/getSelectDriver',
      getJobRating: 'freight_forwarder/getJobRating'
    })
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
    },
    onSubmitConfirm() {
      this.jobRequestConfirmValid = true;
      this.jobRequest.status = 4;
      this.stepActiveIndex = 2;
    },
    ...mapActions({
      fetchJobDetail: 'freight_forwarder/fetchJobDetail',
      driverOverview: 'ff_driver/overview',
      driverSelect: 'freight_forwarder/driverSelect',
      receivedPackage: 'freight_forwarder/receivedPackage',
      comment: 'freight_forwarder/comment'
    }),
    
  }
}
</script>
