<template>
  <a class="ss-card ss-card-01" :href="href">
    <div class="pos-relative h-full">
      <div class="icon">
        <img :src="'/assets/img/icon/'+icon" alt="Image Icon" />
      </div>
      <div class="text-container">
        <h6 class="title h5 sm color-01">{{text}}</h6>
      </div>
      <img class="arrow" src="/assets/img/icon/arrow-right.svg" alt="Image Icon" />
    </div>
  </a>
</template>

<script>
export default {
  name: 'SpecialCard01',
  props: {
    href: { type: String, default: '#' },
    icon: { type: String, default: 'lab-01.svg' },
    text: { type: String, default: 'ลงทะเบียนส่งตรวจ' },
  }
}
</script>
