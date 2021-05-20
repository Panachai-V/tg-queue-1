<template>
  <div class="ss-card ss-card-03" :class="classer">
    <div class="header">
      <div class="title p">{{label}}</div>
      <div v-if="Object.keys(options).length" class="option">
        <a href="#">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.75 12C7.75 12.9665 6.9665 13.75 6 13.75C5.0335 13.75 4.25 12.9665 4.25 12C4.25 11.0335 5.0335 10.25 6 10.25C6.9665 10.25 7.75 11.0335 7.75 12Z" />
            <path d="M13.75 12C13.75 12.9665 12.9665 13.75 12 13.75C11.0335 13.75 10.25 12.9665 10.25 12C10.25 11.0335 11.0335 10.25 12 10.25C12.9665 10.25 13.75 11.0335 13.75 12Z" />
            <path d="M18 13.75C18.9665 13.75 19.75 12.9665 19.75 12C19.75 11.0335 18.9665 10.25 18 10.25C17.0335 10.25 16.25 11.0335 16.25 12C16.25 12.9665 17.0335 13.75 18 13.75Z" />
          </svg>
        </a>
        <div class="dropdown">
          <div v-if="options.view" class="submenu">
            <a href="{{options.view.href}}">
              <div class="icon">
                <img src="/assets/img/icon/layers.svg" alt="Image Icon" />
              </div>
              <div class="text">ดูข้อมูล</div>
            </a>
          </div>
          <div v-if="options.edit" class="submenu">
            <a href="{{options.edit.href}}">
              <div class="icon">
                <img src="/assets/img/icon/edit.svg" alt="Image Icon" />
              </div>
              <div class="text">แก้ไข</div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!cardSmall" class="body">
      <h6 class="h2 lh-3xs">{{Number(count).toLocaleString()}}</h6>
      <p class="unit lh-xs">{{unit}}</p>
    </div>
    <div v-else class="body">
      <h6 class="h3 lh-2xs">{{Number(count).toLocaleString()}}</h6>
      <p class="unit lh-xs">{{unit}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpecialCard03',
  props: {
    cardSmall: { type: Boolean, default: false },
    classer: { type: String, default: '' },
    label: { type: String, default: '' },
    count: { type: Number, default: 0 },
    unit: { type: String, default: '' },
    options: { type: Object, default: {} }
  },
  emits: [ 'input', 'input-count', 'input-delete', 'input-add' ]
}
</script>
