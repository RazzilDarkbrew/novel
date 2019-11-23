<template>
    <div class="book-detail">
        <template v-if="loading"> </template>
        <template v-else-if="error">
            <md-result-page
                class="customized"
                img-url="//manhattan.didistatic.com/static/manhattan/do1_JX7bcfXqLpStKRv31xlp"
                text="不太确定自己错在了哪里..."
                subtext="要不然刷新试试？"
                v-if="error"
            />
        </template>
        <template v-else>
            <div class="info">
                <div class="cover">
                    <img :src="data.detail.cover" :alt="data.detail.title" />
                </div>
                <div class="detail">
                    <div class="header">
                        <h3>{{ data.detail.title }}</h3>
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
                <h3>简介</h3>
                <p>{{ data.detail.longIntro }}</p>
            </div>
            <div class="categories" @click="showSelectSource = !showSelectSource">
                <span>目录</span>
                <span>14小时前更新</span>
                <span>{{ data.detail.lastChapter }}</span>
                <md-icon name="arrow-right" size="sm"></md-icon>
            </div>
            <div class="related">
                <h3>本书追友还在读这些书</h3>
                <md-scroll-view ref="scrollView" :scrolling-y="false" :auto-reflow="true">
                    <div class="items">
                        <div class="item" v-for="(item, key) in data.recommend" :key="key" @click="goBook(item)">
                            <div class="cover">
                                <img :src="item.cover" :alt="item.title" />
                            </div>
                            <div class="name">{{ item.title }}</div>
                        </div>
                    </div>
                </md-scroll-view>
            </div>
            <div class="others">
                <h3>作者的其他作品</h3>
                <md-scroll-view ref="scrollView" :scrolling-y="false" :auto-reflow="true">
                    <div class="items">
                        <div class="item" v-for="(item, key) in data.other" :key="key" @click="goBook(item)">
                            <div class="cover">
                                <img :src="item.cover" :alt="item.title" />
                            </div>
                            <div class="name">{{ item.title }}</div>
                        </div>
                    </div>
                </md-scroll-view>
            </div>
        </template>

        <md-action-sheet v-model="showSelectSource" title="选择小说来源" :options="options" @selected="$_selected"></md-action-sheet>
    </div>
</template>

<script>
import { ScrollView, Icon, ActionSheet, ActivityIndicator, Dialog, ResultPage } from 'mand-mobile';

export default {
    name: 'BookDetail',
    components: {
        [ScrollView.name]: ScrollView,
        [ActionSheet.name]: ActionSheet,
        [ActivityIndicator.name]: ActivityIndicator,
        [Icon.name]: Icon,
        [Dialog.name]: Dialog,
        [ResultPage.name]: ResultPage
    },
    data() {
        return {
            bookid: this.$route.query.bookid,
            data: {
                detail: {
                    rating: { score: 0 }
                },
                recommend: {},
                other: {},
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
                    label: v.name,
                    value: k,
                    _id: v._id
                });
            });
            return options;
        }
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
        },
        $_selected(item) {
            if (item.label === '优质书源') {
                Dialog.confirm({
                    title: '友情提示',
                    content: '优质书源是追书神器官方Vip书源，无法阅读某些章节！',
                    cancelText: '取消',
                    confirmText: '确定',
                    onConfirm: () => {
                        this.$db.setData('current', { sourceValue: item.value });
                        this.$router.push({
                            name: 'category',
                            query: {
                                title: this.data.detail.title,
                                sourceId: item._id
                            }
                        });
                    }
                });
            }
        },
        async goBook(obj) {
            await this.$db.setData('current', obj);
            this.bookid = obj._id;
        }
    }
};
</script>

<style lang="scss" scoped>
.book-detail {
    padding: 15px;
    h3 {
        padding-top: 15px;
        margin-bottom: 15px;
        font-size: 30px;
        color: #666;
    }
    .info {
        display: flex;
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
            padding-left: 15px;
            flex: 4;
            flex-direction: column;
            justify-content: space-between;
            font-size: 26px;
            color: #999;
            .header {
                p {
                    span {
                        color: red;
                        &:after {
                            display: inline-block;
                            content: '|';
                            padding: 0 10px;
                            color: #999;
                        }
                    }
                }
            }
        }
    }
    .sub-info {
        padding: 15px;
        display: flex;
        justify-content: space-between;
        font-size: 26px;
        color: #999;
        text-align: center;
        span {
            display: block;
            &:first-child {
                color: red;
            }
        }
    }
    .shortIntro {
        padding: 15px;
        font-size: 26px;
        color: #999;
    }
    .categories {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 -15px;
        padding: 15px;
        border-top: 15px solid #eeeeee;
        border-bottom: 15px solid #eeeeee;
        font-size: 26px;
        color: #999;
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
        margin-bottom: 30px;
    }
    .items {
        display: flex;
        text-align: center;
        .item {
            margin-right: 15px;
            width: 150px;
            font-size: 24px;
            color: #999;
            img {
                display: block;
                width: 150px;
                height: 200px;
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
