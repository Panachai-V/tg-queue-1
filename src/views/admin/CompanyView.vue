<template>
  <Topnav :user="user" />
  <Sidenav :user="user" :activeIndex="sidenavActiveIndex" />

  <section class="section-full pull-right">
    <div class="container">
      <div class="section-header mb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="btns mt-0">
          <a href="/admin/companies" class="btn color-gray h-color-01">
            <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
            ย้อนกลับ
          </a>
        </div>
        <div class="header-wrapper">
          <div class="text-container">
            <h6 class="h3">View Company</h6>
          </div>
        </div>
      </div>
      
      <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
        <p class="fw-400">ภาพรวม</p>
      </div>
      <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
        <div class="grids">
          <div class="grid lg-1-3">
            <SpecialCard03 
              label="Job Requests รอการเสนอราคา" :count="3" unit="งาน" 
              classer="no-hover"
            />
          </div>
          <div class="grid lg-1-3">
            <SpecialCard03 
              label="Job Requests ที่กำลังดำเนินการ" :count="2" unit="งาน" 
              classer="no-hover"
            />
          </div>
          <div class="grid lg-1-3">
            <SpecialCard03 
              label="Job Requests ที่ดำเนินการเสร็จสิ้น" :count="34" unit="งาน" 
              classer="no-hover"
            />
          </div>
          <div class="grid lg-1-3">
            <SpecialCard03 
              label="ความพึงพอใจเฉลี่ย" :count="4.75" unit="/ 5" 
              classer="no-hover"
            />
          </div>
          <div class="grid lg-1-3">
            <SpecialCard03 
              label="พนักงานในบริษัท" :count="8" unit="คน" 
              classer="no-hover"
            />
          </div>
        </div>
      </div>

      <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
        <p class="fw-400">ข้อมูลทั่วไป</p>
      </div>
      <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
        <div class="grids">
          <div class="grid xl-10 lg-15 md-20 sm-30 xs-50">
            <FormGroup type="plain" label="คำนำหน้า" :value="dataset.prefix" />
          </div>
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="ชื่อ" :value="dataset.firstname" />
          </div>
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="นามสกุล" :value="dataset.lastname" />
          </div>
          <div class="sep"></div>
          
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="เบอร์โทรศัพท์" :value="dataset.phone" />
          </div>
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="รูปโปรไฟล์" />
          </div>
          <div class="sep"></div>
          
          <div class="grid lg-60 md-80 sm-100">
            <FormGroup type="plain" label="ที่อยู่" :value="dataset.address" />
          </div>
          <div class="sep"></div>
          
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="จังหวัด" :value="dataset.province" />
          </div>
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="รหัสไปรษณีย์" :value="dataset.zipcode" />
          </div>
        </div>
      </div>
        
      <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
        <p class="fw-400">ข้อมูลบริษัท</p>
      </div>
      <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
        <div class="grids">
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="ชื่อบริษัท" :value="dataset.company" />
          </div>
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="เบอร์โทรบริษัท" :value="dataset.companyPhone" />
          </div>
          <div class="sep"></div>
          
          <div class="grid lg-60 md-80 sm-100">
            <FormGroup type="plain" label="ที่อยู่บริษัท" :value="dataset.companyAddress" />
          </div>
          <div class="sep"></div>
          
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="จังหวัด" :value="dataset.companyProvince" />
          </div>
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="รหัสไปรษณีย์" :value="dataset.companyZipcode" />
          </div>
        </div>
      </div>
      
      <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
        <p class="fw-400">บัญชีผู้ใช้</p>
      </div>
      <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150">
        <div class="grids">
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="ชื่อผู้ใช้" :value="dataset.username" />
          </div>
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="อีเมล" :value="dataset.email" />
          </div>
          <div class="grid lg-30 md-40 sm-100">
            <FormGroup type="plain" label="สถานะ" :value="dataset.status? 'เปิดใช้งาน': 'ปิดใช้งาน'" />
          </div>
        </div>
      </div>
      
      <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
        <p class="fw-400">พนักงานขับรถ</p>
      </div>
      <div class="pb-2" data-aos="fade-up" data-aos-delay="150">
        <DataTable 
          :rows="rows1" 
          :columns="[
            { key: 'avatar', text: 'รูปโปรไฟล์' },
            { key: 'username', text: 'บัญชีผู้ใช้' },
            { key: 'firstname', text: 'ชื่อจริง' },
            { key: 'lastname', text: 'นามสกุล' },
            { key: 'email', text: 'อีเมล' },
            { key: 'status', text: 'สถานะ' },
            { key: 'options', classer: 'options' }
          ]" 
          :search="[ 'username', 'firstname', 'lastname', 'email' ]" 
          :orders="[
            { key: 'username-asc', text: 'ชื่อบัญชีผู้ใช้ (ใหม่สุด)' },
            { key: 'username-desc', text: 'ชื่อบัญชีผู้ใช้ (เก่าสุด)' },
            { key: 'firstname-desc', text: 'ชื่อจริง (ใหม่สุด)' },
            { key: 'firstname-asc', text: 'ชื่อจริง (เก่าสุด)' },
            { key: 'lastname-desc', text: 'นามสกุล (ใหม่สุด)' },
            { key: 'lastname-asc', text: 'นามสกุล (เก่าสุด)' },
            { key: 'email-desc', text: 'อีเมล (ใหม่สุด)' },
            { key: 'email-asc', text: 'อีเมล (เก่าสุด)' }
          ]" 
          :groups="{
            filter: 'status',
            options: [
              { text: 'เปิดใช้งาน', value: 1, checked: true },
              { text: 'ปิดใช้งาน', value: 0, checked: true }
            ]
          }" 
          @click-view="(id)=>openDriverView(id)" 
          @click-edit="(id)=>openDriverEdit(id)" 
        />
      </div>
    </div>
  </section>
  
  <!-- Driver View -->
  <div class="popup-container" :class="{ 'active': openedDriverView }">
    <div class="wrapper">
      <div class="close-filter" @click="openedDriverView = !openedDriverView"></div>
      <div class="popup-box md">
        <div class="header">
          <div class="btns mt-0">
            <a href="javascript:" class="btn btn-close" @click="openedDriverView = !openedDriverView">
              <img class="icon-prepend xs" src="/assets/img/icon/close.svg" alt="Image Icon" />
              ปิดหน้าต่าง
            </a>
          </div>
          <div class="header-wrapper">
            <div class="text-container">
              <h6 class="h3">View Driver</h6>
            </div>
            <div class="btns hide-mobile">
              <Button 
                text="ปิด" href="javascript:" classer="btn-color-08" 
                @click="openedDriverView = !openedDriverView"
              />
            </div>
            <div class="btns show-mobile">
              <Button 
                text="ปิด" href="javascript:" classer="btn-color-08 btn-sm" 
                @click="openedDriverView = !openedDriverView"
              />
            </div>
          </div>
        </div>
        <div class="body-wrapper">
          <div class="stripe border-bottom bcolor-fgray pl-0 pr-0">
            <div class="body pt-0 pb-0">
              <p class="fw-400">ข้อมูลทั่วไป</p>
            </div>
          </div>
          <div class="body pb-5">
            <div class="grids">
              <div class="grid sm-25">
                <FormGroup type="plain" label="คำนำหน้า" value="นาย" />
              </div>
              <div class="grid sm-1-3 xs-50">
                <FormGroup type="plain" label="ชื่อ" value="จริงใจ" />
              </div>
              <div class="grid sm-1-3 xs-50">
                <FormGroup type="plain" label="นามสกุล" value="ใจมั่นคง" />
              </div>
              <div class="sep"></div>
          
              <div class="grid sm-50 xs-50">
                <FormGroup type="plain" label="เบอร์โทรศัพท์" value="091-234 5678" />
              </div>
              <div class="grid sm-50 xs-50">
                <FormGroup type="plain" label="รูปโปรไฟล์" />
              </div>
              <div class="sep"></div>
          
              <div class="grid sm-100">
                <FormGroup type="plain" label="ที่อยู่" value="Racha Thewa, Bang Phli District" />
              </div>
              <div class="sep"></div>
              
              <div class="grid sm-50 xs-50">
                <FormGroup type="plain" label="จังหวัด" value="Samut Prakan" />
              </div>
              <div class="grid sm-50 xs-50">
                <FormGroup type="plain" label="รหัสไปรษณีย์" value="10540" />
              </div>
            </div>
          </div>
          
          <div class="stripe border-bottom bcolor-fgray pl-0 pr-0">
            <div class="body pt-0 pb-0">
              <p class="fw-400">บัญชีผู้ใช้</p>
            </div>
          </div>
          <div class="body pb-5">
            <div class="grids">
              <div class="grid md-1-3 sm-50 xs-50">
                <FormGroup type="plain" label="ชื่อผู้ใช้" value="User0001" />
              </div>
              <div class="grid md-1-3 sm-50 xs-50">
                <FormGroup type="plain" label="อีเมล" value="employee@gmail.com" />
              </div>
              <div class="grid md-1-3 sm-50 xs-50">
                <FormGroup type="plain" label="สถานะ" value="เปิดใช้งาน" />
              </div>
            </div>
          </div>

          <div class="stripe border-bottom bcolor-fgray pl-0 pr-0">
            <div class="body pt-0 pb-0">
              <p class="fw-400">ภาพรวม</p>
            </div>
          </div>
          <div class="body">
            <div class="grids">
              <div class="grid sm-50">
                <SpecialCard03 
                  label="งานที่สำเร็จแล้ว" :count="48" unit="งาน" 
                  classer="sm no-hover"
                />
              </div>
              <div class="grid sm-50">
                <SpecialCard03 
                  label="ความพึงพอใจโดยรวม" :count="4.68" unit="/ 5" 
                  classer="sm no-hover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Driver Edit -->
  <div class="popup-container" :class="{ 'active': openedDriverEdit }">
    <div class="wrapper">
      <div class="close-filter" @click="openedDriverEdit = !openedDriverEdit"></div>
      <form class="w-full" action="/" method="GET" @submit="onSubmitDriverEdit">
        <div class="popup-box md">
          <div class="header">
            <div class="btns mt-0">
              <a href="javascript:" class="btn btn-close" @click="openedDriverEdit = !openedDriverEdit">
                <img class="icon-prepend xs" src="/assets/img/icon/close.svg" alt="Image Icon" />
                ปิดหน้าต่าง
              </a>
            </div>
            <div class="header-wrapper">
              <div class="text-container">
                <h6 class="h3">Edit Driver</h6>
              </div>
              <div class="btns hide-mobile">
                <Button 
                  type="submit" text="แก้ไข" 
                  classer="btn-color-01 mr-2" :prepend="true" icon="check-white.svg" 
                />
                <Button 
                  text="ปิด" href="javascript:" classer="btn-color-08" 
                  @click="openedDriverEdit = !openedDriverEdit"
                />
              </div>
              <div class="btns show-mobile">
                <Button 
                  type="submit" text="แก้ไข" classer="btn-color-01 btn-sm mr-1"
                />
                <Button 
                  text="ปิด" href="javascript:" classer="btn-color-08 btn-sm" 
                  @click="openedDriverEdit = !openedDriverEdit"
                />
              </div>
            </div>
          </div>
          <div class="body-wrapper">
            <div class="stripe border-bottom bcolor-fgray pl-0 pr-0">
              <div class="body pt-0 pb-0">
                <p class="fw-400">ข้อมูลทั่วไป</p>
              </div>
            </div>
            <div class="body pb-5">
              <div class="grids">
                <div class="grid sm-25">
                  <FormGroup 
                    type="select" label="คำนำหน้า *" 
                    value="นาย" :required="true" 
                    :options="[
                      { value: 'นาย', text: 'นาย' },
                      { value: 'นาง', text: 'นาง' },
                      { value: 'นางสาว', text: 'นางสาว' }
                    ]"
                  />
                </div>
                <div class="grid sm-1-3 xs-50">
                  <FormGroup 
                    type="text" label="ชื่อ *" placeholder="โปรดระบุ" 
                    value="จริงใจ" :required="true" 
                  />
                </div>
                <div class="grid sm-1-3 xs-50">
                  <FormGroup 
                    type="text" label="นามสกุล *" placeholder="โปรดระบุ" 
                    value="ใจมั่นคง" :required="true" 
                  />
                </div>
                <div class="sep"></div>
            
                <div class="grid sm-50 xs-50">
                  <FormGroup 
                    type="text" label="เบอร์โทรศัพท์" placeholder="โปรดระบุ" 
                    value="เบอร์โทรศัพท์" 
                  />
                </div>
                <div class="grid sm-50 xs-50">
                  <FormGroup 
                    type="file-image" label="รูปโปรไฟล์" 
                  />
                </div>
                <div class="sep"></div>
            
                <div class="grid sm-100">
                  <FormGroup 
                    type="textarea" label="ที่อยู่ *" placeholder="โปรดระบุ" 
                    value="Racha Thewa, Bang Phli District" 
                    :required="true" 
                  />
                </div>
                <div class="sep"></div>
                
                <div class="grid sm-50 xs-50">
                  <FormGroup 
                    type="text" label="จังหวัด *" placeholder="โปรดระบุ" 
                    value="Samut Prakan" :required="true" 
                  />
                </div>
                <div class="grid sm-50 xs-50">
                  <FormGroup 
                    type="text" label="รหัสไปรษณีย์ *" placeholder="โปรดระบุ" 
                    value="10540" :required="true" 
                  />
                </div>
              </div>
            </div>
            
            <div class="stripe border-bottom bcolor-fgray pl-0 pr-0">
              <div class="body pt-0 pb-0">
                <p class="fw-400">บัญชีผู้ใช้</p>
              </div>
            </div>
            <div class="body pb-5">
              <div class="grids">
                <div class="grid md-1-3 sm-50 xs-50">
                  <FormGroup 
                    type="text" label="ชื่อผู้ใช้ *" placeholder="โปรดระบุ" 
                    value="User0001" :required="true" 
                  />
                </div>
                <div class="grid md-1-3 sm-50 xs-50">
                  <FormGroup 
                    type="email" label="อีเมล *" placeholder="โปรดระบุ" 
                    value="employee@gmail.com" :required="true" 
                  />
                </div>
                <div class="grid md-1-3 sm-50 xs-50">
                  <FormGroup 
                    type="select" label="สถานะ" placeholder="โปรดเลือก" 
                    :value="1" 
                    :options="[
                      { value: 1, text: 'เปิดใช้งาน' },
                      { value: 0, text: 'ปิดใช้งาน' }
                    ]"
                  />
                </div>
                <div class="sep"></div>
                <div class="grid sm-50">
                  <FormGroup 
                    type="password" label="รหัสผ่าน" placeholder="โปรดระบุ" 
                  />
                </div>
                <div class="grid sm-50">
                  <FormGroup 
                    type="password" label="ยืนยันรหัสผ่าน" placeholder="โปรดระบุ" 
                  />
                </div>
              </div>
            </div>

            <div class="stripe border-bottom bcolor-fgray pl-0 pr-0">
              <div class="body pt-0 pb-0">
                <p class="fw-400">ภาพรวม</p>
              </div>
            </div>
            <div class="body">
              <div class="grids">
                <div class="grid sm-50">
                  <SpecialCard03 
                    label="งานที่สำเร็จแล้ว" :count="48" unit="งาน" 
                    classer="sm no-hover"
                  />
                </div>
                <div class="grid sm-50">
                  <SpecialCard03 
                    label="ความพึงพอใจโดยรวม" :count="4.68" unit="/ 5" 
                    classer="sm no-hover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Topnav from '../../components/Topnav';
import Sidenav from '../../components/Sidenav';
import DataTable from '../../components/DataTable';
import SpecialCard03 from '../../components/SpecialCard03';

export default {
  name: 'AdminCompanyViewPage',
  components: {
    Topnav,
    Sidenav,
    DataTable,
    SpecialCard03
  },
  data() {
    return {
      sidenavActiveIndex: 3,
      user: {
        id: 1,
        role: 'Admin', /* Product Owner, Company, Driver, Admin */
        company: 'บริษัท พีอาร์เดริเวรี่ จำกัด',
        username: 'General User',
        prefix: 'นาย',
        firstname: 'สมศักดิ์',
        lastname: 'จริงใจ',
        email: 'user@gmail.com',
        phone: '081-1123456',
        avatar: '/assets/img/misc/profile.jpg'
      },

      isValidated: false,
      dataset: {
        prefix: 'นาย',
        firstname: 'จริงใจ',
        lastname: 'ใจมั่นคง',
        phone: '091-234 5678',
        address: 'Racha Thewa, Bang Phli District',
        province: 'Samut Prakan',
        zipcode: '10540',

        company: 'บริษัท พีอาร์เดริเวรี่ จำกัด',
        companyPhone: '',
        companyAddress: 'Racha Thewa, Bang Phli District',
        companyProvince: 'Samut Prakan',
        companyZipcode: '10540',
        
        username: 'User0001',
        email: 'employee@gmail.com',
        password: '',
        confPassword: '',
        statue: 1,
      },

      openedDriverView: false,
      openedDriverEdit: false,
      rows1: []
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    document.getElementById('color_style').href = '/assets/css/color-admin.css';
    for(var i=0; i<8; i++){
      if(i<2){
        this.rows1.push({
          avatar: { type: 'avatar', text: '/assets/img/misc/profile.jpg' },
          username: { text: 'User000'+i },
          firstname: { text: 'นาย จริงใจ' },
          lastname: { text: 'ใจมั่นคง' },
          email: { text: 'employee@gmail.com' },
          status: { type: 'tag', value: 0, text: 'ปิดใช้งาน', classer: 'ss-tag-danger' },
          options: {
            type: 'options',
            view: { type: 'emit', id: i, href: '/company/driver-view' },
            edit: { type: 'emit', id: i, href: '/company/driver-edit' }
          }
        });
      }else{
        this.rows1.push({
          avatar: { type: 'avatar', text: '/assets/img/misc/profile.jpg' },
          username: { text: 'User000'+i },
          firstname: { text: 'นาย จริงใจ' },
          lastname: { text: 'ใจมั่นคง' },
          email: { text: 'employee@gmail.com' },
          status: { type: 'tag', value: 1, text: 'เปิดใช้งาน', classer: 'ss-tag-success' },
          options: {
            type: 'options',
            view: { type: 'emit', id: i, href: '/company/driver-view' },
            edit: { type: 'emit', id: i, href: '/company/driver-edit' }
          }
        });
      }
    }
  },
  methods: {
    openDriverView(id) {
      this.openedDriverView = !this.openedDriverView;
    },
    openDriverEdit(id) {
      this.openedDriverEdit = !this.openedDriverEdit;
    },
    onSubmitDriverEdit(e) {
      e.preventDefault();
      this.openedDriverEdit = !this.openedDriverEdit;
    }
  }
}
</script>
