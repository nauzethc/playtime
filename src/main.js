import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vueChartPlugin from './plugins/vue-chart-plugin'

createApp(App)
  .use(router)
  .use(vueChartPlugin)
  .mount('#app')
