<template>
  <Topnav :user="user" />
  <Sidenav :user="user" :activeIndex="sidenavActiveIndex" />

  <section class="section-full pull-right">
    <div class="container">
      <form action="/admin/forwarders" method="GET" @submit="onSubmit">

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
              <Button type="submit" text="เพิ่ม" classer="btn-color-01 btn-sm" />
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
          <div class="grids">
            <div class="grid xl-60 lg-70 sm-100">
              <FormGroup 
                type="text" label="ชื่อบรืษัท *" :required="true" 
                :maxlength="56" placeholder="โปรดระบุ" 
                :value="datasetCompany.name" 
                @input="datasetCompany.name = $event" 
              />
            </div>
            <div class="sep"></div>
            <div class="grid xl-60 lg-70 sm-100">
              <FormGroup 
                type="textarea" label="ที่อยู่บริษัท *" :required="true" 
                :rows="3" :maxlength="128" placeholder="โปรดระบุ" 
                :value="datasetCompany.address" 
                @input="datasetCompany.address = $event" 
              />
            </div>
            <div class="sep"></div>
            <div class="grid xl-30 lg-35">
              <FormGroup 
                type="select" label="จังหวัด *" :required="true" placeholder="โปรดเลือก" 
                :value="datasetCompany.province" 
                @input="datasetCompany.province = $event" 
                :options="[
                  { value: 'กรุงเทพมหานคร', text: 'กรุงเทพมหานคร' },
                  { value: 'สมุทรปราการ', text: 'สมุทรปราการ' }
                ]"
              />
            </div>
            <div class="grid xl-30 lg-35">
              <FormGroup 
                type="text" label="รหัสไปรษณีย์ *" :required="true" 
                placeholder="โปรดระบุ" :minlength="5" :maxlength="5" 
                :value="datasetCompany.zipcode" 
                @input="datasetCompany.zipcode = $event" 
              />
            </div>
            <div class="sep"></div>
            <div class="grid xl-30 lg-35">
              <FormGroup 
                type="text" label="เลขประจำตัวผู้เสียภาษี *" :required="true" 
                placeholder="โปรดระบุ" :minlength="13" :maxlength="13" 
                :value="datasetCompany.taxId" 
                @input="datasetCompany.taxId = $event" 
              />
            </div>
            <div class="grid xl-30 lg-35">
              <FormGroup 
                type="select" label="สถานะ *" placeholder="โปรดเลือก" 
                :value="datasetCompany.status" 
                @input="datasetCompany.status = $event" 
                :options="[
                  { value: 1, text: 'เปิดใช้งาน' },
                  { value: 0, text: 'ปิดใช้งาน' }
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
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    document.getElementById('color_style').href = '/assets/css/color-admin.css';
  }
}
</script>
