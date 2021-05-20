import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

import { DatePicker } from 'v-calendar';
import Button from './components/Button'
import FormGroup from './components/FormGroup'
import FormGroupAge from './components/FormGroupAge'
import CheckboxSet from './components/CheckboxSet'
import PopupOptions from './components/PopupOptions'
app.component('DatePicker', DatePicker)
app.component('Button', Button)
app.component('FormGroup', FormGroup)
app.component('FormGroupAge', FormGroupAge)
app.component('CheckboxSet', CheckboxSet)
app.component('PopupOptions', PopupOptions)

app.use(router).mount('#app')
