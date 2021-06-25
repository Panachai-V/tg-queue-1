<template>
  <Topnav :user="user" />
  <Sidenav :user="user" :activeIndex="sidenavActiveIndex" />

  <section class="section-full pull-right">
    <div class="container">
      <form action="/admin/forwarders" method="GET" @submit="onSubmit()">

        <div class="section-header mb-4" data-aos="fade-up" data-aos-delay="0">
          <div class="btns mt-0">
            <a href="/admin/forwarders" class="btn color-gray h-color-01">
              <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
              ย้อนกลับ
            </a>
          </div>
          <div class="header-wrapper">
            <div class="text-container">
              <h6 class="h3">Edit Freight Forwarder</h6>
            </div>
            <div class="btns hide-mobile">
              <Button 
                type="submit" text="แก้ไข" 
                classer="btn-color-01" :prepend="true" icon="check-white.svg" 
              />
              <Button 
                text="ลบ" href="javascript:" @click="isActivePopupDelete = !isActivePopupDelete" 
                classer="btn-color-06 ml-2" :prepend="true" icon="close-white.svg" 
              />
              <Button 
                text="ย้อนกลับ" href="/admin/forwarders" classer="btn-color-08 ml-2"
              />
            </div>
            <div class="btns show-mobile">
              <Button type="submit" text="แก้ไข" classer="btn-color-01 btn-sm" />
              <Button 
                text="ลบ" href="javascript:" @click="isActivePopupDelete = !isActivePopupDelete" 
                classer="btn-color-06 btn-sm ml-1" 
              />
              <Button 
                text="ย้อนกลับ" href="/admin/forwarders" classer="btn-color-08 btn-sm ml-1"
              />
            </div>
          </div>
        </div>

        <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
          <p class="fw-400">ข้อมูลบริษัท</p>
        </div>
        <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150" v-if="!getLoadingStatus">
          <div class="grids">
            <div class="grid xl-60 lg-70 sm-100">
              <FormGroup 
                type="text" label="ชื่อบรืษัท *" :required="true" 
                :maxlength="56" placeholder="โปรดระบุ" 
                :value="getforwardersEditDetail.company_name" 
                @input="getforwardersEditDetail.company_name = $event" 
              />
            </div>
            <div class="sep"></div>
            <div class="grid xl-60 lg-70 sm-100">
              <FormGroup 
                type="textarea" label="ที่อยู่บริษัท *" :required="true" 
                :rows="3" :maxlength="128" placeholder="โปรดระบุ" 
                :value="getforwardersEditDetail.address" 
                @input="getforwardersEditDetail.address = $event" 
              />
            </div>
            <div class="sep"></div>
            <div class="grid xl-30 lg-35">
              <FormGroup 
                type="select" label="จังหวัด *" :required="true" placeholder="โปรดเลือก" 
                :value="getforwardersEditDetail.province" 
                @input="getforwardersEditDetail.province = $event" 
                :options="getProvince"
              />
            </div>
            <div class="grid xl-30 lg-35">
              <FormGroup 
                type="text" label="รหัสไปรษณีย์ *" :required="true" 
                placeholder="โปรดระบุ" :minlength="5" :maxlength="5" 
                :value="getforwardersEditDetail.postal" 
                @input="getforwardersEditDetail.postal = $event" 
              />
            </div>
            <div class="sep"></div>
            <div class="grid xl-30 lg-35">
              <FormGroup 
                type="text" label="เลขประจำตัวผู้เสียภาษี *" :required="true" 
                placeholder="โปรดระบุ" :minlength="13" :maxlength="13" 
                :value="getforwardersEditDetail.tax_id" 
                @input="getforwardersEditDetail.tax_id = $event" 
                :disabled="true" :readonly="true"
              />
            </div>
            <div class="grid xl-30 lg-35">
              <FormGroup 
                type="select" label="สถานะ *" placeholder="โปรดเลือก" 
                :value="getforwardersEditDetail.status" 
                @input="getforwardersEditDetail.status = $event" 
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
  
  <!-- Popup Delete -->
  <div class="popup-container" :class="{ 'active': isActivePopupDelete }">
    <div class="wrapper">
      <div class="close-filter" @click="isActivePopupDelete = !isActivePopupDelete"></div>
      <form action="/admin/forwarders" method="GET" class="w-full" @submit="freightForwardersDelete">
        <div class="popup-box">
          <div class="header">
            <div class="btns mt-0">
              <a href="javascript:" class="btn btn-close" @click="isActivePopupDelete = !isActivePopupDelete">
                <img class="icon-prepend xs" src="/assets/img/icon/close.svg" alt="Image Icon" />
                ปิดหน้าต่าง
              </a>
            </div>
            <div class="header-wrapper">
              <div class="text-container">
                <h6 class="h3">ยืนยันการลบ</h6>
              </div>
              <div class="btns hide-mobile">
                <Button 
                  type="submit" text="ลบ" classer="btn-color-06 mr-2" 
                  :prepend="true" icon="close-white.svg" 
                />
                <Button 
                  text="ปิด" href="javascript:" classer="btn-color-08" 
                  @click="isActivePopupDelete = !isActivePopupDelete"
                />
              </div>
              <div class="btns show-mobile">
                <Button 
                  type="submit" text="ลบ" classer="btn-color-06 btn-sm mr-1" 
                />
                <Button 
                  text="ปิด" href="javascript:" classer="btn-color-08 btn-sm" 
                  @click="isActivePopupDelete = !isActivePopupDelete"
                />
              </div>
            </div>
          </div>
          <div class="body pt-4 pb-5">
            <p class="color-gray">หมายเหตุ</p>
            <p class="mt-2">
              ยืนยันการลบ โดยข้อมูลจะถูกลบออกจากระบบทันที และไม่สามารถกู้คืนมาได้
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Topnav from '../../components/Topnav';
import Sidenav from '../../components/Sidenav';
import {mapGetters, mapActions, mapState} from "vuex";

export default {
  name: 'AdminForwarderEditPage',
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
        name: 'บริษัท เอบีดีริเวรี่ จำกัด',
        address: '999 หมู่ 1 ตำบลหนองปรือ อำเภอบางพลี',
        province: 'สมุทรปราการ',
        zipcode: '10540',
        taxId: '500218893025',
        status: 1
      },

      isActivePopupDelete: false
    }
  },
  computed: {
    ...mapGetters({
      getLoadingStatus: 'admin/getLoadingStatus',
      getForwardersDetail: 'admin/getForwardersDetail',
      getforwardersEditDetail: 'admin/getforwardersEditDetail',
      getProvince: 'master/getProvince'
    })
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    document.getElementById('color_style').href = '/assets/css/color-admin.css';
    this.freightForwardersDetail(this.$route.params.tax_id)
    this.actionProvince()    
  },
  methods: {
    ...mapActions({
      freightForwardersDetail: 'admin/freightForwardersDetail',
      freightForwardersEdit: 'admin/freightForwardersEdit',
      freightForwardersDelete: 'admin/freightForwardersDelete',
      actionProvince: 'master/province'
    }),
    onSubmit() {      
      this.freightForwardersEdit().then(
            response => {
              console.log("freightForwarders edited")
            },
            error => {
              console.log("error: ",error.response.data.message)
            }
      );
    }
  }
}
</script>
