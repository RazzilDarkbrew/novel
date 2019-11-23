<template>
    <div class="category">
        <CellGroup class="content">
            <Cell v-for="(item, key) in data" :title="item.title" :to="{ path: 'chapter', query: item }" :key="key" is-link></Cell>
        </CellGroup>
    </div>
</template>

<script>
import { Cell, CellGroup } from 'vant';
import BScroll from 'better-scroll';
export default {
    name: 'category',
    props: {
        sort: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Cell,
        CellGroup
    },
    data() {
        return {
            data: [],
            error: false
        };
    },
    watch: {
        sort() {
            this.data = this.data.reverse();
        }
    },
    async created() {
        this.bscroll = null;
        await this.fetchData();
    },
    methods: {
        async fetchData() {
            this.error = false;
            await this.$axios.get(`/categories?sourceId=${this.$route.query.sourceId}`).then(res => {
                if (res.data.result === 1) {
                    this.$emit('changeTitle', this.$route.query.title);
                    this.data = res.data.data.chapters;
                    localStorage.setItem('category', JSON.stringify(res.data.data.chapters));
                } else {
                    this.error = true;
                }
            });
            this.$nextTick(() => {
                if (this.bscroll) {
                    this.bscroll.refresh();
                } else {
                    this.bscroll = new BScroll('.category', {
                        scrollY: true,
                        bounceTime: 800,
                        click: true,
                        probeType: 3
                    });
                }
            });
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
.category {
    height: calc(100vh - 44px);
    overflow: hidden;
    .content {
        min-height: calc(100% + 1px);
    }
}
</style>
