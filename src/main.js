import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import FastClick from 'fastclick';
import db from './db';
import './registerServiceWorker';
import 'normalize.css';
import LazyLoadDirective from './components/LazyLoadDirective';

FastClick.attach(document.body);
Vue.config.productionTip = false;
Vue.directive('lazyload', LazyLoadDirective);
Vue.prototype.$db = db;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
