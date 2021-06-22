<template>
  <Topnav :user="user" />
  <Sidenav :user="user" :activeIndex="sidenavActiveIndex" />

  <section class="section-full pull-right">
    <div class="container">
      <div class="tab-container">
        <div class="section-header" data-aos="fade-up" data-aos-delay="0">
          <div class="btns mt-0">
            <a href="/admin/dashboard" class="btn color-gray h-color-01">
              <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
              ย้อนกลับ
            </a>
          </div>
          <div class="header-wrapper">
            <div class="text-container">
              <h6 class="h3">Freight Forwarders</h6>
            </div>
            <div class="btns hide-mobile">
              <Button 
                text="เพิ่ม" href="/admin/forwarder-add" 
                classer="btn-color-01" :prepend="true" icon="plus-white.svg" 
              />
            </div>
            <div class="btns show-mobile">
              <Button 
                text="เพิ่ม" href="/admin/forwarder-add" 
                classer="btn-color-01 btn-sm" 
              />
            </div>
          </div>
        </div>
        <div data-aos="fade-up" data-aos-delay="150" v-if="getLoadingStatus == false">
          <DataTable 
            :rows="getForwarders" 
            :columns="[
              { key: 'company_name', text: 'ชื่อบริษัท' },
              { key: 'province', text: 'จังหวัด' },
              { key: 'zipcode', text: 'รหัสไปรษณีย์' },
              { key: 'totalDrivers', text: 'จำนวนคนขับรถ' },
              { key: 'job_count', text: 'จำนวนงานที่เสร็จ' },
              { key: 'status', text: 'สถานะ' },
              { key: 'options', classer: 'options' }
            ]" 
            :search="[ 'username', 'firstname', 'lastname', 'email' ]" 
            :orders="[
              { key: 'company_name-ascending', text: 'ชื่อบริษัท (ใหม่สุด)' },
              { key: 'company_name-descending', text: 'ชื่อบริษัท (เก่าสุด)' },
              { key: 'status-descending', text: 'สถานะ (ใหม่สุด)' },
              { key: 'status-ascending', text: 'สถานะ (เก่าสุด)' },
              { key: 'province-descending', text: 'จังหวัด (ใหม่สุด)' },
              { key: 'province-ascending', text: 'จังหวัด (เก่าสุด)' },
              { key: 'job_count-descending', text: 'totalJobRequests (ใหม่สุด)' },
              { key: 'job_count-ascending', text: 'totalJobRequests (เก่าสุด)' }
            ]" 
            :groups="{
              filter: 'status',
              options: [
                { text: 'เปิดใช้งาน', value: 1, checked: true },
                { text: 'ปิดใช้งาน', value: 0, checked: true }
              ]
            }"
            :store="store" 
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Topnav from '../../components/Topnav';
import Sidenav from '../../components/Sidenav';
import DataTable from '../../components/DataTable-paginage';
import {mapGetters, mapActions, mapState} from "vuex";

export default {
  name: 'AdminForwardersPage',
  components: {
    Topnav,
    Sidenav,
    DataTable
  },
  data() {
    return {
      sidenavActiveIndex: 2,
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
      rows1: [],
      store: 'admin'
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'auth/getUser',
      getLoadingStatus: 'admin/getLoadingStatus',
      getForwarders: 'admin/getForwarders'
    })
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    document.getElementById('color_style').href = '/assets/css/color-admin.css';
    for(var i=0; i<8; i++){
      this.rows1.push({
        name: { text: 'บริษัท เอบีดีริเวรี่ จำกัด' },
        province: { text: 'สมุทรปราการ' },
        zipcode: { text: '10540' },
        totalDrivers: { text: '14 คน' },
        totalJobRequests: { text: '22 งาน' },
        status: i > 5 ? 
          { type: 'tag', value: 0, text: 'ปิดใช้งาน', classer: 'ss-tag-danger' } :
          { type: 'tag', value: 1, text: 'เปิดใช้งาน', classer: 'ss-tag-success' },
        options: {
          type: 'options',
          view: { type: 'link', href: '/admin/forwarder-view' },
          edit: { type: 'link', href: '/admin/forwarder-edit' }
        }
      });
    }
    this.forwardersOverview()
  },
  methods: {
    ...mapActions({
      forwardersOverview: 'admin/forwardersOverview'
    })
  }
}
</script>
