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
              <h6 class="h3">History</h6>
            </div>
          </div>
        </div>
        <div data-aos="fade-up" data-aos-delay="150">
          <DataTable 
            :rows="rows1" 
            :columns="[
              { key: 'avatar', text: 'รูปโปรไฟล์' },
              { key: 'username', text: 'บัญชีผู้ใช้' },
              { key: 'type', text: 'ประเภท' },
              { key: 'email', text: 'อีเมล' },
              { key: 'action', text: 'การกระทำ' }
            ]" 
            :search="[ 'username', 'firstname', 'lastname', 'email' ]" 
            :orders="[
              { key: 'username-asc', text: 'ชื่อบัญชีผู้ใช้ (ใหม่สุด)' },
              { key: 'username-desc', text: 'ชื่อบัญชีผู้ใช้ (เก่าสุด)' },
              { key: 'type-desc', text: 'ประเภท (ใหม่สุด)' },
              { key: 'type-asc', text: 'ประเภท (เก่าสุด)' },
              { key: 'email-desc', text: 'อีเมล (ใหม่สุด)' },
              { key: 'email-asc', text: 'อีเมล (เก่าสุด)' }
            ]" 
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
  name: 'AdminHistoryPage',
  components: {
    Topnav,
    Sidenav,
    DataTable
  },
  data() {
    return {
      sidenavActiveIndex: 4,
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
    for(var i=0; i<24; i++){
      if(i%3 == 0){
        this.rows1.push({
          avatar: { type: 'avatar', text: '/assets/img/misc/profile.jpg' },
          username: { text: 'User000'+i },
          type: { text: 'Product Owner' },
          email: { text: 'customer@gmail.com' },
          action: { text: 'SIGN IN' }
        });
      }else if(i%3 == 1){
        this.rows1.push({
          avatar: { type: 'avatar', text: '/assets/img/misc/profile.jpg' },
          username: { text: 'User000'+i },
          type: { text: 'Company' },
          email: { text: 'company@gmail.com' },
          action: { text: 'SIGN OUT' }
        });
      }else{
        this.rows1.push({
          avatar: { type: 'avatar', text: '/assets/img/misc/profile.jpg' },
          username: { text: 'User000'+i },
          type: { text: 'Driver' },
          email: { text: 'driver@gmail.com' },
          action: { text: 'RESET PASSWORD' }
        });
      }
    }
  }
}
</script>
