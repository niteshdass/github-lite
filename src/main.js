import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './sass/main.scss'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

Vue.use(Toast)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
