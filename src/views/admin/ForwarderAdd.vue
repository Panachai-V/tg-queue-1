<template>
  <Topnav :user="user" />
  <Sidenav :user="user" :activeIndex="sidenavActiveIndex" />

  <section class="section-full pull-right">
    <div class="container">
      <form action="/admin/forwarders" method="GET" @submit="freightForwardersCreate">

        <div class="section-header mb-4" data-aos="fade-up" data-aos-delay="0">
          <div class="btns mt-0">
            <a href="/admin/forwarders" class="btn color-gray h-color-01">
              <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
              ย้อนกลับ
            </a>
          </div>
          <div class="header-wrapper">
            <div class="text-container">
              <h6 class="h3">Add Freight Forwarder</h6>
            </div>
            <div class="btns hide-mobile">
              <Button 
                type="submit" text="เพิ่ม" 
                classer="btn-color-01" :prepend="true" icon="plus-white.svg"
              />
              <Button 
                text="ย้อนกลับ" href="/admin/forwarders" classer="btn-color-08 ml-2"
              />
            </div>
            <div class="btns show-mobile">
              <Button type="submit" text="เพิ่ม" classer="btn-color-01 btn-sm" @click="freightForwardersCreate()" />
              <Button 
                text="ย้อนกลับ" href="/admin/forwarders" classer="btn-color-08 btn-sm ml-1"
              />
            </div>
          </div>
        </div>

        <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
          <p class="fw-400">ข้อมูลบริษัท</p>
        </div>
        <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
          {{getForwardersCreateDetail}}
          <div class="grids">
            <div class="grid xl-60 lg-70 sm-100">
              <FormGroup 
                type="text" label="ชื่อบรืษัท *" :required="true" 
                :maxlength="56" placeholder="โปรดระบุ" 
                :value="getForwardersCreateDetail.name" 
                @input="getForwardersCreateDetail.name = $event" 
              />
            </div>
            <div class="sep"></div>
            <div class="grid xl-60 lg-70 sm-100">
              <FormGroup 
                type="textarea" label="ที่อยู่บริษัท *" :required="true" 
                :rows="3" :maxlength="128" placeholder="โปรดระบุ" 
                :value="getForwardersCreateDetail.address" 
                @input="getForwardersCreateDetail.address = $event" 
              />
            </div>
            <div class="sep"></div>
            <div class="grid xl-30 lg-35">
              <FormGroup 
                type="select" label="จังหวัด *" :required="true" placeholder="โปรดเลือก" 
                :value="getForwardersCreateDetail.province" 
                @input="getForwardersCreateDetail.province = $event" 
                :options="getProvince"
              />
            </div>
            <div class="grid xl-30 lg-35">
              <FormGroup 
                type="text" label="รหัสไปรษณีย์ *" :required="true" 
                placeholder="โปรดระบุ" :minlength="5" :maxlength="5" 
                :value="getForwardersCreateDetail.postal" 
                @input="getForwardersCreateDetail.postal = $event" 
              />
            </div>
            <div class="sep"></div>
            <div class="grid xl-30 lg-35">
              <FormGroup 
                type="text" label="เลขประจำตัวผู้เสียภาษี *" :required="true" 
                placeholder="โปรดระบุ" :minlength="13" :maxlength="13" 
                :value="getForwardersCreateDetail.taxid" 
                @input="getForwardersCreateDetail.taxid = $event" 
              />
            </div>
            <div class="grid xl-30 lg-35">
              <FormGroup 
                type="select" label="สถานะ *" placeholder="โปรดเลือก" 
                :value="getForwardersCreateDetail.status" 
                @input="getForwardersCreateDetail.status = $event" 
                :options="[
                  { value: true, text: 'เปิดใช้งาน' },
                  { value: false, text: 'ปิดใช้งาน' }
                ]" 
              />
            </div>
          </div>
        </div>

      </form>
    </div>
  </section>
</template>

<script>
import Topnav from '../../components/Topnav';
import Sidenav from '../../components/Sidenav';
import {mapGetters, mapActions} from "vuex"

export default {
  name: 'AdminForwarderAddPage',
  components: {
    Topnav,
    Sidenav
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
      datasetCompany: {
        id: null,
        name: '',
        address: '',
        province: '',
        zipcode: '',
        taxId: '',
        status: 1
      }
    }
  },
  computed: {
    ...mapGetters({
      getProvince: 'master/getProvince',
      getForwardersCreateDetail: 'admin/getForwardersCreateDetail'
    })    
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    document.getElementById('color_style').href = '/assets/css/color-admin.css';
    this.actionProvince()
  },
  methods: {
    ...mapActions({
      actionProvince: 'master/province',
      freightForwardersCreate: 'admin/freightForwardersCreate'
    })
  }
}
</script>
