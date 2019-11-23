<template>
    <div id="app">
        <nav class="app-nav" v-if="$route.name !== 'home'">
            <Icon name="arrow-left" @click="$_back" />
            {{ title }}
            <Icon name="chart-trending-o" @click="sort = !sort" v-if="$route.name === 'category'" />
            <Icon name="ellipsis" @click="showCategory = !showCategory" v-else-if="$route.name === 'chapter'" />
            <Icon name="home-o" v-else @click="$router.push({ name: 'home' })" />
        </nav>
        <transition :name="transitionName" mode="out-in">
            <router-view class="app-main" :sort="sort" :showCategory="showCategory" @changeTitle="changeTitle" />
        </transition>
    </div>
</template>

<script>
import { Icon } from 'vant';

export default {
    components: {
        Icon
    },
    data() {
        return {
            title: '首页',
            transitionName: 'slide-right',
            sort: false,
            showCategory: false
        };
    },
    beforeRouteUpdate(to, from, next) {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
        next();
    },
    methods: {
        $_back() {
            this.$router.back();
        },
        changeTitle(title) {
            this.title = title || '书城';
        }
    }
};
</script>
<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html,
body {
    position: relative;
    font-size: 13px;
    width: 100vw;
    height: 100vh;
    line-height: 1.5;
    overflow: hidden;
}
.app-nav {
    display: flex;
    padding: 0 15px;
    height: 44px;
    background-color: #2f86f6;
    color: #fff;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    z-index: 99;
}

.app-main {
    min-height: 100vh;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
}
</style>
