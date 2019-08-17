// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import TextArea from '../packages/textarea'
import TextArea2 from '../packages/textarea2'
import ImageView from '../packages/image'
import Collapse from '../packages/collapse'

Vue.use(TextArea)
Vue.use(TextArea2)
Vue.use(ImageView)
Vue.use(Collapse)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
