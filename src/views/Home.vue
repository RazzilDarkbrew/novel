<template>
    <div class="index">
        <md-result-page
            class="customized"
            img-url="//manhattan.didistatic.com/static/manhattan/do1_JX7bcfXqLpStKRv31xlp"
            text="不太确定自己错在了哪里..."
            subtext="要不然刷新试试？"
            v-if="error"
        />
        <template v-else>
            <md-tabs v-model="currentTab">
                <md-tab-pane class="content" name="jx" label="精选">
                    <Banner :data="data.banners" />
                    <Item :data="data.nodes" />
                </md-tab-pane>
                <md-tab-pane class="content" name="male" label="男生">
                    <Banner :data="data.banners" />
                    <Item :data="data.nodes" />
                </md-tab-pane>
                <md-tab-pane class="content" name="female" label="女生">
                    <Banner :data="data.banners" />
                    <Item :data="data.nodes" />
                </md-tab-pane>
                <md-tab-pane class="content" name="free" label="免费">
                    <Banner :data="data.banners" />
                    <Item :data="data.nodes" />
                </md-tab-pane>
                <md-tab-pane class="content search-content" name="search" label="搜索">
                    <md-input-item
                        ref="name"
                        placeholder="作者/名称"
                        clearable
                        align="center"
                        @focus="suggestList = []"
                        @blur="suggestList = []"
                        v-model="txt"
                    ></md-input-item>
                    <div :class="{ show: suggestList.length }" class="suggestList">
                        <div v-for="(item, key) in suggestList" :key="key" class="item" @click="$_detail(item)">
                            <span>{{ item.text || item.title }}</span
                            ><span>{{ item.author }}</span>
                        </div>
                    </div>
                    <div class="hotWords">
                        <h5>热门标签</h5>
                        <div class="tags">
                            <span v-for="(item, key) in hotWords" :key="key" font-color="#FF8843" type="ghost" @click="searchBook(item)">{{ item }} </span>
                        </div>
                    </div>
                </md-tab-pane>
            </md-tabs>
        </template>
    </div>
</template>

<script>
import { ResultPage, ScrollView, Swiper, SwiperItem, TabPane, Tabs, InputItem } from 'mand-mobile';
import Banner from '../components/Banner';
import Item from '../components/Item';
import { debounce } from '../utils';

export default {
    name: 'home',
    components: {
        [Swiper.name]: Swiper,
        [SwiperItem.name]: SwiperItem,
        [ResultPage.name]: ResultPage,
        [ScrollView.name]: ScrollView,
        [InputItem.name]: InputItem,
        [Tabs.name]: Tabs,
        [TabPane.name]: TabPane,
        Banner,
        Item
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
        document.addEventListener(
            'click',
            () => {
                this.suggestList = [];
            },
            false
        );
    },
    watch: {
        currentTab: {
            handler(val) {
                this.fetchData(val);
            },
            immediate: true
        },
        txt: {
            handler: debounce(function(val) {
                this.$axios({
                    method: 'GET',
                    url: `/suggest?text=${val}`
                }).then(res => {
                    console.log(res.data.data);
                    if (res.data.result === 1) {
                        this.suggestList = res.data.data.keywords.filter(item => item.tag === 'bookname');
                    }
                });
            }, 500)
        }
    },
    methods: {
        async fetchData(tab) {
            if (tab === 'search') {
                try {
                    await this.$axios({
                        method: 'GET',
                        url: '/hotWords'
                    }).then(res => {
                        if (res.data.result === 1) {
                            this.hotWords = res.data.data;
                        }
                    });
                } catch (e) {
                    this.error = true;
                }
            } else {
                try {
                    await this.$axios({
                        method: 'GET',
                        url: `/?type=${tab}`
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
                    this.error = true;
                }
            }
        },
        searchBook(text) {
            console.log(text);
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
        async $_detail(obj) {
            await this.$db.setData('current', obj);
            this.$router.push({ name: 'BookDetail', query: { bookid: obj._id || obj.id } });
        }
    }
};
</script>

<style lang="scss">
.md-field-item {
    z-index: 99;
}

.index {
    margin-top: -80px;
    height: 100vh;

    .title {
        padding: 15px;
        font-size: 32px;
        border-bottom: 2px solid #dcdcdc;
    }

    .swiper {
        height: 250px;

        img {
            display: block;
            width: 100%;
            height: auto;
            object-fit: cover;
        }
    }

    .home-nav {
        display: flex;
        justify-content: space-around;
        font-size: 24px;
        padding: 30px;
        text-align: center;
        border-bottom: 2px solid gainsboro;

        a {
            text-decoration: none;
            color: #333;
        }

        .icon {
            display: block;
            margin-bottom: 10px;
            width: 60px;
            height: 60px;

            &.icon-cat {
                background: url('../assets/svg/icon-cat.svg') no-repeat scroll center;
                background-size: 60px;
                fill: #fff;
            }

            &.icon-complete {
                background: url('../assets/svg/icon-complete.svg') no-repeat scroll center;
                background-size: 60px;
                fill: #fff;
            }

            &.icon-free {
                background: url('../assets/svg/icon-free.svg') no-repeat scroll center;
                background-size: 60px;
            }

            &.icon-serial {
                background: url('../assets/svg/icon-serial.svg') no-repeat scroll center;
                background-size: 60px;
            }

            &.icon-sort {
                background: url('../assets/svg/icon-sort.svg') no-repeat scroll center;
                background-size: 60px;
            }
        }
    }

    .search-content {
        padding: 30px;
        height: calc(100vh - 100px);
    }

    .suggestList {
        position: absolute;
        top: 130px;
        left: 0;
        padding: 0 30px;
        width: 100%;
        max-height: 500px;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        background-color: #fff;
        transform: translateX(-100%);
        transition: all 0.25s ease-in-out;
        opacity: 0;
        z-index: 1;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);

        &.show {
            transform: none;
            opacity: 1;
            transition: all 0.25s ease-in;
        }

        .item {
            display: flex;
            height: 88px;
            justify-content: space-between;
            align-items: center;
            font-size: 24px;

            span {
                &:last-child {
                    color: rgb(255, 136, 67);
                }
            }

            &:not(:last-child) {
                border-bottom: 1px solid #dcdcdc;
            }
        }
    }

    .hotWords {
        padding: 30px 0;
        font-size: 26px;

        h5 {
            font-size: 30px;
            color: gray;
        }

        .tags {
            display: flex;
            flex-wrap: wrap;
        }

        span {
            display: block;
            padding: 0 12px;
            margin: 15px 15px 0 0;
            border: 1px solid currentColor;
            background: transparent;
            color: rgb(255, 136, 67);
        }
    }
}
</style>
