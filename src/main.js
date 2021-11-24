import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vueChartPlugin from './plugins/vue-chart-plugin'
import vueFetchTimeoutPlugin from './plugins/vue-fetch-timeout-plugin'

createApp(App)
  .use(router)
  .use(vueChartPlugin)
  .use(vueFetchTimeoutPlugin)
  .mount('#app')
