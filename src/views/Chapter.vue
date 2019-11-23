<template>
    <div class="chapter">
        <v-touch @swipeleft="nextChapter" @swiperight="prevChapter">
            <div v-html="data.cpContent"></div>
        </v-touch>
        <md-popup v-model="showPicker">
            <div class="cate">
                <md-cell-item class="link" v-for="(item, key) in categories" :title="item.title" @click="fetchData(item.link)" :key="key" />
            </div>
        </md-popup>
    </div>
</template>

<script>
import { Popup, CellItem } from 'mand-mobile';
import Vue from 'vue';
import VueTouch from 'vue-touch';
Vue.use(VueTouch);
VueTouch.config.swipe = {
    direction: 'horizontal'
};
export default {
    name: 'Chapter',
    props: {
        showCategory: {
            type: Boolean,
            default: false
        }
    },
    components: {
        [Popup.name]: Popup,
        [CellItem.name]: CellItem
    },
    data() {
        return {
            url: this.$route.query.link,
            data: {},
            categories: JSON.parse(localStorage.getItem('category')),
            chapterIndex: this.$route.query.key,
            showPicker: false
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
        }
    },
    methods: {
        async fetchData(url) {
            await this.$axios.get(`/chapter?url=${url}`).then(res => {
                this.$emit('changeTitle', res.data.data.title);
                res.data.data.cpContent = res.data.data.cpContent.replace(/\s+/g, '<div class="divider" style="padding: 15px 0;"></div>');
                this.data = res.data.data;
            });
            this.showPicker = false;
        },
        prevChapter() {
            this.chapterIndex = this.chapterIndex > 0 ? this.chapterIndex - 1 : this.chapterIndex;
            this.url = this.categories[this.chapterIndex].link;
            this.$db.setData('current', { chapterIndex: this.chapterIndex });
        },
        nextChapter() {
            this.chapterIndex = this.chapterIndex < this.categories.length ? this.chapterIndex + 1 : this.chapterIndex;
            this.url = this.categories[this.chapterIndex].link;
            this.$db.setData('current', { chapterIndex: this.chapterIndex });
        }
    }
};
</script>

<style scoped lang="scss">
.chapter {
    padding: 15px;
    .cate {
        padding: 15px;
        -webkit-overflow-scrolling: touch;
        overflow-y: scroll;
        max-height: 60vh;
        background-color: #fff;
        .link {
            .md-cell-item-content {
                p {
                    font-size: 24px;
                }
            }
        }
    }
}
</style>
