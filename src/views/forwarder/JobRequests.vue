<template>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" />
  
  <section class="section-full">
    <div class="container">
      <div class="tab-container">
        <div class="section-header pb-0" data-aos="fade-up" data-aos-delay="0">
          <div class="btns mt-0">
            <a href="/forwarder/dashboard" class="btn color-gray h-color-01">
              <img class="icon-prepend xs" src="/assets/img/icon/chev-left.svg" alt="Image Icon" />
              ย้อนกลับ
            </a>
          </div>
          <div class="header-wrapper">
            <div class="text-container">
              <h6 class="h3">Job Requests</h6>
            </div>
            <div class="btns hide-mobile">
              <Button 
                text="สร้าง" href="/forwarder/job-request-add" 
                classer="btn-color-01" :prepend="true" icon="plus-white.svg" 
              />
            </div>
            <div class="btns show-mobile">
              <Button 
                text="สร้าง" href="/forwarder/job-request-add" 
                classer="btn-color-01 btn-sm" 
              />
            </div>
          </div>
          <Tabs01 
            :activeIndex="tabActiveIndex" 
            @clicked="tabActiveIndex = $event" 
            :tabs="[ 
              'รอการ Matching', 'รอการชำระเงิน', 'รอคิวการรับ',
              'รอยืนยันคิว', 'กำลังดำเนินการ', 'ดำเนินการเสร็จสิ้น'
            ]" 
          />
        </div>
        <div v-if="getLoadingStatus == false" class="tab-contents" data-aos="fade-up" data-aos-delay="150">

          <div class="tab-content" :class="{ 'active': tabActiveIndex == 0 }">
            <DataTable
              :formJobRequest="true"
              :filterStatus="getFilterStatus"
              :pp="getFilterStatus.limit"
              :page="getFilterStatus.page"
              :rows="getJobRequest0" 
              :columns="[
                { key: 'awbNumber', text: 'Airway Bill' },
                { key: 'hwbSerialNumber', text: 'House Airway Bill' },
                { key: 'flightNumber', text: 'รหัสเที่ยวบิน' },
                { key: 'jobNumber', text: 'เลขที่งาน' },
                { key: 'customsEntryNumber', text: 'เลขที่ใบขนสินค้า' },
                { key: 'customsEntryNumberDate', text: 'วันที่ได้รับเลขที่ใบสินค้า' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 
                'awbNumber', 'hwbSerialNumber', 'flightNumber', 'jobNumber',
                'customsEntryNumber', 'customsEntryNumberDate'
              ]" 
              :orders="[
                { key: 'awbNumber-desc', text: 'Airway Bill (ใหม่สุด)' },
                { key: 'awbNumber-asc', text: 'Airway Bill (เก่าสุด)' },
                { key: 'hwbSerialNumber-desc', text: 'House Airway Bill (ใหม่สุด)' },
                { key: 'hwbSerialNumber-asc', text: 'House Airway Bill (เก่าสุด)' },
                { key: 'customsEntryNumberDate-desc', text: 'วันที่ได้รับเลขที่ใบสินค้า (ใหม่สุด)' },
                { key: 'customsEntryNumberDate-asc', text: 'วันที่ได้รับเลขที่ใบสินค้า (เก่าสุด)' }
              ]" 
            />
          </div>

          <div class="tab-content" :class="{ 'active': tabActiveIndex == 1 }">
            <DataTable
              :formJobRequest="true"
              :filterStatus="getFilterStatus"
              :rows="getJobRequest1" 
              :columns="[
                { key: 'awbNumber', text: 'Airway Bill' },
                { key: 'hwbSerialNumber', text: 'House Airway Bill' },
                { key: 'flightNumber', text: 'รหัสเที่ยวบิน' },
                { key: 'jobNumber', text: 'เลขที่งาน' },
                { key: 'customsEntryNumber', text: 'เลขที่ใบขนสินค้า' },
                { key: 'customsEntryNumberDate', text: 'วันที่ได้รับเลขที่ใบสินค้า' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 
                'awbNumber', 'hwbSerialNumber', 'flightNumber', 'jobNumber',
                'customsEntryNumber', 'customsEntryNumberDate'
              ]" 
              :orders="[
                { key: 'awbNumber-desc', text: 'Airway Bill (ใหม่สุด)' },
                { key: 'awbNumber-asc', text: 'Airway Bill (เก่าสุด)' },
                { key: 'hwbSerialNumber-desc', text: 'House Airway Bill (ใหม่สุด)' },
                { key: 'hwbSerialNumber-asc', text: 'House Airway Bill (เก่าสุด)' },
                { key: 'customsEntryNumberDate-desc', text: 'วันที่ได้รับเลขที่ใบสินค้า (ใหม่สุด)' },
                { key: 'customsEntryNumberDate-asc', text: 'วันที่ได้รับเลขที่ใบสินค้า (เก่าสุด)' }
              ]" 
            />
          </div>

          <div class="tab-content" :class="{ 'active': tabActiveIndex == 2 }">
            <DataTable 
              :formJobRequest="true"
              :filterStatus="getFilterStatus"
              :rows="getJobRequest2" 
              :columns="[
                { key: 'awbNumber', text: 'Airway Bill' },
                { key: 'hwbSerialNumber', text: 'House Airway Bill' },
                { key: 'flightNumber', text: 'รหัสเที่ยวบิน' },
                { key: 'date', text: 'วันที่เที่ยวบิน' },
                { key: 'dockNumber', text: 'หมายเลขช่องจอด' },
                { key: 'pickupTime', text: 'เวลารับสินค้า' },
                { key: 'truckNumber', text: 'ทะเบียนรถ' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 
                'awbNumber', 'hwbSerialNumber', 'flightNumber', 'date',
                'dockNumber', 'pickupTime'
              ]" 
              :orders="[
                { key: 'date-desc', text: 'วันที่เที่ยวบิน (ใหม่สุด)' },
                { key: 'date-asc', text: 'วันที่เที่ยวบิน (เก่าสุด)' },
                { key: 'dockNumber-desc', text: 'หมายเลขช่องจอด (ใหม่สุด)' },
                { key: 'dockNumber-asc', text: 'หมายเลขช่องจอด (เก่าสุด)' },
                { key: 'pickupTime-desc', text: 'เวลารับสินค้า (ใหม่สุด)' },
                { key: 'pickupTime-asc', text: 'เวลารับสินค้า (เก่าสุด)' }
              ]" 
            />
          </div>

         <div class="tab-content" :class="{ 'active': tabActiveIndex == 3 }">
            <DataTable 
              :formJobRequest="true"
              :filterStatus="getFilterStatus"
              :rows="getJobRequest3" 
              :columns="[
                { key: 'awbNumber', text: 'Airway Bill' },
                { key: 'hwbSerialNumber', text: 'House Airway Bill' },
                { key: 'flightNumber', text: 'รหัสเที่ยวบิน' },
                { key: 'date', text: 'วันที่เที่ยวบิน' },
                { key: 'dockNumber', text: 'หมายเลขช่องจอด' },
                { key: 'pickupTime', text: 'เวลารับสินค้า' },
                { key: 'truckNumber', text: 'ทะเบียนรถ' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 
                'awbNumber', 'hwbSerialNumber', 'flightNumber', 'date',
                'dockNumber', 'pickupTime'
              ]" 
              :orders="[
                { key: 'date-desc', text: 'วันที่เที่ยวบิน (ใหม่สุด)' },
                { key: 'date-asc', text: 'วันที่เที่ยวบิน (เก่าสุด)' },
                { key: 'dockNumber-desc', text: 'หมายเลขช่องจอด (ใหม่สุด)' },
                { key: 'dockNumber-asc', text: 'หมายเลขช่องจอด (เก่าสุด)' },
                { key: 'pickupTime-desc', text: 'เวลารับสินค้า (ใหม่สุด)' },
                { key: 'pickupTime-asc', text: 'เวลารับสินค้า (เก่าสุด)' }
              ]" 
            />
          </div>

          <div class="tab-content" :class="{ 'active': tabActiveIndex == 4 }">
            <DataTable 
              :formJobRequest="true"
              :filterStatus="getFilterStatus"
              :rows="getJobRequest4" 
              :columns="[
                { key: 'awbNumber', text: 'Airway Bill' },
                { key: 'hwbSerialNumber', text: 'House Airway Bill' },
                { key: 'flightNumber', text: 'รหัสเที่ยวบิน' },
                { key: 'date', text: 'วันที่เที่ยวบิน' },
                { key: 'dockNumber', text: 'หมายเลขช่องจอด' },
                { key: 'pickupTime', text: 'เวลารับสินค้า' },
                { key: 'truckNumber', text: 'ทะเบียนรถ' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 
                'awbNumber', 'hwbSerialNumber', 'flightNumber', 'date',
                'dockNumber', 'pickupTime'
              ]" 
              :orders="[
                { key: 'date-desc', text: 'วันที่เที่ยวบิน (ใหม่สุด)' },
                { key: 'date-asc', text: 'วันที่เที่ยวบิน (เก่าสุด)' },
                { key: 'dockNumber-desc', text: 'หมายเลขช่องจอด (ใหม่สุด)' },
                { key: 'dockNumber-asc', text: 'หมายเลขช่องจอด (เก่าสุด)' },
                { key: 'pickupTime-desc', text: 'เวลารับสินค้า (ใหม่สุด)' },
                { key: 'pickupTime-asc', text: 'เวลารับสินค้า (เก่าสุด)' }
              ]" 
            />
          </div>

          <div class="tab-content" :class="{ 'active': tabActiveIndex == 5 }">
            <DataTable 
              :formJobRequest="true"
              :filterStatus="getFilterStatus"
              :rows="getJobRequest5" 
              :columns="[
                { key: 'awbNumber', text: 'Airway Bill' },
                { key: 'hwbSerialNumber', text: 'House Airway Bill' },
                { key: 'flightNumber', text: 'รหัสเที่ยวบิน' },
                { key: 'date', text: 'วันที่เที่ยวบิน' },
                { key: 'dockNumber', text: 'หมายเลขช่องจอด' },
                { key: 'pickupTime', text: 'เวลารับสินค้า' },
                { key: 'truckNumber', text: 'ทะเบียนรถ' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 
                'awbNumber', 'hwbSerialNumber', 'flightNumber', 'date',
                'dockNumber', 'pickupTime'
              ]" 
              :orders="[
                { key: 'date-desc', text: 'วันที่เที่ยวบิน (ใหม่สุด)' },
                { key: 'date-asc', text: 'วันที่เที่ยวบิน (เก่าสุด)' },
                { key: 'dockNumber-desc', text: 'หมายเลขช่องจอด (ใหม่สุด)' },
                { key: 'dockNumber-asc', text: 'หมายเลขช่องจอด (เก่าสุด)' },
                { key: 'pickupTime-desc', text: 'เวลารับสินค้า (ใหม่สุด)' },
                { key: 'pickupTime-asc', text: 'เวลารับสินค้า (เก่าสุด)' }
              ]" 
            />
          </div>
          
          <!--
          <div class="tab-content" :class="{ 'active': tabActiveIndex == 1 }">
            <DataTable 
              :rows="rows2" 
              :columns="[
                { key: 'awbNumber', text: 'Airway Bill' },
                { key: 'flightNumber', text: 'รหัสเที่ยวบิน' },
                { key: 'numberOfPieces', text: 'จำนวนสินค้า' },
                { key: 'date', text: 'วันที่เที่ยวบิน' },
                { key: 'dockNumber', text: 'หมายเลขช่องจอด' },
                { key: 'pickupTime', text: 'เวลารับสินค้า' },
                { key: 'truckNumber', text: 'ทะเบียนรถ' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 
                'awbNumber', 'hwbSerialNumber', 'flightNumber', 'date',
                'dockNumber', 'pickupTime'
              ]" 
              :orders="[
                { key: 'date-desc', text: 'วันที่เที่ยวบิน (ใหม่สุด)' },
                { key: 'date-asc', text: 'วันที่เที่ยวบิน (เก่าสุด)' },
                { key: 'dockNumber-desc', text: 'หมายเลขช่องจอด (ใหม่สุด)' },
                { key: 'dockNumber-asc', text: 'หมายเลขช่องจอด (เก่าสุด)' },
                { key: 'pickupTime-desc', text: 'เวลารับสินค้า (ใหม่สุด)' },
                { key: 'pickupTime-asc', text: 'เวลารับสินค้า (เก่าสุด)' }
              ]" 
            />
          </div>
          
          <div class="tab-content" :class="{ 'active': tabActiveIndex == 2 }">
            <DataTable 
              :rows="rows3" 
              :columns="[
                { key: 'awbNumber', text: 'Airway Bill' },
                { key: 'flightNumber', text: 'รหัสเที่ยวบิน' },
                { key: 'numberOfPieces', text: 'จำนวนสินค้า' },
                { key: 'date', text: 'วันที่เที่ยวบิน' },
                { key: 'dockNumber', text: 'หมายเลขช่องจอด' },
                { key: 'pickupTime', text: 'เวลารับสินค้า' },
                { key: 'truckNumber', text: 'ทะเบียนรถ' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 
                'awbNumber', 'hwbSerialNumber', 'flightNumber', 'date',
                'dockNumber', 'pickupTime'
              ]" 
              :orders="[
                { key: 'date-desc', text: 'วันที่เที่ยวบิน (ใหม่สุด)' },
                { key: 'date-asc', text: 'วันที่เที่ยวบิน (เก่าสุด)' },
                { key: 'dockNumber-desc', text: 'หมายเลขช่องจอด (ใหม่สุด)' },
                { key: 'dockNumber-asc', text: 'หมายเลขช่องจอด (เก่าสุด)' },
                { key: 'pickupTime-desc', text: 'เวลารับสินค้า (ใหม่สุด)' },
                { key: 'pickupTime-asc', text: 'เวลารับสินค้า (เก่าสุด)' }
              ]" 
            />
          </div>
          
          <div class="tab-content" :class="{ 'active': tabActiveIndex == 3 }">
            <DataTable 
              :rows="rows4" 
              :columns="[
                { key: 'awbNumber', text: 'Airway Bill' },
                { key: 'flightNumber', text: 'รหัสเที่ยวบิน' },
                { key: 'numberOfPieces', text: 'จำนวนสินค้า' },
                { key: 'date', text: 'วันที่เที่ยวบิน' },
                { key: 'dockNumber', text: 'หมายเลขช่องจอด' },
                { key: 'pickupTime', text: 'เวลารับสินค้า' },
                { key: 'truckNumber', text: 'ทะเบียนรถ' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 
                'awbNumber', 'hwbSerialNumber', 'flightNumber', 'date',
                'dockNumber', 'pickupTime'
              ]" 
              :orders="[
                { key: 'date-desc', text: 'วันที่เที่ยวบิน (ใหม่สุด)' },
                { key: 'date-asc', text: 'วันที่เที่ยวบิน (เก่าสุด)' },
                { key: 'dockNumber-desc', text: 'หมายเลขช่องจอด (ใหม่สุด)' },
                { key: 'dockNumber-asc', text: 'หมายเลขช่องจอด (เก่าสุด)' },
                { key: 'pickupTime-desc', text: 'เวลารับสินค้า (ใหม่สุด)' },
                { key: 'pickupTime-asc', text: 'เวลารับสินค้า (เก่าสุด)' }
              ]" 
            />
          </div>
          
          <div class="tab-content" :class="{ 'active': tabActiveIndex == 4 }">
            <DataTable 
              :rows="rows5" 
              :columns="[
                { key: 'awbNumber', text: 'Airway Bill' },
                { key: 'flightNumber', text: 'รหัสเที่ยวบิน' },
                { key: 'numberOfPieces', text: 'จำนวนสินค้า' },
                { key: 'date', text: 'วันที่เที่ยวบิน' },
                { key: 'dockNumber', text: 'หมายเลขช่องจอด' },
                { key: 'pickupTime', text: 'เวลารับสินค้า' },
                { key: 'truckNumber', text: 'ทะเบียนรถ' },
                { key: 'status', text: 'สถานะ', classer: 'status' },
                { key: 'options', classer: 'options' }
              ]" 
              :search="[ 
                'awbNumber', 'hwbSerialNumber', 'flightNumber', 'date',
                'dockNumber', 'pickupTime'
              ]" 
              :orders="[
                { key: 'date-desc', text: 'วันที่เที่ยวบิน (ใหม่สุด)' },
                { key: 'date-asc', text: 'วันที่เที่ยวบิน (เก่าสุด)' },
                { key: 'dockNumber-desc', text: 'หมายเลขช่องจอด (ใหม่สุด)' },
                { key: 'dockNumber-asc', text: 'หมายเลขช่องจอด (เก่าสุด)' },
                { key: 'pickupTime-desc', text: 'เวลารับสินค้า (ใหม่สุด)' },
                { key: 'pickupTime-asc', text: 'เวลารับสินค้า (เก่าสุด)' }
              ]" 
            />
          </div>
          -->
        </div>
      </div>
      {{getFilterStatus}}
    </div>
  </section>
  <Topnav :user="user" :activeIndex="topnavActiveIndex" :isBottom="true" />
</template>

<script>
import moment from 'moment';
import Topnav from '../../components/Topnav';
import Tabs01 from '../../components/Tabs01';
import DataTable from '../../components/DataTable';
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ForwarderJobRequestsPage',
  components: {
    Topnav,
    Tabs01,
    DataTable
  },
  computed: {

  },
  data() {
    return {
      topnavActiveIndex: 1,
      user: {
        id: 1,
        role: 'Freight Forwarder', /* Freight Forwarder, Driver, TG Admin, Admin */
        username: 'General User',
        email: 'user@gmail.com',
        avatar: '/assets/img/misc/profile.jpg',
        detail: {
          prefix: 'นาย',
          firstname: 'สมศักดิ์',
          lastname: 'จริงใจ',
          phone: '0811123456'
        },
        company: {
          name: 'บริษัท เอบีดีริเวรี่ จำกัด',
          address: '999 หมู่ 1 ตำบลหนองปรือ อำเภอบางพลี',
          province: 'สมุทรปราการ',
          zipcode: '10540',
          taxId: '500218893025'
        }
      },

      tabActiveIndex: this.$route.params.tab? Number(this.$route.params.tab)-1: 0,
      rows1: [],
      rows2: [],
      rows3: [],
      rows4: [],
      rows5: []
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });

    for(var i=0; i<4; i++){
      this.rows1.push({
        awbNumber: { 
          type: 'link', text: '131-56591080',
          href: '/forwarder/job-request-view'
        },
        hwbSerialNumber: { text: 'MLC10131957' },
        flightNumber: { text: 'JL0707' },
        jobNumber: { text: 'A0020640302798' },
        customsEntryNumber: { text: 'A0020640302798' },
        customsEntryNumberDate: { text: this.formatDate(new Date()) },
        status: { type: 'tag', value: 1, text: 'รอการ Matching', classer: 'ss-tag-danger' },
        options: {
          type: 'options',
          view: { type: 'link', href: '/forwarder/job-request-view/1' }
        }
      });

        this.rows2.push({
        awbNumber: { 
          type: 'link', text: '131-56591080',
          href: '/forwarder/job-request-view/2'
        },
        flightNumber: { text: 'JL0707' },
        numberOfPieces: { text: this.formatNumber(2400, 0) },
        date: { text: this.formatDate(new Date(), 'DD MMM YYYY') },
        dockNumber: { text: '-' },
        pickupTime: { text: '-' },
        truckNumber: { text: '-' },
        status: { type: 'tag', value: 2, text: 'รอคิวการรับ', classer: 'ss-tag-info' },
        options: {
          type: 'options',
          view: { type: 'link', href: '/forwarder/job-request-view/2' }
        }
      });

        this.rows3.push({
        awbNumber: { 
          type: 'link', text: '131-56591080',
          href: '/forwarder/job-request-view/3'
        },
        flightNumber: { text: 'JL0707' },
        numberOfPieces: { text: this.formatNumber(2400, 0) },
        date: { text: this.formatDate(new Date(), 'DD MMM YYYY') },
        dockNumber: { text: 'G14' },
        pickupTime: { text: '09.45 น.' },
        truckNumber: { text: '-' },
        status: { type: 'tag', value: 3, text: 'รอยืนยันคิว', classer: 'ss-tag-danger' },
        options: {
          type: 'options',
          view: { type: 'link', href: '/forwarder/job-request-view/3' }
        }
      });

        this.rows4.push({
        awbNumber: { 
          type: 'link', text: '131-56591080',
          href: '/forwarder/job-request-view/4'
        },
        flightNumber: { text: 'JL0707' },
        numberOfPieces: { text: this.formatNumber(2400, 0) },
        date: { text: this.formatDate(new Date(), 'DD MMM YYYY') },
        dockNumber: { text: 'G14' },
        pickupTime: { text: '09.45 น.' },
        truckNumber: { text: '5กศ5859' },
        status: i < 2 ?
          { type: 'tag', value: 3, text: 'รอการชำระเงิน', classer: 'ss-tag-danger' } :
          { type: 'tag', value: 3, text: 'กำลังดำเนินการ', classer: 'ss-tag-warning' },
        options: {
          type: 'options',
          view: { type: 'link', href: '/forwarder/job-request-view/4' }
        }
      });

        this.rows5.push({
        awbNumber: { 
          type: 'link', text: '131-56591080',
          href: '/forwarder/job-request-view/5'
        },
        flightNumber: { text: 'JL0707' },
        numberOfPieces: { text: this.formatNumber(2400, 0) },
        date: { text: this.formatDate(new Date(), 'DD MMM YYYY') },
        dockNumber: { text: 'G14' },
        pickupTime: { text: '09.45 น.' },
        truckNumber: { text: '5กศ5859' },
        status: i < 2 ? 
          { 
            type: 'tag', value: 4, text: 'ดำเนินการเสร็จสิ้น', classer: 'ss-tag-success',
            append: true, icon: '/assets/img/icon/comment-black.svg'
          } :
          { type: 'tag', value: 4, text: 'ดำเนินการเสร็จสิ้น', classer: 'ss-tag-success' },
        options: {
          type: 'options',
          view: { type: 'link', href: '/forwarder/job-request-view/5' }
        }
      });
    }

    console.log(this.rows1[0])
  },
  methods: {
    
    formatNumber(value, digits=2) {
      let val = (value/1).toFixed(digits);
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    formatDate(value, format='YYYYMMDD') {
      return moment(String(value)).format(format);
    },
    ...mapActions({
      fetchJobRequest: 'freight_forwarder/fetchJobRequest'
    })
  },
  computed: {
    ...mapGetters({
      getLoadingStatus: 'freight_forwarder/getLoadingStatus',
      getJobRequest0: 'freight_forwarder/getJobRequest0',
      getJobRequest1: 'freight_forwarder/getJobRequest1',
      getJobRequest2: 'freight_forwarder/getJobRequest2',
      getJobRequest3: 'freight_forwarder/getJobRequest3',
      getJobRequest4: 'freight_forwarder/getJobRequest4',
      getJobRequest5: 'freight_forwarder/getJobRequest5',
      getFilterStatus: 'freight_forwarder/getFilterStatus',
    })
  },
  mounted() {

  },
  updated() {
    // console.log('rows1 :', this.rows1)
    // console.log('rows2 :', this.rows2)
    // console.log('rows3 :', this.rows3)
    // console.log('rows4 :', this.rows4)
    // console.log('rows5 :', this.rows5)

    // console.log(this.getJobRequest2)
    // console.log(this.getJobRequest3)
    // console.log(this.getJobRequest4)
    // console.log(this.getJobRequest5)
  }
}
</script>
