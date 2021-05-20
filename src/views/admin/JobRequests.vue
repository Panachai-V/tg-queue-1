<template>
  <Topnav :user="user" />
  <Sidenav :user="user" :activeIndex="sidenavActiveIndex" />

  <section class="section-full pull-right">
    <div class="container">
      <div class="tab-container">
        <div class="section-header pb-0" data-aos="fade-up" data-aos-delay="0">
          <div class="btns mt-0">
            <a href="/admin" class="btn color-gray h-color-01">
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
                text="สร้าง" href="/admin/job-request-add" 
                classer="btn-color-01" :prepend="true" icon="plus-white.svg" 
              />
            </div>
            <div class="btns show-mobile">
              <Button 
                text="สร้าง" href="/admin/job-request-add" 
                classer="btn-color-01 btn-sm" 
              />
            </div>
          </div>
          <Tabs01 
            :activeIndex="tabActiveIndex" classer="sm" 
            @clicked="tabActiveIndex = $event" 
            :tabs="[ 
              'รอการเสนอราคา', 'มีการเสนอราคาแล้ว', 'รอการเลือกคนขับ',
              'รอตารางเวลา', 'กำลังดำเนินการ', 'ดำเนินการเสร็จสิ้น' 
            ]" 
          />
        </div>
        <div class="tab-contents" data-aos="fade-up" data-aos-delay="150">

          <div class="tab-content" :class="{ 'active': tabActiveIndex == 0 }">
            <DataTable 
              :rows="rows1" 
              :columns="[
                { key: 'name', text: 'เจ้าของสินค้า' },
                { key: 'jobName', text: 'ชื่องาน' },
                { key: 'startDate', text: 'วันที่รับสินค้า' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 'name', 'jobName', 'startDate' ]" 
              :orders="[
                { key: 'startDate-desc', text: 'วันที่รับสินค้า (ใหม่สุด)' },
                { key: 'startDate-asc', text: 'วันที่รับสินค้า (เก่าสุด)' },
              ]" 
            />
          </div>

          <div class="tab-content" :class="{ 'active': tabActiveIndex == 1 }">
            <DataTable 
              :rows="rows2" 
              :columns="[
                { key: 'name', text: 'เจ้าของสินค้า' },
                { key: 'jobName', text: 'ชื่องาน' },
                { key: 'startDate', text: 'วันที่รับสินค้า' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 'name', 'jobName', 'startDate' ]" 
              :orders="[
                { key: 'startDate-desc', text: 'วันที่รับสินค้า (ใหม่สุด)' },
                { key: 'startDate-asc', text: 'วันที่รับสินค้า (เก่าสุด)' },
              ]" 
            />
          </div>

          <div class="tab-content" :class="{ 'active': tabActiveIndex == 2 }">
            <DataTable 
              :rows="rows3" 
              :columns="[
                { key: 'name', text: 'เจ้าของสินค้า' },
                { key: 'company', text: 'บริษัทขนส่ง' },
                { key: 'startDate', text: 'วันที่รับสินค้า' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 'name', 'jobName', 'startDate' ]" 
              :orders="[
                { key: 'startDate-desc', text: 'วันที่รับสินค้า (ใหม่สุด)' },
                { key: 'startDate-asc', text: 'วันที่รับสินค้า (เก่าสุด)' },
              ]" 
            />
          </div>

          <div class="tab-content" :class="{ 'active': tabActiveIndex == 3 }">
            <DataTable 
              :rows="rows4" 
              :columns="[
                { key: 'name', text: 'เจ้าของสินค้า' },
                { key: 'company', text: 'บริษัทขนส่ง' },
                { key: 'driver', text: 'ผู้ขับรถขนส่ง' },
                { key: 'startDate', text: 'วันที่รับสินค้า' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 'name', 'jobName', 'startDate' ]" 
              :orders="[
                { key: 'startDate-desc', text: 'วันที่รับสินค้า (ใหม่สุด)' },
                { key: 'startDate-asc', text: 'วันที่รับสินค้า (เก่าสุด)' },
              ]" 
            />
          </div>

          <div class="tab-content" :class="{ 'active': tabActiveIndex == 4 }">
            <DataTable 
              :rows="rows5" 
              :columns="[
                { key: 'name', text: 'เจ้าของสินค้า' },
                { key: 'company', text: 'บริษัทขนส่ง' },
                { key: 'driver', text: 'ผู้ขับรถขนส่ง' },
                { key: 'startDate', text: 'วันที่รับสินค้า' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 'name', 'jobName', 'startDate' ]" 
              :orders="[
                { key: 'startDate-desc', text: 'วันที่รับสินค้า (ใหม่สุด)' },
                { key: 'startDate-asc', text: 'วันที่รับสินค้า (เก่าสุด)' },
              ]" 
            />
          </div>

          <div class="tab-content" :class="{ 'active': tabActiveIndex == 5 }">
            <DataTable 
              :rows="rows6" 
              :columns="[
                { key: 'name', text: 'เจ้าของสินค้า' },
                { key: 'company', text: 'บริษัทขนส่ง' },
                { key: 'driver', text: 'ผู้ขับรถขนส่ง' },
                { key: 'startDate', text: 'วันที่รับสินค้า' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 'name', 'jobName', 'startDate' ]" 
              :orders="[
                { key: 'startDate-desc', text: 'วันที่รับสินค้า (ใหม่สุด)' },
                { key: 'startDate-asc', text: 'วันที่รับสินค้า (เก่าสุด)' },
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
import Sidenav from '../../components/Sidenav';
import Tabs01 from '../../components/Tabs01';
import DataTable from '../../components/DataTable';

export default {
  name: 'AdminJobRequestsPage',
  components: {
    Topnav,
    Sidenav,
    Tabs01,
    DataTable
  },
  data() {
    return {
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

      tabActiveIndex: this.$route.params.tab? Number(this.$route.params.tab): 0,
      rows1: [],
      rows2: [],
      rows3: [],
      rows4: [],
      rows5: [],
      rows6: []
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    document.getElementById('color_style').href = '/assets/css/color-admin.css';
    for(var i=0; i<7; i++){
      this.rows1.push({
        name: { text: 'นาย มงคล สีสุขสม' },
        jobName: { text: 'ขนส่งบรรจุภัณฑ์ทางการแพทย์' },
        startDate: { text: '20/05/2564 10:34 น.' },
        status: { type: 'tag', value: 0, text: 'รอการเสนอราคา' },
        options: {
          type: 'options',
          view: { type: 'link', href: '/admin/job-request-view' },
          edit: { type: 'link', href: '/admin/job-request-edit' }
        }
      });

      this.rows2.push({
        name: { 
          type: 'link', text: 'นาย มงคล สีสุขสม',
          href: '/admin/job-request-view'
        },
        jobName: { text: 'ขนส่งบรรจุภัณฑ์ทางการแพทย์' },
        startDate: { text: '20/05/2564 10:34 น.' },
        status: { type: 'tag', value: 1, text: 'เสนอราคา 3 ราย', classer: 'ss-tag-danger' },
        options: {
          type: 'options',
          view: { type: 'link', href: '/admin/job-request-view' }
        }
      });

      this.rows3.push({
        name: { 
          type: 'link', text: 'นาย มงคล สีสุขสม',
          href: '/admin/job-request-assignment'
        },
        company: { text: 'บริษัท พีอาร์เดริเวรี่ จำกัด' },
        startDate: { text: '20/05/2564 10:34 น.' },
        status: { type: 'tag', value: 2, text: 'รอการเลือกคนขับ' },
        options: {
          type: 'options',
          view: { type: 'link', href: '/admin/job-request-assignment' }
        }
      });

      this.rows4.push({
        name: { 
          type: 'link', text: 'นาย มงคล สีสุขสม',
          href: '/admin/job-request-tracking'
        },
        company: { text: 'บริษัท พีอาร์เดริเวรี่ จำกัด' },
        driver: { text: 'นาย ชาญชัย กล้าหาญ' },
        startDate: { text: '20/05/2564 10:34 น.' },
        status: { type: 'tag', value: 3, text: 'รอตารางเวลา', classer: 'ss-tag-danger' },
        options: {
          type: 'options',
          view: { type: 'link', href: '/admin/job-request-tracking' }
        }
      });

      this.rows5.push({
        name: { 
          type: 'link', text: 'นาย มงคล สีสุขสม',
          href: '/admin/job-request-tracking'
        },
        company: { text: 'บริษัท พีอาร์เดริเวรี่ จำกัด' },
        driver: { text: 'นาย ชาญชัย กล้าหาญ' },
        startDate: { text: '20/05/2564 10:34 น.' },
        status: { type: 'tag', value: 4, text: 'กำลังดำเนินการ', classer: 'ss-tag-warning' },
        options: {
          type: 'options',
          view: { type: 'link', href: '/admin/job-request-tracking' }
        }
      });

      if(i<3){
        this.rows6.push({
          name: { 
            type: 'link', text: 'นาย มงคล สีสุขสม',
            href: '/admin/job-request-result'
          },
          company: { text: 'บริษัท พีอาร์เดริเวรี่ จำกัด' },
          driver: { text: 'นาย ชาญชัย กล้าหาญ' },
          startDate: { text: '20/05/2564 10:34 น.' },
          status: { 
            type: 'tag', value: 5, text: 'ดำเนินการเสร็จสิ้น', classer: 'ss-tag-success',
            append: true, icon: '/assets/img/icon/comment-black.svg'
          },
          options: {
            type: 'options',
            view: { type: 'link', href: '/admin/job-request-result' }
          }
        });
      }else{
        this.rows6.push({
          name: { 
            type: 'link', text: 'นาย มงคล สีสุขสม',
            href: '/admin/job-request-result'
          },
          company: { text: 'บริษัท พีอาร์เดริเวรี่ จำกัด' },
          driver: { text: 'นาย ชาญชัย กล้าหาญ' },
          startDate: { text: '20/05/2564 10:34 น.' },
          status: { 
            type: 'tag', value: 5, text: 'ดำเนินการเสร็จสิ้น', classer: 'ss-tag-success'
          },
          options: {
            type: 'options',
            view: { type: 'link', href: '/admin/job-request-result' }
          }
        });
      }
    }
  }
}
</script>
