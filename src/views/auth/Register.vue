<template>
  <section class="auth-02">
    <div class="wrapper">
      <div class="img-container" style="background-image:url('/assets/img/bg/01.jpg');">
        <div data-aos="fade-up" data-aos-delay="0">
          <img class="logo" src="/assets/img/logo.png" alt="App Logo" />
        </div>
      </div>
      <div class="content-container">
        <div class="auth-container lg">

          <div v-if="registerStep == 0" data-aos="fade-up" data-aos-delay="150">
            <h6 class="h4 fw-400 color-sgray">
              TG Smart Backhaul
            </h6>
            <p class="h2 fw-500 color-p">
              ลงทะเบียน
            </p>
            <form action="/" method="GET" @submit.prevent="onSubmitStep">
              <div class="grid sm-100">
                <FormGroup 
                  type="text" label="เลขประจำตัวผู้เสียภาษี *" :required="true" 
                  placeholder="โปรดระบุ" :minlength="13" :maxlength="13" 
                  :value="datasetCompany.taxId" 
                  @input="datasetCompany.taxId = $event" 
                />
              </div>
              <div class="grids">
                <div class="grid sm-100">
                  <Button text="ขั้นต่อไป" type="submit" classer="btn-color-01 w-full" />
                </div>
              </div>
              <div class="btns">
                <a class="h6 fw-400 color-gray h-color-01" href="/auth/signin">
                  เข้าสู่ระบบ
                </a>
              </div>
            </form>
          </div>

          <div v-if="registerStep == 1" data-aos="fade-up" data-aos-delay="150">
            <h6 class="h4 fw-400 color-sgray">
              TG Smart Backhaul
            </h6>
            <p class="h2 fw-500 color-p">
              ลงทะเบียน
            </p>
            <form action="/" method="GET" @submit.prevent="onSubmitStep0">
              <div class="grids">
                <div class="grid sm-100">
                  <FormGroup 
                    type="text" label="ชื่อบริษัท *" :required="true" 
                    :maxlength="56" placeholder="โปรดระบุ" 
                    :value="datasetCompany.name" 
                    @input="datasetCompany.name = $event"
                    :disabled="thisexist == 1 ? '' : disabled"
                  />
                </div>
                <div class="grid sm-100">
                  <FormGroup 
                    type="textarea" label="ที่อยู่บริษัท *" :required="true" 
                    :rows="3" :maxlength="128" placeholder="โปรดระบุ" 
                    :value="datasetCompany.address" 
                    @input="datasetCompany.address = $event" 
                    :disabled="thisexist == 1 ? '' : disabled"
                  />
                </div>
                
                   
                <div class="grid sm-50">
                  <FormGroup 
                    type="select" label="จังหวัด *" :required="true" placeholder="โปรดเลือก" 
                    :value="datasetCompany.province" 
                    @input="datasetCompany.province = $event"
                    :options="provinces"
                    :disabled="thisexist == 1 ? '' : disabled"
                  />
                </div>
                <div class="grid sm-50">
                  <FormGroup 
                    type="text" label="รหัสไปรษณีย์ *" :required="true" 
                    placeholder="โปรดระบุ" :minlength="5" :maxlength="5" 
                    :value="datasetCompany.zipcode" 
                    @input="datasetCompany.zipcode = $event"
                    :disabled="thisexist == 1 ? '' : disabled"
                  />
                </div>
                <div class="grid sm-100">
                  <FormGroup 
                    type="text" label="เลขประจำตัวผู้เสียภาษี *" :required="true" 
                    placeholder="โปรดระบุ" :minlength="13" :maxlength="13" 
                    :value="datasetCompany.taxId" 
                    @input="datasetCompany.taxId = $event"
                    :disabled="thisexist == 1 ? '' : disabled"
                  />
                </div>
                <div class="grids">
                  <div class="grid sm-50 xs-50">
                    <Button 
                      text="ย้อนกลับ" href="javascript:" classer="btn-color-11 w-full" 
                      @click="registerStep = registerStep - 1"
                    />
                  </div>
                  <div class="grid sm-50 xs-50">
                    <Button text="ขั้นต่อไป" type="submit" classer="btn-color-01 w-full" />
                  </div>
                </div>
              </div>
            </form>

            <div class="btns">
              <a class="h6 fw-400 color-gray h-color-01" href="/auth/signin">
                เข้าสู่ระบบ
              </a>
            </div>
          </div>
          
          <div v-if="registerStep == 2" data-aos="fade-up" data-aos-delay="150">
            <h6 class="h4 fw-400 color-sgray">
              TG Smart Backhaul
            </h6>
            <p class="h2 fw-500 color-p">
              ลงทะเบียน
            </p>
            <form action="/" method="GET" @submit.prevent="onSubmitStep1">
              <div class="grids">
                <div class="grid lg-30 md-40 sm-50 xs-50">
                  <FormGroup 
                    type="select" label="คำนำหน้า *" :required="true" placeholder="โปรดเลือก" 
                    :value="dataset.prefix" 
                    @input="dataset.prefix = $event" 
                    :options="[
                      { value: 'นาย', text: 'นาย' },
                      { value: 'นาง', text: 'นาง' },
                      { value: 'นางสาว', text: 'นางสาว' }
                    ]"
                  />
                </div>
                <div class="grid xl-0 lg-0 sm-100 mt-0"></div>
                <div class="grid lg-35 md-50 sm-50">
                  <FormGroup 
                    type="text" label="ชื่อ *" :required="true" 
                    :maxlength="64" placeholder="โปรดระบุ" 
                    :value="dataset.firstname" 
                    @input="dataset.firstname = $event" 
                  />
                </div>
                <div class="grid lg-35 md-50 sm-50">
                  <FormGroup 
                    type="text" label="นามสกุล *" :required="true" 
                    :maxlength="64" placeholder="โปรดระบุ" 
                    :value="dataset.lastname" 
                    @input="dataset.lastname = $event" 
                  />
                </div>
                <div class="sep"></div>
                <div class="grid sm-50">
                  <FormGroup 
                    type="text" label="เบอร์โทร *" :required="true" 
                    :maxlength="10" placeholder="โปรดระบุ" 
                    :value="dataset.phone" 
                    @input="dataset.phone = $event" 
                  />
                </div>
                <div class="grid sm-50">
                  <FormGroup 
                    type="select" label="ตำแหน่ง *" :required="true" placeholder="โปรดเลือก" 
                    :value="dataset.roleId" 
                    @input="dataset.roleId = $event" 
                    :options="[
                      { value: 'freight-forwarder', text: 'Freight Forwarder' },
                      { value: 'driver', text: 'Driver' }
                    ]"
                  />
                </div>
              </div>
              <div class="grids">
                <div class="grid sm-50 xs-50">
                  <Button 
                    text="ย้อนกลับ" href="javascript:" classer="btn-color-11 w-full" 
                    @click="registerStep = registerStep - 1"
                  />
                </div>
                <div class="grid sm-50 xs-50">
                  <Button text="ขั้นต่อไป" type="submit" classer="btn-color-01 w-full" />
                </div>
              </div>
            </form>
          </div>
          
          <div v-if="registerStep == 3" data-aos="fade-left" data-aos-delay="150">
            <h6 class="h4 fw-400 color-sgray">
              TG Smart Backhaul
            </h6>
            <p class="h2 fw-500 color-p">
              ลงทะเบียน
            </p>
            <form @submit="handleRegister">
              <div class="grids">
                <div class="grid sm-50">
                  <FormGroup 
                    type="text" label="ชื่อผู้ใช้ *" :required="true" placeholder="โปรดระบุ" 
                    :value="dataset.username" 
                    @input="dataset.username = $event" 
                  />
                </div>
                <div class="grid sm-50">
                  <FormGroup 
                    type="email" label="อีเมล *" :required="true" placeholder="โปรดระบุ" 
                    :value="dataset.email" 
                    @input="dataset.email = $event" 
                  />
                </div>
                <div class="grid sm-50">
                  <FormGroup 
                    type="password" label="รหัสผ่าน *" :required="true" placeholder="โปรดระบุ" 
                    :value="dataset.password" 
                    @input="dataset.password = $event" 
                  />
                </div>
                <div class="grid sm-50">
                  <FormGroup 
                    type="password" label="ยืนยันรหัสผ่าน *" :required="true" placeholder="โปรดระบุ" 
                    :value="dataset.confPassword" 
                    @input="dataset.confPassword = $event" 
                  />
                </div>
              </div>
              <div class="grids">
                <div class="grid sm-50 xs-50">
                  <Button 
                    text="ย้อนกลับ" href="javascript:" classer="btn-color-11 w-full" 
                    @click="registerStep = registerStep - 1"
                  />
                </div>
                <div class="grid sm-50 xs-50">
                  <Button text="ลงทะเบียน" type="submit" classer="btn-color-01 w-full" />
                </div>
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
import axios from 'axios';
import RegisUser from '../../models/regis-user';

export default {
  name: 'AuthRegisterPage',
  components: {
    FormGroup,
    Button
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });

    const response = axios.get('master-module/province').then(response => {
      for(let i in response.data){
        this.provinces.push({ value: response.data[i].PROVINCE_NAME, text: response.data[i].PROVINCE_NAME })
      }
    });
  },
  data() {
    return {
      registerStep: 0,
      datasetCompany: {
        name: '',
        address: '',
        province: '',
        zipcode: '',
        taxId: ''
      },
      dataset: {
        prefix: '',
        firstname: '',
        lastname: '',
        phone: '',
        roleId: '',
        username: '',
        email: '',
        password: '',
        confPassword: ''
      },
      provinces: [],
      thisexist: 0
    }
  },
  methods: {
    onSubmitStep() {
      console.log(this.datasetCompany.taxId)
      const response = axios.post('auth/companydetail_ifexist' , {
          taxid: this.datasetCompany.taxId,
        }, {
          headers: {
            'Access-Control-Allow-Origin' : '*',
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          }
        }).then(response => {
            if (response.data.company_exist) {
              console.log("name: ", response.data.company_detail.company_name)
              console.log("address: ", response.data.company_detail.address)
              console.log("postal: ", response.data.company_detail.company_postal)
              console.log("province: ", response.data.company_detail.company_province)
              this.datasetCompany.name = response.data.company_detail.company_name
              this.datasetCompany.address = response.data.company_detail.address
              this.datasetCompany.zipcode = response.data.company_detail.company_postal
              this.datasetCompany.province = response.data.company_detail.company_province

              this.thisexist = 1
            } else {
              this.datasetCompany.name = ''
              this.datasetCompany.address = ''
              this.datasetCompany.zipcode = ''
              this.datasetCompany.province = ''
              this.thisexist = 0
            }
          }).catch(err => {
            console.log(err);
          });
      this.registerStep = 1;
    },
    onSubmitStep0() {
      this.registerStep = 2;
      const response = axios.post('auth/checktaxid' , {
          taxid: this.datasetCompany.taxId
        }).then(response => {
            this.registerStep = 2;
        });
    },
    onSubmitStep1() {
      this.registerStep = 3;
    },
    onSubmitStep2() {
      if(this.dataset.roleId == 1){
        const response = axios.post('auth/checktaxid' , {
          taxid: this.datasetCompany.taxId
        })
        return window.location.href = '/forwarder/dashboard';
      }else{
        return window.location.href = '/driver/my-jobs';
      }
    },
    handleRegister(e) {
        e.preventDefault()

        console.log(this.dataset.username);
        console.log(this.dataset.password);
        console.log(this.dataset.email);
        console.log(this.datasetCompany.taxId);
        console.log(this.dataset.roleId);
        console.log(this.dataset.prefix);
        console.log(this.dataset.firstname);
        console.log(this.dataset.lastname);
        console.log(this.dataset.phone);

        let regisUser = new RegisUser(
          this.dataset.username,
          this.dataset.password,
          this.dataset.email,
          this.datasetCompany.taxId,
          this.dataset.roleId,
          this.dataset.prefix,
          this.dataset.firstname,
          this.dataset.lastname,
          this.dataset.phone
        )

        if (this.dataset.username && this.dataset.email && this.dataset.password && this.dataset.confPassword) {
          this.$store.dispatch('auth/register', regisUser).then(
            () => {
              this.$router.push('/auth/signin');
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
        this.isValidated = true;
    }
  }
}
</script>
