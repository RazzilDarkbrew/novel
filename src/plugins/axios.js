'use strict';

import Vue from 'vue';
import axios from 'axios';

let config = {
    baseURL: 'https://novel.steps.info',
    timeout: 10000 // Timeout
};

const _axios = axios.create(config);
_axios.interceptors.request.use(
    function(config) {
        Vue.prototype.$toast.loading();
        return config;
    },
    function(error) {
        Vue.prototype.$toast.fail({ message: '请求失败，请重试' });
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
        Vue.prototype.$toast.clear();
        return response;
    },
    function(error) {
        Vue.prototype.$toast.fail({ message: '请求失败，请重试' });
        return Promise.reject(error);
    }
);

Plugin.install = function(Vue) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        }
    });
};

Vue.use(Plugin);

export default Plugin;
