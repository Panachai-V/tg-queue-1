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
import {ConditionSelectViewJob} from '../models/select-company';

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
  created() {
    // เมื่อ click เลือก tab ของ job requests ใน freight-forwarder จะทำให้ข้อมูลทุกอย่างรีเป็นหน้า 1 ใน tab นั้นๆ
    if ( this.getUser.role == 'freight-forwarder'){
      let temp_condition = new ConditionSelectViewJob('1', '10', 'awbNumber', 'ascending', (this.activeIndex).toString())
      this.fetchJobRequest(temp_condition);
    }
  },
  methods: {
    onClick(index) {

      // เมื่อ click เลือก tab ของ job requests ใน freight-forwarder จะทำให้ข้อมูลทุกอย่างรีเป็นหน้า 1 ใน tab นั้นๆ
      if ( this.getUser.role == 'freight-forwarder'){
        let temp_condition = new ConditionSelectViewJob('1', '10', 'awbNumber', 'ascending', (this.activeIndex).toString())
        this.fetchJobRequest(temp_condition);
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
