<template>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" />

  <section class="section-full">
    <div class="container">
      <form action="/forwarder/drivers" method="GET" @submit="onSubmit">

        <div class="section-header mb-4" data-aos="fade-up" data-aos-delay="0">
          <div class="btns mt-0">
            <a href="/forwarder/drivers" class="btn color-gray h-color-01">
              <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
              ย้อนกลับ
            </a>
          </div>
          <div class="header-wrapper">
            <div class="text-container">
              <h6 class="h3">Edit Truck Driver</h6>
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
                text="ย้อนกลับ" href="/forwarder/drivers" classer="btn-color-08 ml-2"
              />
            </div>
            <div class="btns show-mobile">
              <Button type="submit" text="แก้ไข" classer="btn-color-01 btn-sm" />
              <Button 
                text="ลบ" href="javascript:" @click="isActivePopupDelete = !isActivePopupDelete" 
                classer="btn-color-06 btn-sm ml-1" 
              />
              <Button 
                text="ย้อนกลับ" href="/forwarder/drivers" classer="btn-color-08 btn-sm ml-1"
              />
            </div>
          </div>
        </div>

        <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
          <p class="fw-400">ข้อมูลทั่วไป</p>
        </div>
        <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
          <div class="grids">
            <div class="grid xl-10 lg-15 md-20 sm-30 xs-50">
              <FormGroup 
                type="select" label="คำนำหน้า *" :required="true" 
                :value="dataset.detail.prefix" @input="dataset.detail.prefix = $event" 
                :options="[
                  { value: 'นาย', text: 'นาย' },
                  { value: 'นาง', text: 'นาง' },
                  { value: 'นางสาว', text: 'นางสาว' }
                ]"
              />
            </div>
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="text" label="ชื่อ *" placeholder="โปรดระบุ" 
                :maxlength="64" :required="true" 
                :value="dataset.detail.firstname" @input="dataset.detail.firstname = $event" 
              />
            </div>
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="text" label="นามสกุล *" placeholder="โปรดระบุ" 
                :maxlength="64" :required="true" 
                :value="dataset.detail.lastname" @input="dataset.detail.lastname = $event" 
              />
            </div>
            <div class="sep"></div>
            
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="text" label="เบอร์โทรศัพท์ *" placeholder="โปรดระบุ" 
                :maxlength="10" :required="true" 
                :value="dataset.detail.phone" @input="dataset.detail.phone = $event" 
              />
            </div>
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="file-image" label="รูปโปรไฟล์" 
              />
            </div>
            <div class="sep"></div>
            
            <div class="grid lg-60 md-80 sm-100">
              <FormGroup 
                type="textarea" label="ที่อยู่ *" placeholder="โปรดระบุ" 
                :rows="3" :maxlength="128" :required="true" 
                :value="dataset.detail.address" @input="dataset.detail.address = $event" 
              />
            </div>
            <div class="sep"></div>
            
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="select" label="จังหวัด *" :required="true" placeholder="โปรดเลือก" 
                :value="dataset.detail.province" 
                @input="dataset.detail.province = $event" 
                :options="[
                  { value: 'กรุงเทพมหานคร', text: 'กรุงเทพมหานคร' },
                  { value: 'สมุทรปราการ', text: 'สมุทรปราการ' }
                ]"
              />
            </div>
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="text" label="รหัสไปรษณีย์ *" :required="true" 
                placeholder="โปรดระบุ" :minlength="5" :maxlength="5" 
                :value="dataset.detail.zipcode" 
                @input="dataset.detail.zipcode = $event" 
              />
            </div>
          </div>
        </div>
        
        <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
          <p class="fw-400">บัญชีผู้ใช้</p>
        </div>
        <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
          <div class="grids">
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="text" label="ชื่อผู้ใช้ *" placeholder="โปรดระบุ" :required="true" 
                :value="dataset.username" @input="dataset.username = $event" 
              />
            </div>
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="email" label="อีเมล *" placeholder="โปรดระบุ" :required="true" 
                :value="dataset.email" @input="dataset.email = $event" 
              />
            </div>
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="select" label="สถานะ *" placeholder="โปรดเลือก" 
                :value="dataset.status" @input="dataset.status = $event" 
                :options="[
                  { value: 1, text: 'เปิดใช้งาน' },
                  { value: 0, text: 'ปิดใช้งาน' }
                ]"
              />
            </div>
            <div class="sep"></div>
            
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="password" label="รหัสผ่าน *" placeholder="โปรดระบุ" 
                :value="dataset.password" @input="dataset.password = $event" 
              />
            </div>
            <div class="grid lg-30 md-40 sm-100">
              <FormGroup 
                type="password" label="ยืนยันรหัสผ่าน *" placeholder="โปรดระบุ" 
                :value="dataset.confPassword" @input="dataset.confPassword = $event" 
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
      <form action="/forwarder/drivers" method="GET" class="w-full">
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

  <Topnav :user="user" :activeIndex="topnavActiveIndex" :isBottom="true" />
</template>

<script>
import Topnav from '../../components/Topnav';

export default {
  name: 'ForwarderDriverEditPage',
  components: {
    Topnav
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

      dataset: {
        id: null,
        role: 'Driver',
        username: 'Driver0001',
        email: 'driver@gmail.com',
        avatar: '/assets/img/misc/profile.jpg',
        detail: {
          prefix: 'นาย',
          firstname: 'จริงใจ',
          lastname: 'ใจมั่นคง',
          phone: '0912345678',
          address: '999 หมู่ 1 ตำบลหนองปรือ อำเภอบางพลี',
          province: 'สมุทรปราการ',
          zipcode: '10540'
        },
        password: '',
        confPassword: '',
        status: 1,
      },

      isActivePopupDelete: false
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
  }
}
</script>
