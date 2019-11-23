'use strict';

import Vue from 'vue';
import axios from 'axios';
import { Toast } from 'mand-mobile';

let config = {
    baseURL: 'https://novel.steps.info',
    timeout: 10000 // Timeout
};

const _axios = axios.create(config);
_axios.interceptors.request.use(
    function(config) {
        Toast.loading('加载中...');
        return config;
    },
    function(error) {
        Toast.failed('请求失败，请重试', 2000);
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
        Toast.hide();
        return response;
    },
    function(error) {
        Toast.failed('请求失败，请重试', 2000);
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
