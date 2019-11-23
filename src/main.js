import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import db from './db';
import './registerServiceWorker';
import 'normalize.css';
import { Toast, Dialog, Lazyload } from 'vant';

Vue.config.productionTip = false;
Vue.prototype.$db = db;
Vue.use(Toast)
    .use(Dialog)
    .use(Lazyload);
Vue.config.devtools = true;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
