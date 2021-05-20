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
          <form action="/customer/dashboard" method="GET" @submit="onSubmit">
            <div class="grids">
              <div class="grid sm-100">
                <FormGroup 
                  label="ชื่อผู้ใช้" wrapperClass="prepend" icon="user.svg" 
                  :value="dataset.username" @input="dataset.username = $event" 
                  :errorText="isValidated && !dataset.username? 'กรุณาระบุ': ''" 
                  :classer="isValidated && !dataset.username? 'error': ''" 
                />
              </div>
              <div class="grid sm-100">
                <FormGroup 
                  label="รหัสผ่าน" type="password" wrapperClass="prepend password" icon="lock.svg" 
                  :value="dataset.password" @input="dataset.password = $event" 
                  :errorText="isValidated && !dataset.password? 'กรุณาระบุ': ''" 
                  :classer="isValidated && !dataset.password? 'error': ''" 
                />
              </div>
            </div>
            <div class="btns">
              <Button text="เข้าสู่ระบบ" type="submit" classer="btn-color-01 w-full" />
            </div>
            <div class="btns">
              <a class="h6 fw-400 color-gray h-color-01" href="/auth/forget-password">
                ลืมรหัสผ่าน ?
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

export default {
  name: 'AuthSignInPage',
  components: {
    FormGroup,
    Button
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
  },
  data() {
    return {
      isValidated: false,
      dataset: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit(e) {
      var that = this;
      that.isValidated = true;
      
      var isValid = true;
      ['username', 'password'].forEach(function(k){
        if(!that.dataset[k]){
          isValid = false;
        }
      });

      if(!isValid){
        e.preventDefault();
      }else{
        that.isValidated = false;
      }
    }
  }
}
</script>
