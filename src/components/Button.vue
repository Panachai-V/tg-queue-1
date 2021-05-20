<style scoped>
.cart{ display:inline-block; line-height: 1.625rem; width:1.5rem; height: 1.5rem; border-radius: 50%; background-color: #BC4A4A; color: #fff; }
</style>
<template>
  <button v-if="type" 
    :type="type" class="btn btn-action" :class="classer"
  >
    <img v-if="prepend" class="icon-prepend" :src="'/assets/img/icon/'+icon" alt="Image Icon" />
    {{text}}
    <img v-if="append" class="icon-append" :src="'/assets/img/icon/'+icon" alt="Image Icon" />
  </button>
  <a v-else 
    class="btn btn-action" :class="classer" :href="href" :target="target"
    @click="()=>$emit('clicked')"
  >
    <img v-if="prepend" class="icon-prepend" :src="'/assets/img/icon/'+icon" alt="Image Icon" />
    {{text}}
    <img v-if="append" class="icon-append" :src="'/assets/img/icon/'+icon" alt="Image Icon" />
    <div v-if="cart" class="cart ml-1">
      {{ cart }}
    </div>
  </a>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: { type: String, default: 'Button' },
    type: { type: String, default: '' },
    classer: { type: String, default: '' },
    href: { type: String, default: 'javascript:' },
    target: { type: String, default: '' },
    prepend: { type: Boolean, default: false },
    append: { type: Boolean, default: false },
    icon: { type: String, default: '' },
    cart: { type: Number, default: null }
  },
  emits: [ 'clicked' ]
}
</script>
