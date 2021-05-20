<template>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" />

  <section class="section-full">
    <div class="container">
      <div class="tab-container">
        <div class="section-header pb-0" data-aos="fade-up" data-aos-delay="0">
          <div class="btns mt-0">
            <a href="/customer/dashboard" class="btn color-gray h-color-01">
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
                text="สร้าง" href="/customer/job-request-add" 
                classer="btn-color-01" :prepend="true" icon="plus-white.svg" 
              />
            </div>
            <div class="btns show-mobile">
              <Button 
                text="สร้าง" href="/customer/job-request-add" 
                classer="btn-color-01 btn-sm" 
              />
            </div>
          </div>
          <Tabs01 
            :activeIndex="tabActiveIndex" 
            @clicked="tabActiveIndex = $event" 
            :tabs="[ 'รอการเสนอราคา', 'กำลังดำเนินการ', 'ดำเนินการเสร็จสิ้น' ]" 
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
              :groups="{
                filter: 'status',
                options: [
                  { text: 'รอการเสนอราคา', value: 0, checked: true },
                  { text: 'เสนอราคาแล้ว', value: 1, checked: true }
                ]
              }" 
            />
          </div>
          
          <div class="tab-content" :class="{ 'active': tabActiveIndex == 1 }">
            <DataTable 
              :rows="rows2" 
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
                  { text: 'รอตารางเวลา', value: 3, checked: true },
                  { text: 'กำลังดำเนินการ', value: 4, checked: true }
                ]
              }" 
            />
          </div>
          
          <div class="tab-content" :class="{ 'active': tabActiveIndex == 2 }">
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

  <Topnav :user="user" :activeIndex="topnavActiveIndex" :isBottom="true" />
</template>

<script>
import Topnav from '../../components/Topnav';
import Tabs01 from '../../components/Tabs01';
import DataTable from '../../components/DataTable';

export default {
  name: 'CustomerJobRequestsPage',
  components: {
    Topnav,
    Tabs01,
    DataTable
  },
  data() {
    return {
      topnavActiveIndex: 1,
      user: {
        id: 1,
        role: 'Product Owner', /* Product Owner, Company, Driver, Admin */
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
      rows2: [],
      rows3: []
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    for(var i=0; i<12; i++){
      if(i<3){
        this.rows1.push({
          name: { text: 'ขนส่งบรรจุภัณฑ์ทางการแพทย์' },
          startDate: { text: '20/05/2564' },
          fromLocation: { text: 'กรุงเทพมหานคร' },
          toLocation: { text: 'ชลบุรี' },
          createdDate: { text: '20/05/2564' },
          status: { type: 'tag', value: 0, text: 'รอการเสนอราคา' },
          options: {
            type: 'options',
            view: { type: 'link', href: '/customer/job-request-view' },
            edit: { type: 'link', href: '/customer/job-request-edit' }
          }
        });
      }else{
        this.rows1.push({
          name: { text: 'ขนส่งบรรจุภัณฑ์ทางการแพทย์' },
          startDate: { text: '20/05/2564' },
          fromLocation: { text: 'กรุงเทพมหานคร' },
          toLocation: { text: 'ชลบุรี' },
          createdDate: { text: '20/05/2564' },
          status: { type: 'tag', value: 1, text: 'เสนอราคา 3 ราย', classer: 'ss-tag-danger' },
          options: {
            type: 'options',
            view: { type: 'link', href: '/customer/job-request-view' }
          }
        });
      }
      
      if(i<3){
        this.rows2.push({
          name: { 
            text: 'ขนส่งบรรจุภัณฑ์ทางการแพทย์', 
            type: 'link', href: '/customer/job-request-tracking'
          },
          startDate: { text: '20/05/2564' },
          fromLocation: { text: 'กรุงเทพมหานคร' },
          toLocation: { text: 'ชลบุรี' },
          createdDate: { text: '20/05/2564' },
          status: { type: 'tag', value: 4, text: 'กำลังดำเนินการ', classer: 'ss-tag-warning' },
          options: {
            type: 'options',
            view: { type: 'link', href: '/customer/job-request-tracking' }
          }
        });
      }else{
        this.rows2.push({
          name: { 
            text: 'ขนส่งบรรจุภัณฑ์ทางการแพทย์', 
            type: 'link', href: '/customer/job-request-tracking'
          },
          startDate: { text: '20/05/2564' },
          fromLocation: { text: 'กรุงเทพมหานคร' },
          toLocation: { text: 'ชลบุรี' },
          createdDate: { text: '20/05/2564' },
          status: { type: 'tag', value: 3, text: 'รอตารางเวลา', classer: 'ss-tag-danger' },
          options: {
            type: 'options',
            view: { type: 'link', href: '/customer/job-request-tracking' }
          }
        });
      }
      
      if(i<3){
        this.rows3.push({
          name: { 
            text: 'ขนส่งบรรจุภัณฑ์ทางการแพทย์', 
            type: 'link', href: '/customer/job-request-result'
          },
          startDate: { text: '20/05/2564' },
          fromLocation: { text: 'กรุงเทพมหานคร' },
          toLocation: { text: 'ชลบุรี' },
          createdDate: { text: '20/05/2564' },
          status: { 
            type: 'tag', text: 'ดำเนินการเสร็จสิ้น', classer: 'ss-tag-success',
            append: true, icon: '/assets/img/icon/comment-black.svg'
          },
          options: {
            type: 'options',
            view: { type: 'link', href: '/customer/job-request-result' }
          }
        });
      }else{
        this.rows3.push({
          name: { 
            text: 'ขนส่งบรรจุภัณฑ์ทางการแพทย์', 
            type: 'link', href: '/customer/job-request-result'
          },
          startDate: { text: '20/05/2564' },
          fromLocation: { text: 'กรุงเทพมหานคร' },
          toLocation: { text: 'ชลบุรี' },
          createdDate: { text: '20/05/2564' },
          status: { type: 'tag', text: 'ดำเนินการเสร็จสิ้น', classer: 'ss-tag-success' },
          options: {
            type: 'options',
            view: { type: 'link', href: '/customer/job-request-result' }
          }
        });
      }
    }
  }
}
</script>
