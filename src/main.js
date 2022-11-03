import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import router from "./router";
import VueClipboard from 'vue-clipboard2'
import "nprogress/nprogress.css";
import VueMeta from "vue-meta";

Vue.use(VueClipboard)
Vue.use(VueMeta);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')
