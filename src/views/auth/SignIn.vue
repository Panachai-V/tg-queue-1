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
          <h6 class="h4 fw-400 color-sgray">
            TG Smart Backhaul
          </h6>
          <p class="h2 fw-500 color-p">
            เข้าสู่ระบบ
          </p>
          <form @submit="handleSubmit">
            <div class="grids">
              <div class="grid sm-100">
                <FormGroup 
                  label="ชื่อผู้ใช้" wrapperClass="prepend" icon="user.svg" 
                  :value="user.username" @input="user.username = $event" 
                  :errorText="isValidated && !user.username? text_notification: ''" 
                  :classer="isValidated && !user.username? 'error': ''" 
                />
              </div>
              <div class="grid sm-100">
                <FormGroup 
                  label="รหัสผ่าน" type="password" wrapperClass="prepend password" icon="lock.svg" 
                  :value="user.password" @input="user.password = $event" 
                  :errorText="isValidated && !user.password? text_notification: ''" 
                  :classer="isValidated && !user.password? 'error': ''" 
                />
              </div>
            </div>
            <div class="btns">
              <Button text="เข้าสู่ระบบ" type="submit" classer="btn-color-01 w-full" />
            </div>
            <div class="btns d-flex jc-space-between">
              <a class="h6 fw-400 color-gray h-color-01" href="/auth/forget-password">
                ลืมรหัสผ่าน ?
              </a>
              <a class="h6 fw-400 color-gray h-color-01" href="/auth/register">
                สมัครสมาชิก
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
import User from '../../models/user';
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'AuthSignInPage',
  components: {
    FormGroup,
    Button
  },
  watch: {
  },
  computed: {
    ...mapGetters({
      getUser: 'auth/getUser',
      getUserDetail: 'auth/getUserDetail',
      isAuthenticated: 'auth/isAuthenticated'
    })
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    if (this.isAuthenticated) {
      if (this.getUser.role == "driver") {
        this.$router.push('/driver/my-jobs');
      }
      if (this.getUser.role == "freight-forwarder") {
        this.$router.push('/forwarder/dashboard');
      }
    }
  },
  data() {
    return {
      isValidated: false,
      user: new User('', ''),
      text_notification: 'กรุณาระบุ'
    }
  },
  updated(){
    if ((this.user.username && !this.user.password) || (!this.user.username && this.user.password)){
      this.text_notification = 'กรุณาระบุ'
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
    }),
    handleSubmit(e) {
        e.preventDefault()
        console.log(this.user);
        if (this.user.username && this.user.password) {
          this.login(this.user).then(
            () => {
              console.log("logged in")
              if (this.getUser.role == "driver") {
                this.$router.push('/driver/my-jobs');
              }
              if (this.getUser.role == "freight-forwarder") {
                this.$router.push('/forwarder/dashboard');
              }
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
                this.text_notification = 'username or password is incorrect'
                this.user.username = ''
                this.user.password = ''
            }
          );
        }
        this.isValidated = true;
    }
  }
}
</script>
