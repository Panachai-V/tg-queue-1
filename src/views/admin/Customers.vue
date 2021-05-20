<template>
  <Topnav :user="user" />
  <Sidenav :user="user" :activeIndex="sidenavActiveIndex" />

  <section class="section-full pull-right">
    <div class="container">
      <div class="tab-container">
        <div class="section-header" data-aos="fade-up" data-aos-delay="0">
          <div class="btns mt-0">
            <a href="/admin" class="btn color-gray h-color-01">
              <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
              ย้อนกลับ
            </a>
          </div>
          <div class="header-wrapper">
            <div class="text-container">
              <h6 class="h3">Product Owners</h6>
            </div>
            <div class="btns hide-mobile">
              <Button 
                text="เพิ่ม" href="/admin/customer-add" 
                classer="btn-color-01" :prepend="true" icon="plus-white.svg" 
              />
            </div>
            <div class="btns show-mobile">
              <Button 
                text="เพิ่ม" href="/admin/customer-add" 
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
              { key: 'status', text: 'สถานะ' },
              { key: 'options', classer: 'options' }
            ]" 
            :search="[ 'username', 'firstname', 'lastname', 'email' ]" 
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
</template>

<script>
import Topnav from '../../components/Topnav';
import Sidenav from '../../components/Sidenav';
import DataTable from '../../components/DataTable';

export default {
  name: 'AdminCustomersPage',
  components: {
    Topnav,
    Sidenav,
    DataTable
  },
  data() {
    return {
      sidenavActiveIndex: 2,
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
      rows1: []
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    document.getElementById('color_style').href = '/assets/css/color-admin.css';
    for(var i=0; i<8; i++){
      if(i<2){
        this.rows1.push({
          avatar: { type: 'avatar', text: '/assets/img/misc/profile.jpg' },
          username: { text: 'User000'+i },
          firstname: { text: 'นาย จริงใจ' },
          lastname: { text: 'ใจมั่นคง' },
          email: { text: 'customer@gmail.com' },
          status: { type: 'tag', value: 0, text: 'ปิดใช้งาน', classer: 'ss-tag-danger' },
          options: {
            type: 'options',
            view: { type: 'link', href: '/admin/customer-view' },
            edit: { type: 'link', href: '/admin/customer-edit' }
          }
        });
      }else{
        this.rows1.push({
          avatar: { type: 'avatar', text: '/assets/img/misc/profile.jpg' },
          username: { text: 'User000'+i },
          firstname: { text: 'นาย จริงใจ' },
          lastname: { text: 'ใจมั่นคง' },
          email: { text: 'customer@gmail.com' },
          status: { type: 'tag', value: 1, text: 'เปิดใช้งาน', classer: 'ss-tag-success' },
          options: {
            type: 'options',
            view: { type: 'link', href: '/admin/customer-view' },
            edit: { type: 'link', href: '/admin/customer-edit' }
          }
        });
      }
    }
  }
}
</script>
