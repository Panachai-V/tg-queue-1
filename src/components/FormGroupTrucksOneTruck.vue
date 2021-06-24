<template>
  <div v-if="type == 'plain'" class="form-group">
    <label class="p color-gray">
      ทะเบียนรถ
    </label>
    <div class="plain-text">
      <p v-for="(d, i) in value" :key="i">
        {{d.number}} : {{formatNumber(d.numberOfPieces, 0)}} ชิ้น
      </p>
    </div>
  </div>
  <div v-else class="form-group trucks">
    <div v-for="(d, i) in dataset" :key="i" class="truck">
      <div class="truck-number">
        <label v-if="i==0" class="p color-gray" :class="{ 'focused': isFocused }">
          ทะเบียนรถ
        </label>
        <input
          type="text" placeholder="ทะเบียนรถ" 
          v-model="getSelectDriver.truckNumber" maxlength="8" 
          @focusin="isFocused = true" @focusout="isFocused = false" 
          :required="required? true: false" 
        />
      </div>
      <div class="amount">
        <label v-if="i==0" class="p color-gray" :class="{ 'focused': isFocused }">
          จำนวนที่ขน
        </label>
        <input
          type="number" placeholder="จำนวน" 
          v-model="getSelectDriver.numberOfPieces" min="0" max="9999" step="1" 
          @focusin="isFocused = true" @focusout="isFocused = false" 
          :required="required? true: false" 
        />
      </div>
      <!-- <div class="options">
        <a v-if="i==0" class="icon" href="javascript:" @click="addTruck()">
          <img src="/assets/img/icon/plus.svg" alt="Image Icon" />
        </a>
        <a v-else class="icon" href="javascript:" @click="removeTruck(i)">
          <img src="/assets/img/icon/delete.svg" alt="Image Icon" />
        </a>
      </div> -->
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import {mapGetters, mapActions, mapState} from "vuex"

export default {
  name: 'FormGroupTrucks',
  props: {
    type: { type: String, default: '' },
    required: { type: Boolean, default: false },
    value: { type: Array, default: [{}] },
  },
  data() {
    return {
      dataset: [...this.value],
      isFocused: false
    }
  },
  methods: {
    formatNumber(value, digits=2) {
      let val = (value/1).toFixed(digits);
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    addTruck() {
      this.dataset.push({ number: '', numberOfPieces: '' });
      return this.$emit('input', this.dataset);
    },
    removeTruck(index) {
      this.dataset = this.dataset.filter(function(d, i){
        return i != index;
      });
      return this.$emit('input', this.dataset);
    }
  },
  computed: {
    ...mapGetters({
      getSelectDriver: 'freight_forwarder/getSelectDriver'
    })
  },
  emits: [ 'input' ]
}
</script>
