<template>
  <div class="tabs tabs-01" :class="classer">
    <a 
      v-for="(tab, index) in tabs" :key="index" href="javascript:"
      class="tab" :class="{ 'active': index == activeIndex }" 
      @click="activeIndex = index; onClick(index);"
    >
      {{tab}}
    </a>
  </div>
</template>

<script>
export default {
  name: 'Tabs01',
  props: {
    tabs: { type: Array, default: [] },
    activeIndex: { type: Number, default: 0 },
    classer: { type: String, default: '' }
  },
  methods: {
    onClick(index) {
      return this.$emit('clicked', index);
    }
  },
  emits: [ 'clicked' ]
}
</script>
