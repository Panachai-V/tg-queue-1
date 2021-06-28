<template>
  <div class="form-group" :class="classer">
    <label class="p color-gray" :class="{ 'focused': isFocused }">
      {{label}} <div v-if="errorText" class="error">{{errorText}}</div>
    </label>
    <div class="fit-wrapper">
      <select 
        :name="name0" v-model="value0" 
        @input="(event)=>$emit('input0', event.target.value)" 
        @focusin="isFocused = true" @focusout="isFocused = false" 
        :required="required? true: false"
      >
        <option value="" selected disabled>ชั่วโมง</option>
        <option 
          v-for="h in [
            '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', 
            '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
          ]" :key="h" :value="h" :selected="h == value0" 
        >
          {{h}}
        </option>
      </select>
      <span class="mr-1"></span>
      <select 
        :name="name1" v-model="value1" 
        @input="(event)=>$emit('input1', event.target.value)" 
        @focusin="isFocused = true" @focusout="isFocused = false" 
        :required="required? true: false" 
      >
        <option value="" selected disabled>นาที</option>
        <option 
          v-for="m in [
            '00', '05', '10', '15', '20', '25', '30',
            '35', '40', '45', '50', '55'
          ]" :key="m" :value="m" :selected="m == value1" 
        >
          {{m}}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormGroupAge',
  props: {
    classer: { type: String, default: '' },
    errorText: { type: String, default: '' },
    label: { type: String, default: 'From Group' },

    name0: { type: String, default: '' },
    value0: { type: [String, Number, Date], default: '' },
    
    name1: { type: String, default: '' },
    value1: { type: [String, Number, Date], default: '' },
    
    required: { type: Boolean, default: false },
    isFocused: { type: Boolean, default: false }
  },
  emits: [ 'input0', 'input1', 'input2' ]
}
</script>
