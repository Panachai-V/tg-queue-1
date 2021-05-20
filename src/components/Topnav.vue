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

      <!-- Menu - Product Owner -->
      <div v-if="isProductOwner()" class="menu-container" :class="{ 'hide-mobile': !isBottom }">
        <div class="menu" :class="{ 'active': activeIndex == 0 }">
          <a href="/customer/dashboard">
            <div class="icon">
              <img src="/assets/img/icon/home.svg" alt="Image Icon" />
            </div>
            <div class="text">Dashboard</div>
          </a>
        </div>
        <div class="menu" :class="{ 'active': activeIndex == 1 }">
          <a href="/customer/job-requests">
            <div class="icon">
              <img src="/assets/img/icon/request.svg" alt="Image Icon" />
            </div>
            <div class="text">Job Requests</div>
          </a>
        </div>
      </div>
      
      <!-- Menu - Company -->
      <div v-else-if="isCompany()" class="menu-container" :class="{ 'hide-mobile': !isBottom }">
        <div class="menu" :class="{ 'active': activeIndex == 0 }">
          <a href="/company/dashboard">
            <div class="icon">
              <img src="/assets/img/icon/home-company.svg" alt="Image Icon" />
            </div>
            <div class="text">Dashboard</div>
          </a>
        </div>
        <div class="menu" :class="{ 'active': activeIndex == 1 }">
          <a href="/company/job-requests">
            <div class="icon">
              <img src="/assets/img/icon/request-company.svg" alt="Image Icon" />
            </div>
            <div class="text">Job Requests</div>
          </a>
        </div>
        <div class="menu" :class="{ 'active': activeIndex == 2 }">
          <a href="/company/my-jobs">
            <div class="icon">
              <img src="/assets/img/icon/box-company.svg" alt="Image Icon" />
            </div>
            <div class="text">My Jobs</div>
          </a>
        </div>
        <div class="menu" :class="{ 'active': activeIndex == 3 }">
          <a href="/company/drivers">
            <div class="icon">
              <img src="/assets/img/icon/users-company.svg" alt="Image Icon" />
            </div>
            <div class="text">Truck Drivers</div>
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
              <p class="lh-sm">{{user.prefix}}{{user.firstname}} {{user.lastname}}</p>
              <p class="sm lh-xs">{{user.email}}</p>
            </div>
            <div 
              v-if="user.avatar" class="img-bg" 
              :style="'background-image:url(\''+user.avatar+'\');'"
            ></div>
            <div 
              v-else class="img-bg" 
              style="background-image:url('/assets/img/misc/profile.jpg');"
            ></div>
          </a>
          <div class="dropdown">
            <div class="submenu">
              <a href="javascript:" @click="openedPopupProfile = !openedPopupProfile">
                <div class="icon">
                  <img v-if="isProductOwner()" src="/assets/img/icon/edit.svg" alt="Image Icon" />
                  <img v-else-if="isCompany()" src="/assets/img/icon/edit-company.svg" alt="Image Icon" />
                  <img v-else-if="isDriver()" src="/assets/img/icon/edit-driver.svg" alt="Image Icon" />
                  <img v-else-if="isAdmin()" src="/assets/img/icon/edit-admin.svg" alt="Image Icon" />
                </div>
                แก้ไขข้อมูลส่วนตัว
              </a>
            </div>
            <div class="submenu">
              <a href="javascript:" @click="openedPopupPassword = !openedPopupPassword">
                <div class="icon">
                  <img v-if="isProductOwner()" src="/assets/img/icon/lock.svg" alt="Image Icon" />
                  <img v-else-if="isCompany()" src="/assets/img/icon/lock-company.svg" alt="Image Icon" />
                  <img v-else-if="isDriver()" src="/assets/img/icon/lock-driver.svg" alt="Image Icon" />
                  <img v-else-if="isAdmin()" src="/assets/img/icon/lock-admin.svg" alt="Image Icon" />
                </div>
                เปลี่ยนรหัสผ่าน
              </a>
            </div>
            <div v-if="isCompany()" class="submenu">
              <a href="javascript:" @click="openedPopupCompany = !openedPopupCompany">
                <div class="icon">
                  <img src="/assets/img/icon/shop-company.svg" alt="Image Icon" />
                </div>
                แก้ไขข้อมูลบริษัท
              </a>
            </div>
            <div class="submenu exit">
              <a href="/auth/signin">
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
  <div v-if="!isBottom" class="popup-container" :class="{ 'active': openedPopupProfile }">
    <div class="wrapper">
      <div class="close-filter" @click="openedPopupProfile = !openedPopupProfile"></div>
      <form action="/" method="GET" class="w-full"  @submit="onSubmitProfile">
        <div class="popup-box">
          <div class="header">
            <div class="btns mt-0">
              <a href="javascript:" class="btn btn-close" @click="openedPopupProfile = !openedPopupProfile">
                <img class="icon-prepend xs" src="/assets/img/icon/close.svg" alt="Image Icon" />
                ปิดหน้าต่าง
              </a>
            </div>
            <div class="header-wrapper">
              <div class="text-container">
                <h6 class="h3">แก้ไขข้อมูลส่วนตัว</h6>
              </div>
              <div class="btns">
                <Button type="submit" text="บันทึก" classer="btn-color-01" :prepend="true" icon="check-white.svg" />
              </div>
            </div>
          </div>
          <div class="body">
            <div class="grids">
              <div class="grid md-20 sm-30">
                <FormGroup
                  label="คำนำหน้า" type="select" name="prefix" 
                  :value="user.prefix" :required="true"
                  :options="[ 
                    { value: 'นาย', text: 'นาย' }, 
                    { value: 'นาง', text: 'นาง' }, 
                    { value: 'น.ส.', text: 'น.ส.' }, 
                    { value: 'นพ.', text: 'นพ.' }
                  ]"
                />
              </div>
              <div class="grid md-40 sm-35">
                <FormGroup
                  label="ชื่อ" type="text" name="firstname" 
                  :value="user.firstname" :required="true"
                />
              </div>
              <div class="grid md-40 sm-35">
                <FormGroup
                  label="นามสกุล" type="text" name="lastname" 
                  :value="user.lastname" :required="true"
                />
              </div>
              <div class="grid sm-50">
                <FormGroup
                  label="อีเมล" type="email" name="email" 
                  :value="user.email"
                />
              </div>
              <div class="grid sm-50">
                <FormGroup
                  label="หมายเลขโทรศัพท์" type="text" name="phone" 
                  :value="user.phone"
                />
              </div>
              <div class="grid sm-80">
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
  <div v-if="!isBottom" class="popup-container" :class="{ 'active': openedPopupPassword }">
    <div class="wrapper">
      <div class="close-filter" @click="openedPopupPassword = !openedPopupPassword"></div>
      <form action="/" method="GET" class="w-full"  @submit="onSubmitPassword">
        <div class="popup-box">
          <div class="header">
            <div class="btns mt-0">
              <a href="javascript:" class="btn btn-close" @click="openedPopupPassword = !openedPopupPassword">
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
                  label="รหัสผ่านเดิม" type="password" name="password" 
                  :value="reenterPassword" @input="reenterPassword = $event" 
                  :classer="isValidPassword && passwordErrorText? 'error': ''" 
                  :errorText="isValidPassword && passwordErrorText? passwordErrorText: ''"
                />
              </div>
              <div class="grid sm-100">
                <FormGroup 
                  label="รหัสผ่านใหม่" type="password" name="new_password" 
                  :value="newPassword" @input="newPassword = $event" 
                  :classer="isValidPassword && newPasswordErrorText? 'error': ''" 
                  :errorText="isValidPassword && newPasswordErrorText? newPasswordErrorText: ''"
                />
              </div>
              <div class="grid sm-100">
                <FormGroup 
                  label="ยืนยันรหัสผ่าน" type="password" name="conf_password" 
                  :value="confPassword" @input="confPassword = $event" 
                  :classer="isValidPassword && confPasswordErrorText? 'error': ''" 
                  :errorText="isValidPassword && confPasswordErrorText? confPasswordErrorText: ''"
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

  <!-- Popup Company -->
  <div v-if="!isBottom && isCompany()" class="popup-container" :class="{ 'active': openedPopupCompany }">
    <div class="wrapper">
      <div class="close-filter" @click="openedPopupCompany = !openedPopupCompany"></div>
      <form action="/" method="GET" class="w-full"  @submit="onSubmitProfile">
        <div class="popup-box">
          <div class="header">
            <div class="btns mt-0">
              <a href="javascript:" class="btn btn-close" @click="openedPopupCompany = !openedPopupCompany">
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
              <div class="grid sm-80">
                <FormGroup
                  label="ชื่อบริษัท" type="text" name="company_name" 
                  :value="company? company.name: ''" :required="true"
                />
              </div>
              <div class="grid sm-50">
                <FormGroup
                  label="อีเมล" type="email" name="company_email" 
                  :value="company? company.email: ''"
                />
              </div>
              <div class="grid sm-50">
                <FormGroup
                  label="หมายเลขโทรศัพท์" type="text" name="company_phone" 
                  :value="company? company.phone: ''"
                />
              </div>
              <div class="grid sm-100">
                <FormGroup
                  label="ที่อยู่" type="textarea" name="company_address" :rows="3" 
                  :value="company? company.address: ''"
                />
              </div>
              <div class="grid sm-50">
                <FormGroup
                  label="จังหวัด" type="text" name="company_province" 
                  :value="company? company.province: ''"
                />
              </div>
              <div class="grid sm-50">
                <FormGroup
                  label="รหัสไปรษณีย์" type="text" name="company_zipcode" 
                  :value="company? company.zipcode: ''"
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

export default {
  name: 'Topnav',
  components: [
    FormGroup,
    Button
  ],
  data() {
    return {
      openedPopupProfile: false,

      openedPopupPassword: false,
      isValidPassword : false,
      password: '1234',
      reenterPassword: '',
      newPassword: '',
      confPassword: '',
      passwordErrorText: '',
      newPasswordErrorText: '',
      confPasswordErrorText: '',

      openedPopupCompany: false,
    }
  },
  props: {
    user: { type: Object, default: null },
    company: { type: Object, default: null },
    isBottom: { type: Boolean, default: false },
    activeIndex: { type: Number, default: null },
    alert: { type: Number, default: 2 },
  },
  methods: {

    isProductOwner() {
      if(this.user && this.user.role == 'Product Owner'){
        return true;
      }else{
        return false;
      }
    },
    isCompany() {
      if(this.user && this.user.role == 'Company'){
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
    isAdmin() {
      if(this.user && this.user.role == 'Admin'){
        return true;
      }else{
        return false;
      }
    },

    onSubmitProfile(e) {
      this.openedPopupProfile = false;
      e.preventDefault();
    },

    onSubmitPassword(e) {
      // this.isValidPassword = true;
      // this.passwordErrorText = '';
      // this.newPasswordErrorText = '';
      // this.confPasswordErrorText = '';

      // var isValid = true;
      
      // if(this.password != this.reenterPassword){
      //   isValid = false; this.passwordErrorText = 'ระบุรหัสผ่านเดิมผิด';
      // }
      // if(this.newPassword != this.confPassword){
      //   isValid = false; this.confPasswordErrorText = 'ยืนยันรหัสผ่านไม่ตรงกับรหัสผ่านใหม่';
      // }

      // if(!this.reenterPassword){
      //   isValid = false; this.passwordErrorText = 'กรุณาระบุ';
      // }
      // if(!this.newPassword){
      //   isValid = false; this.newPasswordErrorText = 'กรุณาระบุ';
      // }
      // if(!this.confPassword){
      //   isValid = false; this.confPasswordErrorText = 'กรุณาระบุ';
      // }

      // if(isValid){
      //   this.openedPopupPassword = false;
      //   this.isValidPassword = false;
      //   this.reenterPassword = '';
      //   this.newPassword = '';
      //   this.confPassword = '';
      // }

      e.preventDefault();
    }

  }
}
</script>
