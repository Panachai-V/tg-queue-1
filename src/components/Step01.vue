<template>
  <div 
    class="step-01" :class="{ 'completed': activeIndex >= stepNum }"
    :style="{ '--nstep': 5, '--istep': activeIndex }"
  >
    <div class="wrapper">
      <div class="inner-wrapper">

        <div class="step" :class="{ 'current': activeIndex == 1, 'active': activeIndex > 1 }">
          <div class="icon">
            <img :src="'/assets/img/icon/'+icons[0]" alt="Image Icon" />
            <img class="checked" src="/assets/img/icon/check-white.svg" alt="Image Icon" />
          </div>
          <div class="text-container">
            <h6 class="p sm">Step 1</h6>
            <p>รอตารางเวลา</p>
          </div>
        </div>
          
        <div class="step-sep"></div>
        <div class="step" :class="{ 'current': activeIndex == 2, 'active': activeIndex > 2 }">
          <div class="icon">
            <img :src="'/assets/img/icon/'+icons[1]" alt="Image Icon" />
            <img class="checked" src="/assets/img/icon/check-white.svg" alt="Image Icon" />
          </div>
          <div class="text-container">
            <h6 class="p sm">Step 2</h6>
            <p>ดำเนินการรับสินค้า</p>
          </div>
        </div>

        <div class="step-sep"></div>
        <div class="step" :class="{ 'current': activeIndex == 3, 'active': activeIndex > 3 }">
          <div class="icon">
            <img :src="'/assets/img/icon/'+icons[2]" alt="Image Icon" />
            <img class="checked" src="/assets/img/icon/check-white.svg" alt="Image Icon" />
          </div>
          <div class="text-container">
            <h6 class="p sm">Step 3</h6>
            <p>รับสินค้าแล้ว</p>
          </div>
        </div>

        <div class="step-sep"></div>
        <div class="step" :class="{ 'current': activeIndex == 4, 'active': activeIndex > 4 }">
          <div class="icon">
            <img :src="'/assets/img/icon/'+icons[3]" alt="Image Icon" />
            <img class="checked" src="/assets/img/icon/check-white.svg" alt="Image Icon" />
          </div>
          <div class="text-container">
            <h6 class="p sm">Step 4</h6>
            <p>กำลังจัดส่งสินค้า</p>
          </div>
        </div>

        <div class="step-sep"></div>
        <div class="step" :class="{ 'current': activeIndex == 5, 'active': activeIndex > 5 }">
          <div class="icon">
            <img :src="'/assets/img/icon/'+icons[4]" alt="Image Icon" />
            <img class="checked" src="/assets/img/icon/check-white.svg" alt="Image Icon" />
          </div>
          <div class="text-container">
            <h6 class="p sm">Step 5</h6>
            <p>จัดส่งสินค้าแล้ว</p>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step01',
  props: {
    stepNum: { type: Number, default: 5 },
    activeIndex: { type: Number, default: 1 },
    icons: {
      type: Array,
      default: [
        'step-01.svg', 'step-02.svg', 'step-03.svg', 'step-04.svg', 'step-05.svg'
      ]
    }
  }
}
</script>
