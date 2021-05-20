<template>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" />

  <section class="section-full">
    <div class="container">
      <div class="tab-container">
        <div class="section-header" data-aos="fade-up" data-aos-delay="0">
          <div class="btns mt-0">
            <a href="/company/dashboard" class="btn color-gray h-color-01">
              <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
              ย้อนกลับ
            </a>
          </div>
          <div class="header-wrapper">
            <div class="text-container">
              <h6 class="h3">Job Requests</h6>
            </div>
          </div>
        </div>
        <div data-aos="fade-up" data-aos-delay="150">
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
            :groups="{
              filter: 'status',
              options: [
                { text: 'รอการเสนอราคา', value: 0, checked: true },
                { text: 'เสนอราคาแล้ว', value: 1, checked: true }
              ]
            }" 
          />
        </div>
      </div>
    </div>
  </section>

  <Topnav :user="user" :activeIndex="topnavActiveIndex" :isBottom="true" />
</template>

<script>
import Topnav from '../../components/Topnav';
import PopupOptions from '../../components/PopupOptions';
import Tabs01 from '../../components/Tabs01';
import DataTable from '../../components/DataTable';

export default {
  name: 'CompanyJobRequestsPage',
  components: {
    Topnav,
    PopupOptions,
    Tabs01,
    DataTable
  },
  data() {
    return {
      topnavActiveIndex: 1,
      user: {
        id: 1,
        role: 'Company', /* Product Owner, Company, Driver, Admin */
        company: 'บริษัท พีอาร์เดริเวรี่ จำกัด',
        username: 'General User',
        prefix: 'นาย',
        firstname: 'สมศักดิ์',
        lastname: 'จริงใจ',
        email: 'user@gmail.com',
        phone: '081-1123456',
        avatar: '/assets/img/misc/profile.jpg'
      },
      rows1: []
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    document.getElementById('color_style').href = '/assets/css/color-company.css';
    for(var i=0; i<12; i++){
      if(i<4){
        this.rows1.push({
          name: { text: 'ขนส่งบรรจุภัณฑ์ทางการแพทย์' },
          startDate: { text: '20/05/2564 10:34 น.' },
          fromLocation: { text: 'กรุงเทพมหานคร' },
          toLocation: { text: 'ชลบุรี' },
          createdDate: { text: '20/05/2564 10:34 น.' },
          status: { type: 'tag', value: 1, text: 'เสนอราคาแล้ว', classer: 'ss-tag-danger' },
          options: {
            type: 'options',
            view: { type: 'link', href: '/company/job-request-view' }
          }
        });
      }else{
        this.rows1.push({
          name: { text: 'ขนส่งบรรจุภัณฑ์ทางการแพทย์' },
          startDate: { text: '20/05/2564 10:34 น.' },
          fromLocation: { text: 'กรุงเทพมหานคร' },
          toLocation: { text: 'ชลบุรี' },
          createdDate: { text: '20/05/2564 10:34 น.' },
          status: { type: 'tag', value: 0, text: 'รอการเสนอราคา' },
          options: {
            type: 'options',
            view: { type: 'link', href: '/company/job-request-view' }
          }
        });
      }
    }
  }
}
</script>
