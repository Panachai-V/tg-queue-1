<template>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" />

  <section class="section-full">
    <div class="container">
      <div class="tab-container">
        <div class="section-header" data-aos="fade-up" data-aos-delay="0">
          <div class="btns mt-0">
            <a href="/forwarder/dashboard" class="btn color-gray h-color-01">
              <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
              ย้อนกลับ
            </a>
          </div>
          <div class="header-wrapper">
            <div class="text-container">
              <h6 class="h3">Truck Drivers</h6>
            </div>
            <div class="btns hide-mobile">
              <Button 
                text="เพิ่ม" href="/forwarder/driver-add" 
                classer="btn-color-01" :prepend="true" icon="plus-white.svg" 
              />
            </div>
            <div class="btns show-mobile">
              <Button 
                text="เพิ่ม" href="/forwarder/driver-add" 
                classer="btn-color-01 btn-sm" 
              />
            </div>
          </div>
        </div>
        <div data-aos="fade-up" data-aos-delay="150">
          <DataTable 
            :rows="rows1" 
            :columns="[
              { key: 'avatar', text: 'รูปโปรไฟล์' },
              { key: 'username', text: 'บัญชีผู้ใช้' },
              { key: 'firstname', text: 'ชื่อจริง' },
              { key: 'lastname', text: 'นามสกุล' },
              { key: 'email', text: 'อีเมล' },
              { key: 'phone', text: 'เบอร์โทรศัพท์' },
              { key: 'status', text: 'สถานะ' },
              { key: 'options', classer: 'options' }
            ]" 
            :search="[ 'username', 'firstname', 'lastname', 'email', 'phone' ]" 
            :orders="[
              { key: 'username-asc', text: 'ชื่อบัญชีผู้ใช้ (ใหม่สุด)' },
              { key: 'username-desc', text: 'ชื่อบัญชีผู้ใช้ (เก่าสุด)' },
              { key: 'firstname-desc', text: 'ชื่อจริง (ใหม่สุด)' },
              { key: 'firstname-asc', text: 'ชื่อจริง (เก่าสุด)' },
              { key: 'lastname-desc', text: 'นามสกุล (ใหม่สุด)' },
              { key: 'lastname-asc', text: 'นามสกุล (เก่าสุด)' },
              { key: 'email-desc', text: 'อีเมล (ใหม่สุด)' },
              { key: 'email-asc', text: 'อีเมล (เก่าสุด)' }
            ]" 
            :groups="{
              filter: 'status',
              options: [
                { text: 'เปิดใช้งาน', value: 1, checked: true },
                { text: 'ปิดใช้งาน', value: 0, checked: true }
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
import DataTable from '../../components/DataTable';

export default {
  name: 'ForwarderDriversPage',
  components: {
    Topnav,
    DataTable
  },
  data() {
    return {
      topnavActiveIndex: 2,
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

      rows1: []
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    for(var i=0; i<8; i++){
      this.rows1.push({
        avatar: { type: 'avatar', text: '/assets/img/misc/profile.jpg' },
        username: { text: 'User000'+i },
        firstname: { text: 'นาย จริงใจ' },
        lastname: { text: 'ใจมั่นคง' },
        email: { text: 'driver@gmail.com' },
        phone: { text: '0987445621' },
        status: i < 2 ? 
          { type: 'tag', value: 0, text: 'ปิดใช้งาน', classer: 'ss-tag-danger' } : 
          { type: 'tag', value: 1, text: 'เปิดใช้งาน', classer: 'ss-tag-success' },
        options: {
          type: 'options',
          view: { type: 'link', href: '/forwarder/driver-view' },
          edit: { type: 'link', href: '/forwarder/driver-edit' }
        }
      });
    }
  }
}
</script>
