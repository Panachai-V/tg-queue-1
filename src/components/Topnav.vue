<template>

  <nav v-if="user" class="topnav" :class="{ 'bottom': isBottom }">
    <div class="wrapper">

      <!-- Logo -->
      <a v-if="!isBottom" class="logo" href="/">
        <img src="/assets/img/logo.png" alt="Logo" />
        <div class="text-container">
          <p class="lg fw-500 color-01">TG Smart Backhaul</p>
          <p class="sm fw-400 color-gray">Queue Management</p>
        </div>
      </a>

      <!-- Menu - Freight Forwarder -->
      <div v-if="isFreightForwarder()" class="menu-container" :class="{ 'hide-mobile': !isBottom }">
        <div class="menu" :class="{ 'active': activeIndex == 0 }">
          <a href="/forwarder/dashboard">
            <div class="icon">
              <img src="/assets/img/icon/home.svg" alt="Image Icon" />
            </div>
            <div class="text">Dashboard</div>
          </a>
        </div>
        <div class="menu" :class="{ 'active': activeIndex == 1 }">
          <a href="/forwarder/job-requests">
            <div class="icon">
              <img src="/assets/img/icon/request.svg" alt="Image Icon" />
            </div>
            <div class="text">Job Requests</div>
          </a>
        </div>
        <div class="menu" :class="{ 'active': activeIndex == 2 }">
          <a href="/forwarder/drivers">
            <div class="icon">
              <img src="/assets/img/icon/users.svg" alt="Image Icon" />
            </div>
            <div class="text">Truck Drivers</div>
          </a>
        </div>
      </div>
      
      <!-- Menu - TG Admin -->
      <div v-else-if="isTGAdmin()" class="menu-container" :class="{ 'hide-mobile': !isBottom }">
        <div class="menu" :class="{ 'active': activeIndex == 0 }">
          <a href="/tgadmin/dashboard">
            <div class="icon">
              <img src="/assets/img/icon/home-company.svg" alt="Image Icon" />
            </div>
            <div class="text">Dashboard</div>
          </a>
        </div>
        <div class="menu" :class="{ 'active': activeIndex == 1 }">
          <a href="/tgadmin/job-requests">
            <div class="icon">
              <img src="/assets/img/icon/request-company.svg" alt="Image Icon" />
            </div>
            <div class="text">Job Requests</div>
          </a>
        </div>
      </div>

      <!-- User Profile -->
      <div v-if="!isBottom" class="options">
        <div class="option">
          <a href="#">
            <img src="/assets/img/icon/bell.svg" alt="Image Icon" />
            <div v-if="alert" class="num">{{alert}}</div>
          </a>
        </div>
        <div class="option">
          <a href="javascript:">
            <div class="info text-right hide-mobile mr-2">
              <p class="lh-sm">
                {{user.detail.prefix}}{{user.detail.firstname}} 
                {{user.detail.lastname}}
              </p>
              <p class="sm lh-xs">{{user.email}}</p>
            </div>
            <div v-if="user.detail.avatar">
              <img class="img-bg" v-bind:src="'data:image/jpeg;base64,' + user.detail.avatar" />
            </div>
          </a>
          <div class="dropdown">
            <div class="submenu">
              <a href="javascript:" @click="isActivePopupProfile = !isActivePopupProfile">
                <div class="icon">
                  <img v-if="isFreightForwarder()" src="/assets/img/icon/edit.svg" alt="Image Icon" />
                  <img v-else-if="isTGAdmin()" src="/assets/img/icon/edit-company.svg" alt="Image Icon" />
                  <img v-else-if="isDriver()" src="/assets/img/icon/edit-driver.svg" alt="Image Icon" />
                  <img v-else-if="isAdmin()" src="/assets/img/icon/edit-admin.svg" alt="Image Icon" />
                </div>
                แก้ไขข้อมูลส่วนตัว
              </a>
            </div>
            <div class="submenu">
              <a href="javascript:" @click="isActivePopupPassword = !isActivePopupPassword">
                <div class="icon">
                  <img v-if="isFreightForwarder()" src="/assets/img/icon/lock.svg" alt="Image Icon" />
                  <img v-else-if="isTGAdmin()" src="/assets/img/icon/lock-company.svg" alt="Image Icon" />
                  <img v-else-if="isDriver()" src="/assets/img/icon/lock-driver.svg" alt="Image Icon" />
                  <img v-else-if="isAdmin()" src="/assets/img/icon/lock-admin.svg" alt="Image Icon" />
                </div>
                เปลี่ยนรหัสผ่าน
              </a>
            </div>
            <div v-if="isFreightForwarder()" class="submenu">
              <a href="javascript:" @click="isActivePopupCompany = !isActivePopupCompany">
                <div class="icon">
                  <img src="/assets/img/icon/shop.svg" alt="Image Icon" />
                </div>
                แก้ไขข้อมูลบริษัท
              </a>
            </div>
            <div class="submenu exit">
              <a href="/auth/signin" @click= "logOut">
                <div class="icon">
                  <img src="/assets/img/icon/exit.svg" alt="Image Icon" />
                </div>
                ออกจากระบบ
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </nav>
  <div class="topnav-spacer"></div>

  <!-- Popup Profile -->
  <div v-if="!isBottom" class="popup-container" :class="{ 'active': isActivePopupProfile }">
    <div class="wrapper">
      <div class="close-filter" @click="isActivePopupProfile = !isActivePopupProfile"></div>
      <form action="/" method="GET" class="w-full"  @submit.prevent="onSubmitProfile">
        <div class="popup-box">
          <div class="header">
            <div class="btns mt-0">
              <a href="javascript:" class="btn btn-close" @click="isActivePopupProfile = !isActivePopupProfile">
                <img class="icon-prepend xs" src="/assets/img/icon/close.svg" alt="Image Icon" />
                ปิดหน้าต่าง
              </a>
            </div>
            <div class="header-wrapper">
              <div class="text-container">
                <h6 class="h3">แก้ไขข้อมูลส่วนตัว</h6>
              </div>
              <div class="btns hide-mobile">
                <Button 
                  type="submit" text="บันทึก" classer="btn-color-01" 
                  :prepend="true" icon="check-white.svg" 
                />
              </div>
              <div class="btns show-mobile">
                <Button 
                  type="submit" text="บันทึก" classer="btn-color-01 btn-sm" 
                />
              </div>
            </div>
          </div>
          <div class="body">
            <div class="grids">
              <div class="grid md-20 sm-30">
                <FormGroup
                  label="คำนำหน้า" type="select" :required="true" 
                  :value="selfUser.detail.prefix" 
                  @input="selfUser.detail.prefix = $event" 
                  :options="[ 
                    { value: 'นาย', text: 'นาย' }, 
                    { value: 'นาง', text: 'นาง' }, 
                    { value: 'นางสาว', text: 'นางสาว' }
                  ]"
                />
              </div>
              <div class="grid md-40 sm-35">
                <FormGroup
                  label="ชื่อ" type="text" :required="true" 
                  :value="selfUser.detail.firstname" 
                  @input="selfUser.detail.firstname = $event" 
                />
              </div>
              <div class="grid md-40 sm-35">
                <FormGroup
                  label="นามสกุล" type="text" :required="true" 
                  :value="selfUser.detail.lastname" 
                  @input="selfUser.detail.lastname = $event" 
                />
              </div>
              <div class="grid sm-50">
                <FormGroup
                  label="เบอร์โทรศัพท์ *" type="text" :required="true" 
                  :value="selfUser.detail.phone" 
                  @input="selfUser.detail.phone = $event" 
                />
              </div>
              <div class="grid sm-50">
                <FormGroup
                  label="รูปโปรไฟล์" type="file-image" name="avatar" 
                  :value="user.avatar"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  
  <!-- Popup Password -->
  <div v-if="!isBottom" class="popup-container" :class="{ 'active': isActivePopupPassword }">
    <div class="wrapper">
      <div class="close-filter" @click="isActivePopupPassword = !isActivePopupPassword"></div>
      <form action="/" method="GET" class="w-full"  @submit.prevent="onSubmitPassword">
        <div class="popup-box">
          <div class="header">
            <div class="btns mt-0">
              <a href="javascript:" class="btn btn-close" @click="isActivePopupPassword = !isActivePopupPassword">
                <img class="icon-prepend xs" src="/assets/img/icon/close.svg" alt="Image Icon" />
                ปิดหน้าต่าง
              </a>
            </div>
            <div class="header-wrapper">
              <div class="text-container">
                <h6 class="h3">เปลี่ยนรหัสผ่าน</h6>
              </div>
              <div class="btns">
                <Button type="submit" text="บันทึก" classer="btn-color-01" :prepend="true" icon="check-white.svg" />
              </div>
            </div>
          </div>
          <div class="body">
            <div class="grids">
              <div class="grid sm-100">
                <FormGroup
                  label="รหัสผ่านเดิม *" type="password" :required="true" 
                  :value="selfUser.password" @input="selfUser.password = $event" 
                />
              </div>
              <div class="grid sm-100">
                <FormGroup 
                  label="รหัสผ่านใหม่ *" type="password" :required="true" 
                  :value="selfUser.newPassword" @input="selfUser.newPassword = $event" 
                />
              </div>
              <div class="grid sm-100">
                <FormGroup 
                  label="ยืนยันรหัสผ่าน *" type="password" :required="true" 
                  :value="selfUser.confPassword" @input="selfUser.confPassword = $event" 
                />
              </div>
            </div>
            <p class="color-gray mt-3">
              หากไม่สามารถระบุรหัสผ่านเดิมได้ กรุณาติดต่อผู้ดูแลระบบ
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>

  <!-- Popup Freight Forwarder -->
  <div v-if="!isBottom && isFreightForwarder()" class="popup-container" :class="{ 'active': isActivePopupCompany }">
    <div class="wrapper">
      <div class="close-filter" @click="isActivePopupCompany = !isActivePopupCompany"></div>
      <form action="/" method="GET" class="w-full"  @submit.prevent="onSubmitCompany">
        <div class="popup-box">
          <div class="header">
            <div class="btns mt-0">
              <a href="javascript:" class="btn btn-close" @click="isActivePopupCompany = !isActivePopupCompany">
                <img class="icon-prepend xs" src="/assets/img/icon/close.svg" alt="Image Icon" />
                ปิดหน้าต่าง
              </a>
            </div>
            <div class="header-wrapper">
              <div class="text-container">
                <h6 class="h3">แก้ไขข้อมูลบริษัท</h6>
              </div>
              <div class="btns">
                <Button type="submit" text="บันทึก" classer="btn-color-01" :prepend="true" icon="check-white.svg" />
              </div>
            </div>
          </div>
          <div class="body">
            <div class="grids">
              <div class="grid sm-100">
                <FormGroup
                  label="ชื่อบริษัท *" type="text" placeholder="โปรดระบุ" :required="true" 
                  :value="selfUser.company.name" @input="selfUser.company.name = $event" 
                />
              </div>
              <div class="grid sm-100">
                <FormGroup
                  label="ที่อยู่ *" type="textarea" placeholder="โปรดระบุ" :required="true" :rows="3" 
                  :value="selfUser.company.address" @input="selfUser.company.address = $event" 
                />
              </div>
              <div class="grid sm-50">
                <FormGroup 
                  type="select" label="จังหวัด *" :required="true" placeholder="โปรดเลือก" 
                  :value="selfUser.company.province" 
                  @input="selfUser.company.province = $event" 
                  :options="[
                    { value: 'กรุงเทพมหานคร', text: 'กรุงเทพมหานคร' },
                    { value: 'สมุทรปราการ', text: 'สมุทรปราการ' }
                  ]"
                />
              </div>
              <div class="grid sm-50">
                <FormGroup 
                  type="text" label="รหัสไปรษณีย์ *" :required="true" 
                  placeholder="โปรดระบุ" :minlength="5" :maxlength="5" 
                  :value="selfUser.company.zipcode" 
                  @input="selfUser.company.zipcode = $event" 
                />
              </div>
              <div class="grid sm-100">
                <FormGroup 
                  type="text" label="เลขประจำตัวผู้เสียภาษี *" :required="true" 
                  placeholder="โปรดระบุ" :minlength="13" :maxlength="13" 
                  :value="selfUser.company.taxId" 
                  :readonly="true" :disabled="true" 
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
import FormGroup from './FormGroup';
import Button from './Button';
import UserService from '../services/user.service';

export default {
  name: 'Topnav',
  components: [
    FormGroup,
    Button
  ],
  props: {
    user: { type: Object, default: null },
    isBottom: { type: Boolean, default: false },
    activeIndex: { type: Number, default: null },
    alert: { type: Number, default: 2 },
  },
  data() {
    return {
      selfUser: {...this.user},
      isActivePopupProfile: false,
      isActivePopupPassword: false,
      isActivePopupCompany: false
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    
    //เช็ค currentuser ถ้าไม่มีการ sign in ให้ไป sign in
    if (!this.loggedIn) {
      this.$router.push('/auth/signin');
    }
  },
  created() {
    console.log('TopNec created')

    this.user.id = this.$store.state.auth.user.id,
    this.user.role = this.$store.state.auth.user.role, /* Freight Forwarder, Driver, TG Admin, Admin */
    this.user.username = this.$store.state.auth.user.username,
    this.user.email = this.$store.state.auth.user.email,

    UserService.getUserDetail().then(
      response => {        
        this.user.detail = response.data
      }
    );
    
    UserService.getUserCompanyDetail().then(
      response => {
        console.log('user company: ', response.data)
        this.user.company = response.data
      }
    );
  },
  methods: {

    isFreightForwarder() {
      if(this.user && this.user.role == 'freight-forwarder'){
        return true;
      }else{
        return false;
      }
    },
    isDriver() {
      if(this.user && this.user.role == 'Driver'){
        return true;
      }else{
        return false;
      }
    },
    isTGAdmin() {
      if(this.user && this.user.role == 'TG Admin'){
        return true;
      }else{
        return false;
      }
    },
    isAdmin() {
      if(this.user && this.user.role == 'Admin'){
        return true;
      }else{
        return false;
      }
    },

    onSubmitProfile() {
      this.isActivePopupProfile = false;
    },
    onSubmitPassword() {
      this.isActivePopupPassword = false;
    },
    onSubmitCompany() {
      this.isActivePopupCompany = false;
    },

    logOut() {
      this.$store.dispatch('auth/logout');
    }

  }
}
</script>
