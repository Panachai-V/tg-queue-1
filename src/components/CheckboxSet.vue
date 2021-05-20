<template>
  <div class="form-group" :class="classer">
    <label v-if="label" class="p color-gray">
      {{label}} <div v-if="errorText" class="error">{{errorText}}</div>
    </label>
    <fieldset>
      <div class="checkbox-set">
        <div v-for="(option, index) in options" :key="index" class="checkbox">
          <input v-if="type == 'checkbox'" :type="type" 
            :name="name" :id="name+'_'+index" :value="option.value"
            :required="required? true: false" 
            :checked="value.indexOf(option.value)>-1? true: false" 
            @change="(event)=>$emit('input', event.target.value)"
          />
          <input v-else :type="type" 
            :name="name" :id="name+'_'+index" :value="option.value"
            :required="required? true: false" 
            :checked="option.value==value? true: false" 
            @change="(event)=>$emit('input', event.target.value)"
          />
          <label :for="name+'_'+index">
            {{option.text}}
          </label>
        </div>
        <div v-if="textInput" class="checkbox checkbox-input">
          <div class="form-group">
            <input 
              type="text" :class="textInputDisabled ? 'bg-lgray': ''" :placeholder="textInputPlaceholder" 
              @input="(event)=>$emit('input-text', event.target.value)"
              :disabled="textInputDisabled"
            />
          </div>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'CheckboxSet',
  props: {
    type: { type: String, default: 'radio' },
    classer: { type: String, default: '' },
    label: { type: String, default: 'Checkbox Set' },
    errorText: { type: String, default: '' },
    name: { type: String, default: '' },
    required: { type: Boolean, default: false },
    options: { type: Array, default: [] },
    value: { type: [String, Array, Number, Date], default: '' },
    textInput: { type: Boolean, default: false },
    textInputPlaceholder: { type: String, default: '' },
    textInputDisabled: { type: Boolean, default: false }
  },
  emits: [ 'input', 'input-text' ]
}
</script>
