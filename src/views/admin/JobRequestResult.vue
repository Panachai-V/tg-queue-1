<template>
  <Topnav :user="user" />
  <Sidenav :user="user" :activeIndex="sidenavActiveIndex" />

  <section class="section-full pull-right">
    <div class="container">

      <div class="section-header mb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="btns mt-0">
          <a href="/admin/job-requests/5" class="btn color-gray h-color-01">
            <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
            ย้อนกลับ
          </a>
        </div>
        <div class="header-wrapper">
          <div class="text-container">
            <h6 class="h3">Job Request Result</h6>
          </div>
        </div>
      </div>

      <div v-if="dataCommentValid">
        <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
          <p class="fw-400">ความพึงพอใจ</p>
        </div>
        <div class="section-px pt-2 pb-6" data-aos="fade-up" data-aos-delay="150">
          <div class="grids">
            <div class="grid md-1-3 sm-50 xs-50">
              <FormGroup  type="plain" label="ระดับความพอใจ" :value="dataComment.rating" />
            </div>
            <div class="grid md-2-3 sm-100">
              <FormGroup  type="plain" label="คำแนะนำ" :value="dataComment.comment" />
            </div>
          </div>
        </div>
      </div>

      <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
        <p class="fw-400">ตารางการเข้ารับสินค้า</p>
      </div>
      <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
        <div class="grids">
          <div class="grid md-1-3 sm-50 xs-50 mt-0">
            <div class="grids">
              <div class="grid sm-100">
                <FormGroup
                  type="plain" label="วันที่รับสินค้า" :value="formatDate(dataset.confPickupDate)"
                />
              </div>
              <div class="grid sm-100">
                <FormGroup
                  type="plain" label="เวลาที่รับสินค้า" :value="dataset.confPickupTime+' น.'"
                />
              </div>
            </div>
          </div>
          <div class="grid md-1-3 sm-50 xs-50">
            <img class="img-qr" :src="dataset.qrCode" alt="QR Code" />
          </div>
        </div>
      </div>

      <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
        <p class="fw-400">ติดตามการขนส่ง</p>
      </div>
      <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
        <div class="grids">
          <div class="grid md-1-3 sm-50">
            <FormGroup
              type="plain" label="ชื่อบริษัท" :value="dataOffer.companyName"
            />
          </div>
          <div class="grid md-1-3 sm-50">
            <FormGroup
              type="plain" label="ชื่อผู้เสนอราคา" :value="dataOffer.contactName"
            />
          </div>
          <div class="grid md-1-3 sm-50">
            <FormGroup
              type="plain" label="ราคา" :value="formatPrice(dataOffer.price)+' บาท'"
            />
          </div>
          <div class="sep"></div>
          <div class="grid md-1-3 sm-50">
            <FormGroup
              type="plain" label="วันที่เสนอราคา" :value="dataOffer.createdDate"
            />
          </div>
          <div class="grid md-1-3 sm-50">
            <FormGroup
              type="plain" label="วันที่เริ่มงาน" :value="dataOffer.acceptedDate"
            />
          </div>
          <div class="sep"></div>
          <div class="grid md-1-3 sm-50">
            <FormGroup
              type="plain" label="ผู้ขับรถ" :value="dataOffer.driverName"
            />
          </div>
          <div class="grid md-1-3 sm-50">
            <FormGroup
              type="plain" label="ประเภทรถ" :value="dataOffer.truckDetail"
            />
          </div>
        </div>
        <div class="mt-6" @click="stepActiveIndex = stepActiveIndex + 1">
          <Step01 
            :activeIndex="stepActiveIndex" 
            :icons="[
              'step-01-admin.svg', 'step-02-admin.svg', 'step-03-admin.svg', 
              'step-04-admin.svg', 'step-05-admin.svg'
            ]"  
          />
        </div>
      </div>
      <div class="section-px pb-6" data-aos="fade-up" data-aos-delay="150">
        <ChatContainer :chat="chat" :withInput="false" />
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
</template>

<script>
import moment from 'moment';
import Topnav from '../../components/Topnav';
import Sidenav from '../../components/Sidenav';
import Step01 from '../../components/Step01';
import ChatContainer from '../../components/ChatContainer';

export default {
  name: 'AdminJobRequestResultPage',
  components: {
    Topnav,
    Sidenav,
    Step01,
    ChatContainer
  },
  data() {
    return {
      stepActiveIndex: 6,
      sidenavActiveIndex: 1,
      user: {
        id: 1,
        role: 'Admin', /* Product Owner, Company, Driver, Admin */
        company: 'บริษัท พีอาร์เดริเวรี่ จำกัด',
        username: 'General User',
        prefix: 'นาย',
        firstname: 'สมศักดิ์',
        lastname: 'จริงใจ',
        email: 'user@gmail.com',
        phone: '081-1123456',
        avatar: '/assets/img/misc/profile.jpg'
      },

      isValidated: false,
      dataset: {
        name: 'ขนส่งบรรจุภัณฑ์ทางการแพทย์',
        desc: 'ขนส่งจาก TG Cargo มาที่บริษัทสาขาหลักตามที่อยู่',
        pickupDate: new Date(),
        fromProvince: 'กรุงเทพมหานคร',
        fromAddress: 'Racha Thewa, Bang Phli District, Samut Prakan 10540',
        toProvince: 'กรุงเทพมหานคร',
        toAddress: 'Racha Thewa, Bang Phli District, Samut Prakan 10540',
        confPickupDate: new Date(),
        confPickupTime: '09.45',
        qrCode: '/assets/img/misc/qr-code.jpg',
      },
      
      dataOffer: {
        companyName: 'บริษัท พีอาร์เดริเวรี่ จำกัด',
        contactName: 'นาย สมพล ใจกว้าง',
        price: 3000,
        createdDate: '20/05/2564 10:34 น.',
        acceptedDate: '20/05/2564 10:34 น.',
        driverName: 'นาย ชาญชัย กล้าหาญ',
        truckDetail: 'รถบรรทุก 6 ล้อ',
      },

      dataCommentValid: true,
      dataComment: {
        rating: 5,
        comment: 'บริษัทส่งของทำงานรวดเร็วและถูกต้อง'
      },

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
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    document.getElementById('color_style').href = '/assets/css/color-admin.css';
  },
  methods: {
    formatPrice(value) {
      let val = (value/1).toFixed(2);
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    formatDate(value) {
      return moment(String(value)).format('DD/MM/YYYY');
    }
  }
}
</script>
