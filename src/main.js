// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import store from './store'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';//决定你把对象以表单形式提交到后台

Vue.use(VueQuillEditor, /* { default global options } */ )

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})