<template>
  <div class="popup-options" :class="{ 'active': isOpenedOptions }">
    <div class="filter" @click="()=>$emit('clicked')"></div>
    <div class="dropdown">
      <div v-for="option in options" :key="option.icon" class="submenu">
        <a :href="option.href">
          <div class="icon">
            <img :src="'/assets/img/icon/'+option.icon" alt="Image Icon" />
          </div>
          <div class="text">{{option.text}}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupOptions',
  props: {
    options: { type: Array, default: [] },
    isOpenedOptions: { type: Boolean, default: false }
  },
  emits: [ 'clicked' ]
}
</script>
