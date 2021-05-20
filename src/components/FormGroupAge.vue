<template>
  <div class="form-group" :class="classer">
    <label class="p color-gray" :class="{ 'focused': isFocused }">
      {{label}} <div v-if="errorText" class="error">{{errorText}}</div>
    </label>
    <div class="fit-wrapper">
      <input 
        type="number" :name="name0" 
        min="0" max="100" step="1" placeholder="00" 
        v-model="value0" 
        @input="(event)=>$emit('input0', event.target.value)" 
        @focusin="isFocused = true" @focusout="isFocused = false" 
        :required="required" 
      />
      <span class="p color-gray">ปี</span>
      <input 
        type="number" :name="name1" 
        min="0" max="12" step="1" placeholder="00" 
        v-model="value1" 
        @input="(event)=>$emit('input1', event.target.value)" 
        @focusin="isFocused = true" @focusout="isFocused = false" 
        :required="required" 
      />
      <span class="p color-gray">เดือน</span>
      <input 
        type="number" :name="name2" 
        min="0" max="31" step="1" placeholder="00" 
        v-model="value2" 
        @input="(event)=>$emit('input2', event.target.value)" 
        @focusin="isFocused = true" @focusout="isFocused = false" 
        :required="required" 
      />
      <span class="p color-gray">วัน</span>
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
    
    name2: { type: String, default: '' },
    value2: { type: [String, Number, Date], default: '' },
    
    required: { type: Boolean, default: false },
    isFocused: { type: Boolean, default: false }
  },
  emits: [ 'input0', 'input1', 'input2' ]
}
</script>
