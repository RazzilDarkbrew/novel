<template>
    <div class="book-detail scroll" v-cloak>
        <div class="content">
            <div class="info">
                <div class="cover">
                    <img v-lazy="data.detail.cover" :alt="data.detail.title" />
                </div>
                <div class="detail">
                    <div class="header">
                        <div class="title">{{ data.detail.title }}</div>
                        <p>
                            <span>{{ data.detail.author }}</span
                            >{{ data.detail.majorCate }}
                        </p>
                    </div>
                    <div class="count">{{ data.detail.wordCount | count }}</div>
                </div>
            </div>
            <div class="sub-info">
                <div class="rate">
                    <span>{{ data.detail.rating.score.toFixed(1) + '分' }}</span
                    ><span>{{ data.detail.rating.count + '参与评论' }}</span>
                </div>
                <div class="store">
                    <span>{{ data.detail.retentionRatio + '%' }}</span
                    ><span>读者留存</span>
                </div>
                <div class="follow">
                    <span>{{ data.detail.latelyFollower }}</span
                    ><span>追书人气</span>
                </div>
            </div>
            <div class="shortIntro">
                <div class="title">简介</div>
                <p>{{ data.detail.longIntro }}</p>
            </div>
            <div class="categories" @click="showSelectSource = !showSelectSource">
                <span>目录</span>
                <span>14小时前更新</span>
                <span>{{ data.detail.lastChapter }}</span>
                <Icon name="arrow-right" size="sm"></Icon>
            </div>
            <div class="related">
                <div class="title">本书追友还在读这些书</div>
                <div class="items">
                    <div class="item" v-for="(item, key) in data.recommend" :key="key" @click="goBook(item)">
                        <div class="cover">
                            <img v-lazy="item.cover" :alt="item.title" />
                        </div>
                        <div class="name">{{ item.title }}</div>
                    </div>
                </div>
            </div>
            <div class="others" v-if="data.other.length">
                <div class="title">作者的其他作品</div>
                <div class="items">
                    <div class="item" v-for="(item, key) in data.other" :key="key" @click="goBook(item)">
                        <div class="cover">
                            <img :src="item.cover" :alt="item.title" />
                        </div>
                        <div class="name">{{ item.title }}</div>
                    </div>
                </div>
            </div>
        </div>

        <ActionSheet v-model="showSelectSource" title="选择小说来源" :actions="options" @select="$_selected"></ActionSheet>
    </div>
</template>

<script>
import { Icon, ActionSheet } from 'vant';
import BScroll from 'better-scroll';
export default {
    name: 'BookDetail',
    components: {
        Icon,
        ActionSheet
    },
    data() {
        return {
            bookid: this.$route.query.bookid,
            data: {
                detail: {
                    wordCount: 0,
                    rating: { score: 0, count: 0 },
                    retentionRatio: 0
                },
                recommend: {},
                other: [],
                source: []
            },
            loading: false,
            error: false,
            showSelectSource: false
        };
    },
    watch: {
        bookid: {
            handler(val) {
                this.fetchData(val).then(() => {
                    this.loading = false;
                });
            },
            immediate: true
        }
    },
    computed: {
        options() {
            let options = [];
            this.data.source.map((v, k) => {
                options.push({
                    name: v.name,
                    value: k,
                    _id: v._id
                });
            });
            return options;
        }
    },
    created() {
        this.bscroll = null;
    },
    filters: {
        count(val) {
            return val && val.toString().length > 5 ? parseInt(val / 10000) + '万字' : val + '字';
        }
    },
    methods: {
        async fetchData(id) {
            this.loading = true;
            this.error = false;
            await this.$axios.get(`/detail?bookid=${id}`).then(res => {
                if (res.data.result === 1) {
                    this.$emit('changeTitle', res.data.data.detail.title);
                    this.$set(this, 'data', res.data.data);
                } else {
                    this.error = true;
                }
            });
            if (this.bscroll) {
                this.bscroll.refresh();
            } else {
                this.bscroll = new BScroll('.scroll', {
                    scrollY: true,
                    bounceTime: 800,
                    click: true,
                    probeType: 3
                });
            }
        },
        $_selected(item) {
            if (item.name === '优质书源') {
                this.$dialog
                    .confirm({
                        title: '友情提示',
                        message: '优质书源是追书神器官方Vip书源，无法阅读某些章节！',
                        cancelText: '取消',
                        confirmText: '确定'
                    })
                    .then(() => {
                        this.$db.setData('current', { sourceValue: item.value });
                        this.$router.push({
                            name: 'category',
                            query: {
                                title: this.data.detail.title,
                                sourceId: item._id
                            }
                        });
                    });
            }
        },
        async goBook(obj) {
            await this.$db.setData('current', obj);
            this.bookid = obj._id;
        }
    },
    beforeRouteLeave(to, from, next) {
        this.bscroll && this.bscroll.destroy();
        this.$toast.clear();
        next();
    }
};
</script>

<style lang="scss" scoped>
.book-detail {
    height: calc(100vh - 44px);
    overflow: hidden;
    .title {
        font-size: 18px;
        color: #1a202c;
    }
    .content {
        padding: 16px;
        min-height: calc(100% + 1px);
    }
    .info {
        display: flex;
        margin-bottom: 16px;
        .cover {
            flex: 1;
            img {
                display: block;
                width: 100%;
                height: auto;
            }
        }
        .detail {
            display: flex;
            padding-left: 16px;
            flex: 3;
            flex-direction: column;
            justify-content: space-between;
            font-size: 13px;
            .header {
                p {
                    span {
                        color: red;
                        &:after {
                            display: inline-block;
                            content: '|';
                            padding: 0 10px;
                            color: #718096;
                        }
                    }
                }
            }
        }
    }
    .sub-info {
        margin-bottom: 16px;
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        color: #1a202c;
        text-align: center;
        span {
            display: block;
            color: #718096;
            &:first-child {
                color: red;
            }
        }
    }
    .shortIntro {
        margin-bottom: 16px;
        font-size: 13px;
        color: #718096;
    }
    .categories {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 -16px;
        padding: 16px;
        border-top: 8px solid #edf2f7;
        border-bottom: 8px solid #edf2f7;
        font-size: 13px;
        color: #1a202c;
        span {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
            &:nth-of-type(2) {
                color: red;
            }
        }
    }
    .related {
        margin-bottom: 16px;
        .title {
            padding: 16px 0;
        }
    }
    .items {
        display: flex;
        text-align: center;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        .item {
            margin-right: 16px;
            width: 80px;
            font-size: 12px;
            color: #1a202c;
            img {
                display: block;
                width: 80px;
                height: 100px;
                object-fit: cover;
            }
            .name {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
    }
}
</style>
