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
            ลงทะเบียน
          </p>
          <form action="/customer/dashboard" method="GET" @submit="onSubmit">
            <div class="grids">
              <div class="grid md-2-3 sm-80">
                <FormGroup 
                  label="ชื่อผู้ใช้ *" 
                  :value="dataset.username" @input="dataset.username = $event" 
                  :errorText="isValidated && !dataset.username? 'กรุณาระบุ': ''" 
                  :classer="isValidated && !dataset.username? 'error': ''" 
                />
              </div>
              <div class="sep"></div>
              <div class="grid sm-50">
                <FormGroup 
                  label="รหัสผ่าน *" type="password" wrapperClass="password" 
                  :value="dataset.password" @input="dataset.password = $event" 
                  :errorText="isValidated && !dataset.password? 'กรุณาระบุ': ''" 
                  :classer="isValidated && !dataset.password? 'error': ''" 
                />
              </div>
              <div class="grid sm-50">
                <FormGroup 
                  label="ยืนยันรหัสผ่าน *" type="password" wrapperClass="password" 
                  :value="dataset.confPassword" @input="dataset.confPassword = $event" 
                  :errorText="isValidated && !dataset.confPassword? 'กรุณาระบุ': ''" 
                  :classer="isValidated && !dataset.confPassword? 'error': ''" 
                />
              </div>
              <div class="grid sm-100">
                <FormGroup 
                  label="ชื่อบริษัท *" 
                  :value="dataset.companyName" @input="dataset.companyName = $event" 
                  :errorText="isValidated && !dataset.companyName? 'กรุณาระบุ': ''" 
                  :classer="isValidated && !dataset.companyName? 'error': ''" 
                />
              </div>
              <div class="grid sm-100">
                <FormGroup 
                  label="ที่อยู่ *" type="textarea"
                  :value="dataset.address" @input="dataset.address = $event" 
                  :errorText="isValidated && !dataset.address? 'กรุณาระบุ': ''" 
                  :classer="isValidated && !dataset.address? 'error': ''" 
                />
              </div>
              <div class="grid sm-50">
                <FormGroup 
                  label="เบอร์โทรศัพท์ *" 
                  :value="dataset.phone" @input="dataset.phone = $event" 
                  :errorText="isValidated && !dataset.phone? 'กรุณาระบุ': ''" 
                  :classer="isValidated && !dataset.phone? 'error': ''" 
                />
              </div>
              <div class="grid sm-50">
                <FormGroup 
                  label="อีเมล *" type="email"
                  :value="dataset.email" @input="dataset.email = $event" 
                  :errorText="isValidated && !dataset.email? 'กรุณาระบุ': ''" 
                  :classer="isValidated && !dataset.email? 'error': ''" 
                />
              </div>
            </div>
            <div class="btns">
              <Button text="ลงทะเบียน" type="submit" classer="btn-color-01 w-full" />
            </div>
            <div class="btns">
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

export default {
  name: 'AuthRegisterPage',
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
        password: '',
        confPassword: '',
        companyName: '',
        address: '',
        phone: '',
        email: ''
      }
    }
  },
  methods: {
    onSubmit(e) {
      var that = this;
      that.isValidated = true;
      
      var isValid = true;
      [
        'username', 'password', 'confPassword', 
        'companyName', 'address', 'phone', 'email'
      ].forEach(function(k){
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
