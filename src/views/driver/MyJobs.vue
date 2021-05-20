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
        <div class="tab-contents" data-aos="fade-up" data-aos-delay="150">
          
          <div class="tab-content" :class="{ 'active': tabActiveIndex == 0 }">
            <DataTable 
              :rows="rows1" 
              :columns="[
                { key: 'name', text: 'ชื่องาน' },
                { key: 'startDate', text: 'วันที่รับสินค้า' },
                { key: 'fromLocation', text: 'ที่รับสินค้า' },
                { key: 'toLocation', text: 'ที่ส่งสินค้า' },
                { key: 'createdDate', text: 'วันที่สร้าง' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 'name', 'startDate', 'fromLocation', 'toLocation' ]" 
              :orders="[
                { key: 'startDate-desc', text: 'วันที่รับสินค้า (ใหม่สุด)' },
                { key: 'startDate-asc', text: 'วันที่รับสินค้า (เก่าสุด)' },
                { key: 'createdDate-desc', text: 'วันที่สร้าง (ใหม่สุด)' },
                { key: 'createdDate-asc', text: 'วันที่สร้าง (เก่าสุด)' }
              ]" 
            />
          </div>
          
          <div class="tab-content" :class="{ 'active': tabActiveIndex == 1 }">
            <DataTable 
              :rows="rows3" 
              :columns="[
                { key: 'name', text: 'ชื่องาน' },
                { key: 'startDate', text: 'วันที่รับสินค้า' },
                { key: 'fromLocation', text: 'ที่รับสินค้า' },
                { key: 'toLocation', text: 'ที่ส่งสินค้า' },
                { key: 'createdDate', text: 'วันที่สร้าง' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 'name', 'startDate', 'fromLocation', 'toLocation' ]" 
              :orders="[
                { key: 'startDate-desc', text: 'วันที่รับสินค้า (ใหม่สุด)' },
                { key: 'startDate-asc', text: 'วันที่รับสินค้า (เก่าสุด)' },
                { key: 'createdDate-desc', text: 'วันที่สร้าง (ใหม่สุด)' },
                { key: 'createdDate-asc', text: 'วันที่สร้าง (เก่าสุด)' }
              ]"
            />
          </div>
          
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Topnav from '../../components/Topnav';
import Tabs01 from '../../components/Tabs01';
import DataTable from '../../components/DataTable';

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
        id: 1,
        role: 'Driver', /* Product Owner, Company, Driver, Admin */
        company: 'บริษัท พีอาร์เดริเวรี่ จำกัด',
        username: 'General User',
        prefix: 'นาย',
        firstname: 'สมศักดิ์',
        lastname: 'จริงใจ',
        email: 'user@gmail.com',
        phone: '081-1123456',
        avatar: '/assets/img/misc/profile.jpg'
      },
      tabActiveIndex: this.$route.params.tab? Number(this.$route.params.tab): 0,
      rows1: [],
      rows3: []
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    document.getElementById('color_style').href = '/assets/css/color-driver.css';
    for(var i=0; i<4; i++){
      this.rows1.push({
        name: { 
          text: 'ขนส่งบรรจุภัณฑ์ทางการแพทย์',
          type: 'link', href: '/driver/my-job-tracking' 
        },
        startDate: { text: '20/05/2564 10:34 น.' },
        fromLocation: { text: 'กรุงเทพมหานคร' },
        toLocation: { text: 'ชลบุรี' },
        createdDate: { text: '20/05/2564 10:34 น.' },
        status: { type: 'tag', value: 1, text: 'กำลังดำเนินการ', classer: 'ss-tag-warning' },
        options: {
          type: 'options',
          view: { type: 'link', href: '/driver/my-job-tracking' }
        }
      });
      
      if(i<2){
        this.rows3.push({
          name: { 
            text: 'ขนส่งบรรจุภัณฑ์ทางการแพทย์', 
            type: 'link', href: '/driver/my-job-result'
          },
          startDate: { text: '20/05/2564 10:34 น.' },
          fromLocation: { text: 'กรุงเทพมหานคร' },
          toLocation: { text: 'ชลบุรี' },
          createdDate: { text: '20/05/2564 10:34 น.' },
          status: { 
            type: 'tag', text: 'ดำเนินการเสร็จสิ้น', classer: 'ss-tag-success',
            append: true, icon: '/assets/img/icon/comment-black.svg'
          },
          options: {
            type: 'options',
            view: { type: 'link', href: '/driver/my-job-result' }
          }
        });
      }else{
        this.rows3.push({
          name: { 
            text: 'ขนส่งบรรจุภัณฑ์ทางการแพทย์', 
            type: 'link', href: '/driver/my-job-result'
          },
          startDate: { text: '20/05/2564 10:34 น.' },
          fromLocation: { text: 'กรุงเทพมหานคร' },
          toLocation: { text: 'ชลบุรี' },
          createdDate: { text: '20/05/2564 10:34 น.' },
          status: { type: 'tag', text: 'ดำเนินการเสร็จสิ้น', classer: 'ss-tag-success' },
          options: {
            type: 'options',
            view: { type: 'link', href: '/driver/my-job-result' }
          }
        });
      }
    }
  }
}
</script>
