import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                title: '首页'
            }
        },
        {
            path: '/category',
            name: 'category',
            component: () => import(/* webpackChunkName: "category" */ './views/Category.vue'),
            meta: {
                title: '分类'
            }
        },
        {
            path: '/cat-sort',
            name: 'catSort',
            component: () => import(/* webpackChunkName: "catSort" */ './views/CatSort.vue'),
            meta: {
                title: '分类排行'
            }
        },
        {
            path: '/book-detail',
            name: 'BookDetail',
            component: () => import(/* webpackChunkName: "bookDetail" */ './views/BookDetail.vue'),
            meta: {
                title: '书籍详情'
            }
        },
        {
            path: '/chapter',
            name: 'chapter',
            component: () => import(/* webpackChunkName: "Chapter" */ './views/Chapter.vue'),
            meta: {
                title: '章节详情'
            }
        },
        {
            path: '/search',
            name: 'search',
            components: () => import(/* webpackChunkName: "Search" */ './views/Search.vue'),
            meta: {
                title: '搜索'
            }
        }
    ],
    scrollBehavior() {
        return { x: 0, y: 0 };
    }
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});
export default router;
