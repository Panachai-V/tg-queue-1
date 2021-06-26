<template>
    <section class="auth-02">
    <div class="wrapper">
      <div class="img-container" style="background-image:url('/assets/img/bg/01.jpg');">
        <div data-aos="fade-up" data-aos-delay="0">
          <img class="logo" src="/assets/img/logo.png" alt="App Logo" />
        </div>
      </div>
      <div v-if="sendCompleted == false" class="content-container">
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

      <div v-if="sendCompleted == true" class="content-container">
        <div class="content-container">
          <div class="auth-container">
            <h6 class="h5 fw-400 color-sgray">
              Your account was successfully register
            </h6>
            <p class="h5 fw-100 color-p">
              บัญชีผู้ใช้ของคุณลงทะเบียนเสร็จสมบูรณ์
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
      this.verifyTokenForResetPWD(this.$route.params.token)
    }
  },
  data() {
    return {
      isValidated: false,
      dataset: {
        email: ''
      },
      sendCompleted: false
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
        that.sendCompleted = true;
        that.dataset.email = ''
      }
    },
    ...mapActions({
      requestTokenForResetPWD: 'auth/requestTokenForResetPWD',
      verifyTokenForResetPWD: 'auth/verifyTokenForResetPWD'
    })
  }
}
</script>
