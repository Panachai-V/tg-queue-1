<template>
    <section class="auth-02">
    <div class="wrapper">
      <div class="img-container" style="background-image:url('/assets/img/bg/01.jpg');">
        <div data-aos="fade-up" data-aos-delay="0">
          <img class="logo" src="/assets/img/logo.png" alt="App Logo" />
        </div>
      </div>
      <div class="content-container">
        <div class="auth-container" data-aos="fade-up" data-aos-delay="150">
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
  </section>
</template>
<script>

import FormGroup from '../../components/FormGroup';
import Button from '../../components/Button';
import verify from '../../services/auth.service'
import {mapGetters, mapActions, mapState} from "vuex"

export default {
  name: 'VerifyRegisterToken',
  components: {
    FormGroup,
    Button
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });

    console.log('toket :', this.$route.params.token)

    this.verifyTokenRegister(this.$route.params.token)
  },
  data() {
    return {
      isValidated: false,
      dataset: {
        email: ''
      }
    }
  },
  methods: {
    ...mapActions({
      verifyTokenRegister: 'auth/verifyTokenRegister'
    })
  }
}
</script>
