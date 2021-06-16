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
            <!-- <div v-if="alert" class="num">{{alert}}</div> -->
          </a>
        </div>
        <div class="option">
          <a href="javascript:">
            <div class="info text-right hide-mobile mr-2">
              <p class="lh-sm">
                {{getUserDetail.prefix}}{{getUserDetail.firstname}} 
                {{getUserDetail.lastname}}
              </p>
              <p class="sm lh-xs">{{getUser.email}}</p>
            </div>
            <div class="img-bg" >
              <img class="img-bg" v-bind:src="'data:image/jpeg;base64,' + getUserDetail.avatar" />
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
  <div v-if="!isBottom && getLoadingStatus == false" class="popup-container" :class="{ 'active': isActivePopupProfile }">
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
                  label="รูปโปรไฟล์" type="file-image" name="avatar" @change="onFileSelected"
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
                <Button type="submit" text="บันทึก" classer="btn-color-01" :prepend="true" icon="check-white.svg"/>
              </div>
            </div>
          </div>
          <div class="body">
            <div class="grids">
              <div class="grid sm-100">
                <FormGroup
                  label="รหัสผ่านเดิม *" type="password" :required="true" 
                  :value="selfUser.password" @input="selfUser.password = $event" :errorText="!wrongpwd? text_notification: 'รหัสผ่านผิด'" 
                />
              </div>
              <div class="grid sm-100">
                <FormGroup 
                  label="รหัสผ่านใหม่ *" type="password" :required="true" 
                  :value="selfUser.newPassword" 
                  @input="selfUser.newPassword = $event " 
                  :errorText="(selfUser.password != selfUser.newPassword) || !selfUser.password ? text_notification: 'รหัสผ่านซ้ำเดิม'"
                />
              </div>
              <div class="grid sm-100">
                <FormGroup 
                  label="ยืนยันรหัสผ่าน *" type="password" :required="true" 
                  :value="selfUser.confPassword" @input="selfUser.confPassword = $event" :errorText="selfUser.confPassword == selfUser.newPassword ? text_notification: 'รหัสผ่านไม่ตรงกัน'" 
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
  <div v-if="!isBottom && isFreightForwarder() && (getLoadingStatus == false)" class="popup-container" :class="{ 'active': isActivePopupCompany }">
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
                  :value="getSelfUserCompany.name" @input="getSelfUserCompany.name = $event" 
                />
              </div>
              <div class="grid sm-100">
                <FormGroup
                  label="ที่อยู่ *" type="textarea" placeholder="โปรดระบุ" :required="true" :rows="3" 
                  :value="getSelfUserCompany.address" @input="getSelfUserCompany.address = $event" 
                />
              </div>
              <div class="grid sm-50">
                <FormGroup 
                  type="select" label="จังหวัด *" :required="true" placeholder="โปรดเลือก" 
                  :value="getSelfUserCompany.province" 
                  @input="getSelfUserCompany.province = $event" 
                  :options="provinces"
                />
              </div>
              <div class="grid sm-50">
                <FormGroup 
                  type="text" label="รหัสไปรษณีย์ *" :required="true" 
                  placeholder="โปรดระบุ" :minlength="5" :maxlength="5" 
                  :value="getSelfUserCompany.zipcode" 
                  @input="getSelfUserCompany.zipcode = $event" 
                />
              </div>
              <div class="grid sm-100">
                <FormGroup 
                  type="text" label="เลขประจำตัวผู้เสียภาษี *" :required="true" 
                  placeholder="โปรดระบุ" :minlength="13" :maxlength="13" 
                  :value="getSelfUserCompany.taxId" 
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
import axios from 'axios';
import {mapGetters, mapActions} from "vuex"
var socket = io.connect(process.env.VUE_APP_SERVERURL);

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
      selfUser: {},
      isActivePopupProfile: false,
      isActivePopupPassword: false,
      isActivePopupCompany: false,
      provinces: [],
      worngpwd: false
    }
  },
  created() {
    this.getCompany()
    console.log('detail: ', this.getUserDetail)
    console.log('company: ', this.getUserCompany)
    console.log('loading status: ', this.getLoadingStatus)    

    if(this.getAuthenticated == true){
        console.log("login already");
        socket.emit('join-with-id', {
          user_id: this.getUser.id,
        });
      }
      
    const response = axios.get('master-module/province').then(response => {
      console.log('province: ', response.data)
      for(let i in response.data){
        this.provinces.push({ value: response.data[i].PROVINCE_NAME, text: response.data[i].PROVINCE_NAME })
      }
    });
    
  },
  mounted() {
    socket.on('receive-notify', (data) => {
        console.log("user :"+ data.user_id);
        console.log("notify :"+ data.notification);
        });
    socket.on('notify-detail', (data) => {
      console.log(data);
    });
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    this.selfUser.detail = { ...this.getUserDetail };
    this.selfUser.avatar = ''
    
  },
  updated() {
    console.log('loading status: ', this.getLoadingStatus)
    this.wrongpwd = false
  },
  computed: {
    ...mapGetters({
      getUser: 'auth/getUser',
      getUserDetail: 'auth/getUserDetail',
      getUserCompany: 'auth/getUserCompany',
      getSelfUserCompany: 'auth/getSelfUserCompany',
      getLoginStatus: 'auth/getLoginStatus',
      getLoadingStatus: 'auth/getLoadingStatus',
      getAuthenticated: 'auth/isAuthenticated',
    })
    
  },
  methods: {

  
    isFreightForwarder() {
      if(this.getUser && this.getUser.role == 'freight-forwarder'){
        return true;
      }else{
        return false;
      }
    },
    isDriver() {
      if(this.getUser && this.getUser.role == 'Driver'){
        return true;
      }else{
        return false;
      }
    },
    isTGAdmin() {
      if(this.getUser && this.getUser.role == 'TG Admin'){
        return true;
      }else{
        return false;
      }
    },
    isAdmin() {
      if(this.getUser && this.getUser.role == 'Admin'){
        return true;
      }else{
        return false;
      }
    },

    async onSubmitProfile() {
      this.isActivePopupProfile = false;
      var formData = new FormData();
      formData.append("avatar", this.selfUser.avatar);
      formData.append("prefix", this.selfUser.detail.prefix);
      formData.append("firstname", this.selfUser.detail.firstname);
      formData.append("lastname", this.selfUser.detail.lastname);
      formData.append("phone", this.selfUser.detail.phone);
      await this.editUser(formData).then(
        response => {
        }, error => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      ); 
      await this.fetchUser().then(
        error => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        })
    },
    onSubmitPassword() {
      if ((this.selfUser.confPassword == this.selfUser.newPassword) && (this.selfUser.password != this.selfUser.newPassword)) {
        this.isActivePopupPassword = false
        this.changePWD({
          password: this.selfUser.password,
          newPassword: this.selfUser.newPassword
        }).then(
          response => {
            this.selfUser.password = '',
            this.selfUser.newPassword = '',
            this.selfUser.confPassword = ''
          },error => {         
            this.isActivePopupPassword = true
            this.wrongpwd = true
          }
        ); 
      }      
    },
    onSubmitCompany() {
      this.isActivePopupCompany = false;
      this.editCompany()
    },

    logOut() {
      this.logout();
    },
    onFileSelected(event) {
      this.selfUser.avatar = event.target.files[0]
    },    
    ...mapActions({
      logout: 'auth/logout',
      editUser: 'auth/editUser',
      fetchUser: 'auth/fetchUser',
      changePWD: 'auth/changePWD',
      getCompany: 'auth/getCompany',
      editCompany: 'auth/editCompany',
    })

  }
}
</script>
