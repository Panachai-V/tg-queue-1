<template>

  <div v-if="type === 'textarea'" class="form-group" :class="classer">
    <label v-if="label" class="p color-gray" :class="{ 'focused': isFocused }">
      {{label}} <div v-if="errorText" class="error">{{errorText}}</div>
    </label>
    <div :class="wrapperClass">
      <textarea 
        :name="name" :rows="rows" 
        :placeholder="placeholder" 
        v-model="value" 
        @input="(event)=>$emit('input', event.target.value)" 
        @focusin="isFocused = true" @focusout="isFocused = false" 
        :required="required? true: false"
        :readonly="readonly? true: false"
        :disabled="disabled? true: false"
      ></textarea>
      <div v-if="icon" class="icon">
        <img :src="'/assets/img/icon/'+icon" alt="Image Icon" />
      </div>
    </div>
  </div>

  <div v-else-if="type === 'select'" class="form-group" :class="classer">
    <label v-if="label" class="p color-gray" :class="{ 'focused': isFocused }">
      {{label}} <div v-if="errorText" class="error">{{errorText}}</div>
    </label>
    <div :class="wrapperClass">
      <select 
        :name="name" v-model="value" 
        @input="(event)=>$emit('input', event.target.value)" 
        @focusin="isFocused = true" @focusout="isFocused = false" 
        :required="required? true: false"
        :readonly="readonly? true: false"
        :disabled="disabled? true: false"
      >
        <option v-if="placeholder" value="" disabled selected>
          {{placeholder}}
        </option>
        <option v-for="option in options" :value="option.value" 
        :selected="option.value == value || option.text == value" :key="option.value">
          {{option.text}}
        </option>
      </select>
      <div v-if="icon" class="icon">
        <img :src="'/assets/img/icon/'+icon" alt="Image Icon" />
      </div>
    </div>
  </div>

  <div v-else-if="type == 'plain'" class="form-group" :class="classer">
    <label v-if="label" class="p color-gray">
      {{label}} <div v-if="errorText" class="error">{{errorText}}</div>
    </label>
    <div :class="wrapperClass">
      <div class="plain-text">
        <p v-if="value" v-html="value"></p>
        <p v-else>-</p>
      </div>
    </div>
  </div>

  <div v-else-if="type == 'datepicker'" class="form-group" :class="classer">
    <label v-if="label" class="p color-gray" :class="{ 'focused': isFocused }">
      {{label}} <div v-if="errorText" class="error">{{errorText}}</div>
    </label>
    <DatePicker 
      v-model="value" is-inline title-position="left" 
      :is-required="required? true: false" 
      @click="handleInput" 
      :masks="{ input: 'DD/MM/YYYY' }" locale="th" 
    >
      <template v-slot="{ inputValue, inputEvents }">
        <div :class="wrapperClass">
          <input
            type="text" 
            :name="name" 
            :placeholder="placeholder" 
            :value="inputValue"
            v-on="inputEvents" 
            @focusin="isFocused = true" @focusout="isFocused = false" 
          />
          <div v-if="icon" class="icon">
            <img :src="'/assets/img/icon/'+icon" alt="Image Icon" />
          </div>
        </div>
      </template>
    </DatePicker>
  </div>

  <div v-else-if="type == 'file-image'" class="form-group" :class="classer">
    <label v-if="label" class="p color-gray" :class="{ 'focused': isFocused }">
      {{label}} <div v-if="errorText" class="error">{{errorText}}</div>
    </label>
    <div :class="wrapperClass">
      <input
        type="file" accept="image/png,image/gif,image/jpeg"
        :name="name" 
        :placeholder="placeholder" 
        @input="(event)=>$emit('input', event.target.value)" 
        @focusin="isFocused = true" @focusout="isFocused = false" 
        :required="required? true: false"
        :readonly="readonly? true: false"
        :disabled="disabled? true: false"
      />
      <div v-if="icon" class="icon">
        <img :src="'/assets/img/icon/'+icon" alt="Image Icon" />
      </div>
    </div>
  </div>

  <div v-else-if="type == 'file'" class="form-group" :class="classer">
    <label v-if="label" class="p color-gray" :class="{ 'focused': isFocused }">
      {{label}} <div v-if="errorText" class="error">{{errorText}}</div>
    </label>
    <p v-if="desc" class="sm color-sgray">{{desc}}</p>
    <div class="file-container w-full mt-2" :class="{ 'focused': isFocused }">
      <input 
        :type="type" :name="name" 
        @focusin="isFocused = true" @focusout="isFocused = false" 
        :required="required? true: false" 
        :readonly="readonly? true: false" 
        :disabled="disabled? true: false" 
      />
      <div class="dropzone">
        <div class="d-flex ai-center jc-center">
          <div v-if="icon" class="icon">
            <img :src="'/assets/img/icon/'+icon" class=" mr-3" alt="Image Icon" />
          </div>
          <p class="color-gray md">คลิกหรือลากวางไฟล์ในพื้นที่นี้เพื่ออัปโหลด</p>
        </div>
      </div>
    </div>
    <p class="sm color-sgray mt-2">
      รูปแบบไฟล์: .pdf, .docx, .xlsx, .jpg, .jpeg, .png <br>
      ขนาดไฟล์: ไม่เกิน 10 MB
    </p>
  </div>

  <div v-else-if="type == 'special-1'" class="form-group" :class="classer">
    <label v-if="label" class="p color-gray" :class="{ 'focused': isFocused }">
      {{label}} <div v-if="errorText" class="error">{{ errorText }}</div>
    </label>
    <div class="d-flex">
      <input 
        :type="'text'" 
        :name="name" 
        :placeholder="placeholder" 
        v-model="value" 
        @input="(event)=>$emit('input', event.target.value)" 
        @focusin="isFocused = true" @focusout="isFocused = false" 
        :required="required? true: false"
        :readonly="readonly? true: false"
        :disabled="disabled? true: false"
        style="border-radius: .375rem 0 0 .375rem;"
      />
      <select 
        :name="name2" 
        v-model="value2" 
        @input="(event)=>$emit('input2', event.target.value)" 
        @focusin="isFocused = true" @focusout="isFocused = false" 
        :required="required? true: false"
        :readonly="readonly? true: false"
        :disabled="disabled? true: false"
        style="border-radius: 0 .375rem .375rem 0;"
      >
        <option v-for="option in options" :value="option.value" 
        :selected="option.value == value || option.text == value" :key="option.value">
          {{option.text}}
        </option>
      </select>
      <div v-if="icon" class="icon">
        <img :src="'/assets/img/icon/'+icon" alt="Image Icon" />
      </div>
    </div>
  </div>

  <div v-else class="form-group" :class="classer">
    <label v-if="label" class="p color-gray" :class="{ 'focused': isFocused }">
      {{label}} <div v-if="errorText" class="error">{{errorText}}</div>
    </label>
    <div :class="wrapperClass">
      <input
        :type="type" 
        :name="name" 
        :placeholder="placeholder" 
        v-model="value" 
        @input="(event)=>$emit('input', event.target.value)" 
        @focusin="isFocused = true" @focusout="isFocused = false" 
        :required="required? true: false"
        :readonly="readonly? true: false"
        :disabled="disabled? true: false"
      />
      <div v-if="icon" class="icon">
        <img :src="'/assets/img/icon/'+icon" alt="Image Icon" />
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'FormGroup',
  props: {
    classer: { type: String, default: '' },
    value: { type: [String, Number, Date], default: '' },
    value2: { type: [String, Number, Date], default: '' },
    label: { type: String, default: '' },
    desc: { type: String, default: '' },
    errorText: { type: String, default: '' },
    type: { type: String, default: 'text' },
    name: { type: String, default: '' },
    name2: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    required: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    options: { type: Array, default: [] },
    wrapperClass: { type: String, default: '' },
    icon: { type: String, default: '' },
    isFocused: { type: Boolean, default: false },
    rows: { type: Number, default: 4 }
  },
  methods: {
    handleInput() {
      return this.$emit('input', this.value);
    }
  },
  emits: [ 'input', 'input2' ]
}
</script>
