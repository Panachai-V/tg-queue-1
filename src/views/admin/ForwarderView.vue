<template>
  <Topnav :user="user" />
  <Sidenav :user="user" :activeIndex="sidenavActiveIndex" />

  <section class="section-full pull-right">
    <div class="container">

      <div class="section-header mb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="btns mt-0">
          <a href="/admin/forwarders" class="btn color-gray h-color-01">
            <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
            ย้อนกลับ
          </a>
        </div>
        <div class="header-wrapper">
          <div class="text-container">
            <h6 class="h3">View Freight Forwarder</h6>
          </div>
          <div class="btns hide-mobile">
            <Button 
              text="ย้อนกลับ" href="/admin/forwarders" classer="btn-color-08 ml-2"
            />
          </div>
          <div class="btns show-mobile">
            <Button 
              text="ย้อนกลับ" href="/admin/forwarders" classer="btn-color-08 btn-sm ml-1"
            />
          </div>
        </div>
      </div>

      <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
        <p class="fw-400">ข้อมูลบริษัท</p>
      </div>
      <div class="section-px section-py-grid" data-aos="fade-up" data-aos-delay="150" v-if="!getLoadingStatus">
        <div class="grids">
          <div class="grid xl-60 lg-70 sm-100">
            <FormGroup 
              type="plain" label="ชื่อบรืษัท" :value="getForwardersDetail.company_name" 
            />
          </div>
          <div class="sep"></div>
          <div class="grid xl-60 lg-70 sm-100">
            <FormGroup 
              type="plain" label="ที่อยู่บริษัท" :value="getForwardersDetail.address" 
            />
          </div>
          <div class="sep"></div>
          <div class="grid xl-30 lg-35">
            <FormGroup 
              type="plain" label="จังหวัด" :value="getForwardersDetail.province" 
            />
          </div>
          <div class="grid xl-30 lg-35">
            <FormGroup 
              type="plain" label="รหัสไปรษณีย์" :value="getForwardersDetail.postal" 
            />
          </div>
          <div class="sep"></div>
          <div class="grid xl-30 lg-35">
            <FormGroup 
              type="plain" label="เลขประจำตัวผู้เสียภาษี" :value="getForwardersDetail.tax_id" 
            />
          </div>
          <div class="grid xl-30 lg-35">
            <FormGroup 
              type="plain" label="สถานะ" :value="getForwardersDetail.status? 'เปิดใช้งาน': 'ปิดใช้งาน'" 
            />
          </div>
        </div>
      </div>

      <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
        <d class="d-flex ai-center jc-space-between w-full">
          <p class="fw-400">บัญชีผู้ใช้งาน</p>
          <Button 
            text="เพิ่ม" href="javascript:" classer="btn-color-01 btn-sm" 
            @click="isActivePopupAccountAdd = !isActivePopupAccountAdd"  
          />
        </d>
      </div>
      <div class="pb-2" data-aos="fade-up" data-aos-delay="150" v-if="!getLoadingStatus">
        <DataTable 
          :rows="getforwardersFF" 
          :columns="[
            { key: 'avatar', text: 'รูปโปรไฟล์' },
            { key: 'username', text: 'บัญชีผู้ใช้' },
            { key: 'firstname', text: 'ชื่อ' },
            { key: 'lastname', text: 'นามสกุล' },
            { key: 'email', text: 'อีเมล' },
            { key: 'phone', text: 'เบอร์โทรศัพท์' },
            { key: 'status', text: 'สถานะ' },
            { key: 'options', classer: 'options' }
          ]" 
          :search="[ 'username', 'firstname', 'lastname', 'email' ]" 
          :orders="[
            { key: 'username-asc', text: 'ชื่อบัญชีผู้ใช้ (ใหม่สุด)' },
            { key: 'username-desc', text: 'ชื่อบัญชีผู้ใช้ (เก่าสุด)' },
            { key: 'firstname-desc', text: 'ชื่อ (ใหม่สุด)' },
            { key: 'firstname-asc', text: 'ชื่อ (เก่าสุด)' },
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
          @click-view="(id)=>openAccountView(id)" 
          @click-edit="(id)=>openAccountEdit(id)" 
          @click-delete="(id)=>openAccountDelete(id)" 
        />
      </div>

      <div class="stripe section-px border-bottom bcolor-fgray" data-aos="fade-up" data-aos-delay="150">
        <d class="d-flex ai-center jc-space-between w-full">
          <p class="fw-400">พนักงานขับรถ</p>
          <Button 
            text="เพิ่ม" href="javascript:" classer="btn-color-01 btn-sm" 
            @click="isActivePopupAccountAdd = !isActivePopupAccountAdd"  
          />
        </d>
      </div>
      <div class="pb-2" data-aos="fade-up" data-aos-delay="150" v-if="!getLoadingStatus">
        <DataTable 
          :rows="getforwardersDriver" 
          :columns="[
            { key: 'avatar', text: 'รูปโปรไฟล์' },
            { key: 'username', text: 'บัญชีผู้ใช้' },
            { key: 'firstname', text: 'ชื่อ' },
            { key: 'lastname', text: 'นามสกุล' },
            { key: 'email', text: 'อีเมล' },
            { key: 'phone', text: 'เบอร์โทรศัพท์' },
            { key: 'status', text: 'สถานะ' },
            { key: 'options', classer: 'options' }
          ]" 
          :search="[ 'username', 'firstname', 'lastname', 'email' ]" 
          :orders="[
            { key: 'username-asc', text: 'ชื่อบัญชีผู้ใช้ (ใหม่สุด)' },
            { key: 'username-desc', text: 'ชื่อบัญชีผู้ใช้ (เก่าสุด)' },
            { key: 'firstname-desc', text: 'ชื่อ (ใหม่สุด)' },
            { key: 'firstname-asc', text: 'ชื่อ (เก่าสุด)' },
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
          @click-view="(id)=>openAccountView(id)" 
          @click-edit="(id)=>openAccountEdit(id)" 
          @click-delete="(id)=>openAccountDelete(id)" 
        />
      </div>

    </div>
  </section>
  
  <!-- Popup Account Add -->
  <div class="popup-container" :class="{ 'active': isActivePopupAccountAdd }">
    <div class="wrapper">
      <div class="close-filter" @click="isActivePopupAccountAdd = !isActivePopupAccountAdd"></div>
      <form action="/admin/forwarder-view" method="GET" class="w-full">
        <div class="popup-box">
          <div class="header">
            <div class="btns mt-0">
              <a href="javascript:" class="btn btn-close" @click="isActivePopupAccountAdd = !isActivePopupAccountAdd">
                <img class="icon-prepend xs" src="/assets/img/icon/close.svg" alt="Image Icon" />
                ปิดหน้าต่าง
              </a>
            </div>
            <div class="header-wrapper">
              <div class="text-container">
                <h6 class="h3">Add Forwarder Account</h6>
              </div>
              <div class="btns hide-mobile">
                <Button 
                  type="submit" text="เพิ่ม" classer="btn-color-01 mr-2" 
                  :prepend="true" icon="plus-white.svg" 
                />
                <Button 
                  text="ปิด" href="javascript:" classer="btn-color-08" 
                  @click="isActivePopupAccountAdd = !isActivePopupAccountAdd"
                />
              </div>
              <div class="btns show-mobile">
                <Button 
                  type="submit" text="เพิ่ม" classer="btn-color-01 btn-sm mr-1" 
                />
                <Button 
                  text="ปิด" href="javascript:" classer="btn-color-08 btn-sm" 
                  @click="isActivePopupAccountAdd = !isActivePopupAccountAdd"
                />
              </div>
            </div>
          </div>
          <div class="body-wrapper">
            <div class="body">
              <div class="grids">
                <div class="grid md-20 sm-30">
                  <FormGroup
                    label="คำนำหน้า *" type="select" :required="true" 
                    :options="[ 
                      { value: 'นาย', text: 'นาย' }, 
                      { value: 'นาง', text: 'นาง' }, 
                      { value: 'นางสาว', text: 'นางสาว' }
                    ]"
                  />
                </div>
                <div class="grid md-40 sm-35">
                  <FormGroup
                    label="ชื่อ *" type="text" :required="true" 
                  />
                </div>
                <div class="grid md-40 sm-35">
                  <FormGroup
                    label="นามสกุล *" type="text" :required="true" 
                  />
                </div>
                <div class="grid sm-50">
                  <FormGroup
                    label="เบอร์โทรศัพท์ *" type="text" :required="true" 
                  />
                </div>
                <div class="grid sm-50">
                  <FormGroup
                    label="รูปโปรไฟล์" type="file-image" name="avatar" 
                  />
                </div>
                <div class="grid sm-50">
                  <FormGroup
                    label="สถานะ *" type="select" 
                    :options="[ 
                      { value: 1, text: 'เปิดใช้งาน' }, 
                      { value: 0, text: 'ปิดใช้งาน' }
                    ]"
                  />
                </div>
              </div>
            </div>
            <div class="border-top bcolor-fgray"></div>
            <div class="body">
              <div class="grids">
                <div class="grid sm-50">
                  <FormGroup
                    label="ชื่อผู้ใช้ *" type="text" :required="true" 
                  />
                </div>
                <div class="grid sm-50">
                  <FormGroup
                    label="อีเมล *" type="email" :required="true" 
                  />
                </div>
                <div class="grid sm-50">
                  <FormGroup
                    label="รหัสผ่าน *" type="password" :required="true" 
                  />
                </div>
                <div class="grid sm-50">
                  <FormGroup
                    label="ยืนยันรหัสผ่าน *" type="password" :required="true" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  <!-- Popup Account View -->
  <div class="popup-container" :class="{ 'active': isActivePopupAccountView }">
    <div class="wrapper">
      <div class="close-filter" @click="isActivePopupAccountView = !isActivePopupAccountView"></div>
      <div class="popup-box">
        <div class="header">
          <div class="btns mt-0">
            <a href="javascript:" class="btn btn-close" @click="isActivePopupAccountView = !isActivePopupAccountView">
              <img class="icon-prepend xs" src="/assets/img/icon/close.svg" alt="Image Icon" />
              ปิดหน้าต่าง
            </a>
          </div>
          <div class="header-wrapper">
            <div class="text-container">
              <h6 class="h3">View Forwarder Account</h6>
            </div>
            <div class="btns hide-mobile">
              <Button 
                text="ปิด" href="javascript:" classer="btn-color-08" 
                @click="isActivePopupAccountView = !isActivePopupAccountView"
              />
            </div>
            <div class="btns show-mobile">
              <Button 
                text="ปิด" href="javascript:" classer="btn-color-08 btn-sm" 
                @click="isActivePopupAccountView = !isActivePopupAccountView"
              />
            </div>
          </div>
        </div>
        <div class="body-wrapper">
          <div class="body">
            <div class="grids">
              <div class="grid md-20 sm-30">
                <FormGroup
                  label="คำนำหน้า" type="plain" :value="datasetUser.detail.prefix" 
                />
              </div>
              <div class="grid md-40 sm-35">
                <FormGroup
                  label="ชื่อ" type="plain" :value="datasetUser.detail.firstname" 
                />
              </div>
              <div class="grid md-40 sm-35">
                <FormGroup
                  label="นามสกุล" type="plain" :value="datasetUser.detail.lastname" 
                />
              </div>
              <div class="grid sm-50">
                <FormGroup
                  label="เบอร์โทรศัพท์" type="plain" :value="datasetUser.detail.phone" 
                />
              </div>
              <div class="grid sm-50">
                <FormGroup
                  label="รูปโปรไฟล์" type="plain" :value="datasetUser.avatar" 
                />
              </div>
              <div class="grid sm-50">
                <FormGroup
                  label="สถานะ" type="plain" :value="datasetUser.status? 'เปิดใช้งาน': 'ปิดใช้งาน'" 
                />
              </div>
            </div>
          </div>
          <div class="border-top bcolor-fgray"></div>
          <div class="body">
            <div class="grids">
              <div class="grid sm-50">
                <FormGroup
                  label="ชื่อผู้ใช้" type="plain" :value="datasetUser.username" 
                />
              </div>
              <div class="grid sm-50">
                <FormGroup
                  label="อีเมล" type="plain" :value="datasetUser.email" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Popup Account Edit -->
  <div class="popup-container" :class="{ 'active': isActivePopupAccountEdit }">
    <div class="wrapper">
      <div class="close-filter" @click="isActivePopupAccountEdit = !isActivePopupAccountEdit"></div>
      <form action="/admin/forwarder-view" method="GET" class="w-full">
        <div class="popup-box">
          <div class="header">
            <div class="btns mt-0">
              <a href="javascript:" class="btn btn-close" @click="isActivePopupAccountEdit = !isActivePopupAccountEdit">
                <img class="icon-prepend xs" src="/assets/img/icon/close.svg" alt="Image Icon" />
                ปิดหน้าต่าง
              </a>
            </div>
            <div class="header-wrapper">
              <div class="text-container">
                <h6 class="h3">Edit Forwarder Account</h6>
              </div>
              <div class="btns hide-mobile">
                <Button 
                  type="submit" text="แก้ไข" classer="btn-color-01 mr-2" 
                  :prepend="true" icon="check-white.svg" 
                />
                <Button 
                  text="ปิด" href="javascript:" classer="btn-color-08" 
                  @click="isActivePopupAccountEdit = !isActivePopupAccountEdit"
                />
              </div>
              <div class="btns show-mobile">
                <Button 
                  type="submit" text="แก้ไข" classer="btn-color-01 btn-sm mr-1" 
                />
                <Button 
                  text="ปิด" href="javascript:" classer="btn-color-08 btn-sm" 
                  @click="isActivePopupAccountEdit = !isActivePopupAccountEdit"
                />
              </div>
            </div>
          </div>
          <div class="body-wrapper">
            <div class="body">
              <div class="grids">
                <div class="grid md-20 sm-30">
                  <FormGroup
                    label="คำนำหน้า *" type="select" :required="true" 
                    :value="datasetUser.detail.prefix" 
                    :options="[ 
                      { value: 'นาย', text: 'นาย' }, 
                      { value: 'นาง', text: 'นาง' }, 
                      { value: 'นางสาว', text: 'นางสาว' }
                    ]"
                  />
                </div>
                <div class="grid md-40 sm-35">
                  <FormGroup
                    label="ชื่อ *" type="text" :required="true" 
                    :value="datasetUser.detail.firstname" 
                  />
                </div>
                <div class="grid md-40 sm-35">
                  <FormGroup
                    label="นามสกุล *" type="text" :required="true" 
                    :value="datasetUser.detail.lastname" 
                  />
                </div>
                <div class="grid sm-50">
                  <FormGroup
                    label="เบอร์โทรศัพท์ *" type="text" :required="true" 
                    :value="datasetUser.detail.phone" 
                  />
                </div>
                <div class="grid sm-50">
                  <FormGroup
                    label="รูปโปรไฟล์" type="file-image" name="avatar" 
                    :value="datasetUser.avatar" 
                  />
                </div>
                <div class="grid sm-50">
                  <FormGroup
                    label="สถานะ *" type="select" 
                    :value="datasetUser.status" 
                    :options="[ 
                      { value: 1, text: 'เปิดใช้งาน' }, 
                      { value: 0, text: 'ปิดใช้งาน' }
                    ]"
                  />
                </div>
              </div>
            </div>
            <div class="border-top bcolor-fgray"></div>
            <div class="body">
              <div class="grids">
                <div class="grid sm-50">
                  <FormGroup
                    label="ชื่อผู้ใช้ *" type="text" :required="true" 
                    :value="datasetUser.username" 
                  />
                </div>
                <div class="grid sm-50">
                  <FormGroup
                    label="อีเมล *" type="email" :required="true" 
                    :value="datasetUser.email" 
                  />
                </div>
                <div class="grid sm-50">
                  <FormGroup
                    label="รหัสผ่าน" type="password" 
                  />
                </div>
                <div class="grid sm-50">
                  <FormGroup
                    label="ยืนยันรหัสผ่าน" type="password" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  <!-- Popup Account Delete -->
  <div class="popup-container" :class="{ 'active': isActivePopupAccountDelete }">
    <div class="wrapper">
      <div class="close-filter" @click="isActivePopupAccountDelete = !isActivePopupAccountDelete"></div>
      <form action="/admin/forwarder-view" method="GET" class="w-full">
        <div class="popup-box">
          <div class="header">
            <div class="btns mt-0">
              <a href="javascript:" class="btn btn-close" @click="isActivePopupAccountDelete = !isActivePopupAccountDelete">
                <img class="icon-prepend xs" src="/assets/img/icon/close.svg" alt="Image Icon" />
                ปิดหน้าต่าง
              </a>
            </div>
            <div class="header-wrapper">
              <div class="text-container">
                <h6 class="h3">ยืนยันการลบ</h6>
              </div>
              <div class="btns hide-mobile">
                <Button 
                  type="submit" text="ลบ" classer="btn-color-06 mr-2" 
                  :prepend="true" icon="close-white.svg" 
                />
                <Button 
                  text="ปิด" href="javascript:" classer="btn-color-08" 
                  @click="isActivePopupAccountDelete = !isActivePopupAccountDelete"
                />
              </div>
              <div class="btns show-mobile">
                <Button 
                  type="submit" text="ลบ" classer="btn-color-06 btn-sm mr-1" 
                />
                <Button 
                  text="ปิด" href="javascript:" classer="btn-color-08 btn-sm" 
                  @click="isActivePopupAccountDelete = !isActivePopupAccountDelete"
                />
              </div>
            </div>
          </div>
          <div class="body pt-4 pb-5">
            <p class="color-gray">หมายเหตุ</p>
            <p class="mt-2">
              ยืนยันการลบ โดยข้อมูลจะถูกลบออกจากระบบทันที และไม่สามารถกู้คืนมาได้
            </p>
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
import {mapGetters, mapActions, mapState} from "vuex";

export default {
  name: 'AdminForwarderViewPage',
  components: {
    Topnav,
    Sidenav,
    DataTable
  },
  data() {
    return {
      sidenavActiveIndex: 2,
      user: {
        id: 4,
        role: 'Admin', /* Freight Forwarder, Driver, TG Admin, Admin */
        username: 'Admin',
        email: 'admin@gmail.com',
        avatar: '/assets/img/misc/profile.jpg',
        detail: {
          prefix: 'นาย',
          firstname: 'สมศักดิ์',
          lastname: 'จริงใจ',
          phone: '0811123456'
        }
      },

      datasetCompany: {
        id: null,
        name: 'บริษัท เอบีดีริเวรี่ จำกัด',
        address: '999 หมู่ 1 ตำบลหนองปรือ อำเภอบางพลี',
        province: 'สมุทรปราการ',
        zipcode: '10540',
        taxId: '500218893025',
        status: 1
      },

      rows1: [],
      isActivePopupAccountAdd: false,
      isActivePopupAccountView: false,
      isActivePopupAccountEdit: false,
      isActivePopupAccountDelete: false,
      datasetUser: {
        id: 1,
        role: 'Freight Forwarder', /* Freight Forwarder, Driver, TG Admin, Admin */
        username: 'Forwarder User',
        email: 'forwarder@gmail.com',
        avatar: '/assets/img/misc/profile.jpg',
        detail: {
          prefix: 'นาย',
          firstname: 'สมศักดิ์',
          lastname: 'จริงใจ',
          phone: '0811123456'
        },
        status: 1
      },

      rows2: []
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'auth/getUser',
      getLoadingStatus: 'admin/getLoadingStatus',
      getForwardersDetail: 'admin/getForwardersDetail',
      getforwardersFF: 'admin/getforwardersFF',
      getforwardersDriver: 'admin/getforwardersDriver'
    })
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    document.getElementById('color_style').href = '/assets/css/color-admin.css';
    for(var i=0; i<3; i++){
      this.rows1.push({
        avatar: { type: 'avatar', text: '/assets/img/misc/profile.jpg' },
        username: { text: 'Forwarder000'+i },
        firstname: { text: 'นาย จริงใจ' },
        lastname: { text: 'ใจมั่นคง' },
        email: { text: 'forwarder@gmail.com' },
        phone: { text: '0977885442' },
        status: { type: 'tag', value: 1, text: 'เปิดใช้งาน', classer: 'ss-tag-success' },
        options: {
          type: 'options',
          view: { type: 'emit', id: i },
          edit: { type: 'emit', id: i },
          delete: { type: 'emit', id: i }
        }
      });
    }
    for(var i=0; i<8; i++){
      this.rows2.push({
        avatar: { type: 'avatar', text: '/assets/img/misc/profile.jpg' },
        username: { text: 'Driver000'+i },
        firstname: { text: 'นาย จริงใจ' },
        lastname: { text: 'ใจมั่นคง' },
        email: { text: 'driver@gmail.com' },
        phone: { text: '0977885442' },
        status: { type: 'tag', value: 1, text: 'เปิดใช้งาน', classer: 'ss-tag-success' },
        options: {
          type: 'options',
          view: { type: 'emit', id: i },
          edit: { type: 'emit', id: i },
          delete: { type: 'emit', id: i }
        }
      });
    }
    console.log('this.$route.params.tax_id: ', this.$route.params.tax_id)
    this.freightForwardersDetail(this.$route.params.tax_id)
  },
  methods: {
    ...mapActions({
      freightForwardersDetail: 'admin/freightForwardersDetail'
    }),
    openAccountView(id) {
      this.isActivePopupAccountView = !this.isActivePopupAccountView;
    },
    openAccountEdit(id) {
      this.isActivePopupAccountEdit = !this.isActivePopupAccountEdit;
    },
    openAccountDelete(id) {
      this.isActivePopupAccountDelete = !this.isActivePopupAccountDelete;
    },
  }
}
</script>
