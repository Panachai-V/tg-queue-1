<template>
    <section class="auth-02">
    <div class="wrapper">
      <div class="img-container" style="background-image:url('/assets/img/bg/01.jpg');">
        <div data-aos="fade-up" data-aos-delay="0">
          <img class="logo" src="/assets/img/logo.png" alt="App Logo" />
        </div>
      </div>
      <div v-show="step == 0" class="content-container">
        <div class="auth-container">
          <h6 class="h4 fw-400 color-sgray">
            TG Smart Backhaul
          </h6>
          <p class="h2 fw-500 color-p">
            ลืมรหัสผ่าน
          </p>
          <form @submit.prevent="handleSubmit">
            <div class="grids">
              <div class="grid sm-100">
                <FormGroup 
                  label="E-mail" wrapperClass="prepend" icon="user.svg" 
                  :value="dataset.email" @input="dataset.email = $event" 
                  :errorText="isValidated && !dataset.email? 'กรุณาระบุ': ''" 
                  :classer="isValidated && !dataset.email? 'error': ''" 
                />
              </div>
            </div>
            <div class="btns">
              <Button text="ยืนยัน" type="submit" classer="btn-color-01 w-full" />
            </div>
            <div class="btns d-flex jc-space-between">
              <a class="h6 fw-400 color-gray h-color-01" href="/auth/signin">
                เข้าสู่ระบบ
              </a>
            </div>
          </form>
        </div>
      </div>

      <div v-show="step == 1" class="content-container">
        <div class="auth-container">
          <h6 class="h5 fw-400 color-sgray">
            reset password Link has send to your email
          </h6>
          <p class="h5 fw-100 color-p">
            ลิงค์สำหรับรีเซ็ตรหัสผ่านถูกส่งไปยังอีเมลของคุณแล้ว
          </p>
          <form @submit="handleSubmit">
            <div class="btns d-flex jc-space-between">
              <a class="h6 fw-400 color-gray h-color-01" href="/auth/signin">
                เข้าสู่ระบบ
              </a>
            </div>
          </form>
        </div>
      </div>

      <div v-show="step == 2" class="content-container">
        <div class="auth-container">
          <h6 class="h4 fw-400 color-sgray">
            change your password
          </h6>
          <p class="h2 fw-500 color-p">
            เปลี่ยนรหัสผ่าน
          </p>
          <form @submit.prevent="changePWD">
            <div class="grids">
              <div class="grid sm-50">
                <FormGroup 
                  type="password" label="รหัสผ่าน *" :required="true" placeholder="โปรดระบุ" 
                  :value="dataset.password" 
                  @input="dataset.password = $event"
                  :errorText="isValidated? text_notification: ''"
                />
              </div>
              <div class="grid sm-50">
                <FormGroup 
                  type="password" label="ยืนยันรหัสผ่าน *" :required="true" placeholder="โปรดระบุ" 
                  :value="dataset.confPassword" 
                  @input="dataset.confPassword = $event"
                  :errorText="isValidated? text_notification: ''" 
                />
              </div>
            </div>
            <div class="btns">
              <Button text="ยืนยัน" type="submit" classer="btn-color-01 w-full" />
            </div>
            <div class="btns d-flex jc-space-between">
              <a class="h6 fw-400 color-gray h-color-01" href="/auth/signin">
                เข้าสู่ระบบ
              </a>
            </div>
          </form>
        </div>
      </div>

      <div v-show="step == 3" class="content-container">
        <div class="auth-container">
          <h6 class="h5 fw-400 color-sgray">
            Password has been successfully changed
          </h6>
          <p class="h5 fw-100 color-p">
            เปลี่ยนรหัสผ่านสำเร็จแล้ว
          </p>
          <form @submit="handleSubmit">
            <div class="btns d-flex jc-space-between">
              <a class="h6 fw-400 color-gray h-color-01" href="/auth/signin">
                เข้าสู่ระบบ
              </a>
            </div>
          </form>
        </div>
      </div>

    </div>
  </section>
</template>
<script>

import FormGroup from '../../components/FormGroup';
import Button from '../../components/Button';
import {mapGetters, mapActions, mapState} from "vuex"

export default {
  name: 'AuthForget',
  components: {
    FormGroup,
    Button
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });

    if (this.$route.params.token) {
      (this.verifyTokenForResetPWD(this.$route.params.token)).then( status => {
        if (status == 200) {
          this.step = 2
        }
      })
    } 
    
  },
  data() {
    return {
      isValidated: false,
      dataset: {
        email: '',
        password: '',
        confPassword: ''
      },
      step: 0,
      text_notification: ''
    }
  },
  methods: {
    handleSubmit(e) {
      var that = this;
      that.isValidated = true;
      
      var isValid = true;
      ['email'].forEach(function(k) {
        if(!that.dataset[k]) {
          isValid = false;
        }
      });
      if (!isValid){
        e.preventDefault();
      } else{
        console.log('successfully')
        that.isValidated = false;
        let tempStatus = that.requestTokenForResetPWD(that.dataset.email)
        that.step = 1;
        that.dataset.email = ''
      }
    },
    ...mapActions({
      requestTokenForResetPWD: 'auth/requestTokenForResetPWD',
      verifyTokenForResetPWD: 'auth/verifyTokenForResetPWD',
      saveChangedPassword: 'auth/saveChangedPassword'
    }),
    changePWD(e) {
      var that = this;
      that.isValidated = true;
      
      var isValid = true;
      ['password', 'confPassword'].forEach(function(k) {
        if(!that.dataset[k]) {
          isValid = false;
        }
      });
      
      console.log(that.dataset.password, that.dataset.confPassword)

      if (!isValid){
        e.preventDefault();
        that.text_notification = 'กรุณาระบุ'
        
      } else if (that.dataset.password != that.dataset.confPassword) {
        that.text_notification = 'Password not match'
      } else{
        console.log('successfully change')
        that.isValidated = false;
        let tempData = {
          token: that.$route.params.token,
          password: that.dataset.password
        }
        console.log('tempData :', tempData)
        that.saveChangedPassword(tempData)
        that.step = 3;
      }
    }

  }
}
</script>
