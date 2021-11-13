import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import '@/assets/main.scss'
import { store } from './_store/store'
import VueToastr from 'vue-toastr'

Vue.use(VueMaterial)
Vue.use(Vuelidate)
Vue.use(VueToastr)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
