<template>
    <div class="chapter">
        <div class="content">
            <!--            <v-touch @swipeleft="nextChapter" @swiperight="prevChapter">-->
            <div v-html="data.cpContent"></div>
            <!--            </v-touch>-->
            <Popup v-model="showPicker" style="width: 80vw;height: 70vh" position="center" get-container="body">
                <CellGroup>
                    <Cell v-for="(item, key) in categories" :title="item.title" @click="fetchData(item.link)" :key="key"></Cell>
                </CellGroup>
            </Popup>
        </div>
    </div>
</template>

<script>
import { Popup, Cell, CellGroup } from 'vant';
import BScroll from 'better-scroll';
// import Vue from 'vue';
// import VueTouch from 'vue-touch';
// Vue.use(VueTouch);
// VueTouch.config.swipe = {
//     direction: 'horizontal'
// };

export default {
    name: 'Chapter',
    props: {
        showCategory: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Popup,
        CellGroup,
        Cell
    },
    data() {
        return {
            url: this.$route.query.link,
            data: {},
            categories: JSON.parse(localStorage.getItem('category')),
            chapterIndex: this.$route.query.order,
            showPicker: false,
            scrollX: 0
        };
    },
    watch: {
        url: {
            handler(val) {
                this.fetchData(val);
            },
            immediate: true
        },
        showCategory(val) {
            this.showPicker = val;
        },
        scrollX(val) {
            if (val > 50) {
                this.prevChapter();
            }
            if (val < -50) {
                this.nextChapter();
            }
        }
    },
    created() {
        this.bscroll = null;
    },
    methods: {
        async fetchData(url) {
            await this.$axios.get(`/chapter?url=${url}`).then(res => {
                this.$emit('changeTitle', res.data.data.title);
                res.data.data.cpContent = res.data.data.cpContent.replace(/\s+/g, '<div class="divider" style="padding: 15px 0;"></div>');
                this.data = res.data.data;
            });
            this.$nextTick(() => {
                if (this.bscroll) {
                    this.bscroll.refresh();
                } else {
                    this.bscroll = new BScroll('.chapter', {
                        scrollX: true,
                        scrollY: true,
                        bounceTime: 800,
                        click: true,
                        probeType: 3
                    });
                }
                this.bscroll.on('touchEnd', pos => {
                    this.scrollX = pos.x;
                });
            });
            this.showPicker = false;
        },
        prevChapter() {
            this.chapterIndex = this.chapterIndex > 0 ? this.chapterIndex - 1 : this.chapterIndex;
            console.log(this.chapterIndex);
            this.url = this.categories[this.chapterIndex].link;
            this.$db.setData('current', { chapterIndex: this.chapterIndex });
        },
        nextChapter() {
            this.chapterIndex = this.chapterIndex < this.categories.length ? this.chapterIndex + 1 : this.chapterIndex;
            console.log(this.chapterIndex);
            this.url = this.categories[this.chapterIndex].link;
            this.$db.setData('current', { chapterIndex: this.chapterIndex });
        }
    },
    beforeRouteLeave(to, from, next) {
        this.bscroll && this.bscroll.destroy();
        this.$toast.clear();
        next();
    }
};
</script>

<style scoped lang="scss">
.chapter {
    width: 100vw;
    height: calc(100vh - 44px);
    font-size: 13px;
    overflow: hidden;
    .content {
        padding: 16px;
        min-height: calc(100% + 1px);
        min-width: calc(100% + 1px);
    }
    .cate {
        padding: 15px;
        -webkit-overflow-scrolling: touch;
        overflow-y: scroll;
        max-height: 60vh;
        background-color: #fff;
        .link {
            .md-cell-item-content {
                p {
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
