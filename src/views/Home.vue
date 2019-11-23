<template>
    <div class="index">
        <div class="tab">
            <span :class="{ active: currentTab === 'jx' }" @click.stop="currentTab = 'jx'">精选</span>
            <span :class="{ active: currentTab === 'male' }" @click.stop="currentTab = 'male'">男生</span>
            <span :class="{ active: currentTab === 'female' }" @click.stop="currentTab = 'female'">女生</span>
            <span :class="{ active: currentTab === 'free' }" @click.stop="currentTab = 'free'">免费</span>
            <span :class="{ active: currentTab === 'search' }" @click.stop="currentTab = 'search'">搜索</span>
        </div>
        <Swipe :height="140" class="banner">
            <SwipeItem v-for="(item, key) in data.banners" :key="key" @click="$_detail($event, item)">
                <img :alt="item.title" v-lazy="item.img" />
            </SwipeItem>
        </Swipe>
        <div class="scroll">
            <div class="content">
                <router-link
                    tag="div"
                    class="item"
                    v-for="(item, key) in data.nodes"
                    :key="key"
                    :to="{ path: 'book-detail', query: { bookid: item._id || item.id } }"
                >
                    <div class="cover">
                        <img :alt="item.title" v-lazy="item.cover" />
                    </div>
                    <div class="info">
                        <header>
                            <h3>{{ item.title }}</h3>
                            <div class="desc">{{ item.shortIntro }}</div>
                        </header>
                        <div class="detail">
                            <div class="author"><Icon name="user-o" />{{ item.author }}</div>
                            <div class="tags">
                                <span class="tag">{{ item.majorCate }}</span>
                                <span class="follow">{{ item.latelyFollower | count }}</span>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { Swipe, SwipeItem, Icon } from 'vant';
import BScroll from 'better-scroll';

export default {
    name: 'home',
    components: {
        Swipe,
        SwipeItem,
        Icon
    },
    data() {
        return {
            data: {},
            error: false,
            currentTab: 'jx',
            txt: '',
            suggestList: [],
            hotWords: []
        };
    },
    created() {
        this.bscroll = null;
    },
    watch: {
        currentTab: {
            handler: 'fetchData',
            immediate: true
        }
    },
    filters: {
        count(val) {
            return val && val.toString().length >= 5 ? (val / 10000).toFixed(1) + '万人气' : val + '人气';
        }
    },
    methods: {
        async fetchData() {
            if (this.currentTab === 'search') {
                await this.$router.push({ path: 'search' });
                // try {
                //     await this.$axios({
                //         method: 'GET',
                //         url: '/hotWords'
                //     }).then(res => {
                //         if (res.data.result === 1) {
                //             this.hotWords = res.data.data;
                //         }
                //     });
                // } catch (e) {
                //     this.error = true;
                // }
            } else {
                try {
                    await this.$axios({
                        method: 'GET',
                        url: `/?type=${this.currentTab}`
                    }).then(res => {
                        if (res.data.ok) {
                            const { nodes, spread } = res.data.data;
                            this.$set(
                                this,
                                'data',
                                Object.assign(
                                    {},
                                    {
                                        nodes: nodes.reduce((prev, current) => prev.concat(current.books), []),
                                        banners: spread.reduce((prev, current) => prev.concat(current.advs), []).filter(v => v.type === 'c-bookdetail')
                                    }
                                )
                            );
                        }
                    });
                } catch (e) {
                    console.log(e);
                    this.error = true;
                }
            }

            this.$nextTick(() => {
                if (!this.bscroll) {
                    this.bscroll = new BScroll('.scroll', {
                        probeType: 3,
                        click: true
                    });
                } else {
                    this.bscroll.refresh();
                }
            });
        },
        searchBook(text) {
            this.$axios({
                url: `/search?text=${text}`
            }).then(res => {
                if (res.data.result === 1) {
                    this.suggestList = res.data.data.books;
                } else {
                    console.log(res);
                }
            });
        },
        $_detail(event, obj) {
            console.log(event, obj);
            this.$router.push({ path: 'book-detail', query: { bookid: obj._id || obj.link || obj.id } });
        }
    },
    beforeRouteLeave(to, from, next) {
        this.bscroll && this.bscroll.destroy();
        this.$toast.clear();
        next();
    }
};
</script>

<style lang="scss">
.index {
    font-size: 14px;
    color: #1a202c;
    .tab {
        position: relative;
        display: flex;
        height: 44px;
        align-items: center;
        padding: 0 16px;
        justify-content: space-between;
        span {
            position: relative;
            display: block;
            &::after {
                display: block;
                position: absolute;
                content: '';
                width: 100%;
                height: 2px;
                transform: scale(0);
                background-color: #38b2ac;
                transition: transform 0.167s ease-in-out;
                left: 0;
                bottom: -2px;
            }
            &.active {
                &::after {
                    transform: scale(1);
                    transition: transform 0.167s ease-in-out;
                }
            }
        }
    }

    .banner {
        img {
            width: 100vw;
            height: 140px;
            object-fit: cover;
        }
    }

    .scroll {
        position: relative;
        height: calc(100vh - 184px);
        overflow: hidden;
        .content {
            padding: 16px;
            min-height: calc(100% + 1px);
        }
    }
    .item {
        display: flex;
        margin-bottom: 16px;
        .cover {
            flex: 1;
            img {
                display: block;
                width: 100%;
                height: auto;
                object-fit: cover;
            }
        }

        .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 3;
            padding-left: 16px;
            .desc {
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                color: #718096;
            }
            .detail {
                display: flex;
                justify-content: space-between;
                color: #718096;
                .tag,
                .follow {
                    margin-left: 8px;
                    padding: 3px 5px;
                    border-radius: 10px;
                    background-color: #38b2ac;
                    font-size: 11px;
                    color: #ffffff;
                }
            }
        }
    }
}
</style>
