<template>
    <div class="category">
        <md-result-page
            class="customized"
            img-url="//manhattan.didistatic.com/static/manhattan/do1_JX7bcfXqLpStKRv31xlp"
            text="不太确定自己错在了哪里..."
            subtext="要不然刷新试试？"
            v-if="error"
        />
        <md-cell-item v-else v-for="(item, key) in data" :title="item.title" arrow @click="onClick({ item, key })" :key="key" />
    </div>
</template>

<script>
import { Tag, Icon, CellItem, ResultPage } from 'mand-mobile';
export default {
    name: 'category',
    props: {
        sort: {
            type: Boolean,
            default: false
        }
    },
    components: {
        [Tag.name]: Tag,
        [Icon.name]: Icon,
        [CellItem.name]: CellItem,
        [ResultPage.name]: ResultPage
    },
    data() {
        return {
            data: [],
            sourceId: this.$route.query.sourceId,
            error: false
        };
    },
    watch: {
        sourceId: {
            handler(val) {
                this.fetchData(val);
            },
            immediate: true
        },
        sort() {
            this.data = this.data.reverse();
        }
    },
    methods: {
        onClick(obj) {
            this.$db.setData('current', { chapterIndex: obj.key });
            this.$router.push({
                name: 'chapter',
                query: { ...obj.item, ...{ key: obj.key } }
            });
        },
        async fetchData(id) {
            this.error = false;
            await this.$axios.get(`/categories?sourceId=${id}`).then(res => {
                if (res.data.result === 1) {
                    this.$emit('changeTitle', this.$route.query.title);
                    this.data = res.data.data.chapters;
                    localStorage.setItem('category', JSON.stringify(res.data.data.chapters));
                } else {
                    this.error = true;
                }
            });
        }
    }
};
</script>
<style lang="scss">
.category {
    padding: 0 15px;
    background-color: #fff;
    .md-cell-item-content {
        font-size: 26px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
</style>
