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
import {mapGetters, mapActions, mapState} from "vuex"

export default {
  name: 'Tabs01',
  props: {
    tabs: { type: Array, default: [] },
    activeIndex: { type: Number, default: 0 },
    classer: { type: String, default: '' }
  },
  computed: {
    ...mapGetters({
      getUser: 'auth/getUser',
    })
  }, 
  methods: {
    onClick(index) {

      // เมื่อ click เลือก tab ของ job requests จะทำให้ข้อมูลทุกอย่างรีเป็นหน้า 1 ใน tab นั้นๆ
      if ( this.getUser.role == 'freight-forwarder'){
        let condition = {
          page: '1',
          limit: '20',
          sort_by: 'status',
          order: 'ascending',
          status: (this.activeIndex + 1).toString()
        }
        this.fetchJobRequest(condition);
      }

      return this.$emit('clicked', index);
    },
    ...mapActions({
      fetchJobRequest: 'freight_forwarder/fetchJobRequest',
    })
  },
  emits: [ 'clicked' ]
}
</script>
