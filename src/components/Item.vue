<template>
    <div class="items">
        <div class="item" v-for="(item, key) in data" :key="key" @click="$_detail(item)">
            <div class="cover">
                <ImageItem v-if="item.cover" :source="item.cover" :alt="item.title" />
            </div>
            <div class="info">
                <header>
                    <h3>{{ item.title }}</h3>
                    <div class="desc">{{ item.shortIntro }}</div>
                </header>
                <div class="detail">
                    <div class="author"><md-icon name="user" size="sm" />{{ item.author }}</div>
                    <div class="tags">
                        <span class="tag">{{ item.majorCate }}</span>
                        <span class="follow">{{ item.latelyFollower | count }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Icon } from 'mand-mobile';
import ImageItem from './ImageItem';
export default {
    name: 'Item',
    components: {
        [Icon.name]: Icon,
        ImageItem
    },
    props: {
        data: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    filters: {
        count(val) {
            return val && val.toString().length >= 5 ? (val / 10000).toFixed(1) + '万人气' : val + '人气';
        }
    },
    methods: {
        async $_detail(obj) {
            await this.$db.setData('current', obj);
            this.$router.push({ name: 'BookDetail', query: { bookid: obj._id } });
        }
    }
};
</script>

<style scoped lang="scss">
.items {
    padding: 15px;
    font-size: 26px;
    .item {
        display: flex;
        margin-bottom: 15px;
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
            padding-left: 15px;
            .desc {
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                opacity: 0.75;
            }
            .detail {
                display: flex;
                justify-content: space-between;
                opacity: 0.75;
                .tag,
                .follow {
                    margin-left: 15px;
                    padding: 5px 10px;
                    border-radius: 15px;
                    background-color: #d6d6d6;
                    font-size: 22px;
                }
            }
        }
    }
}
</style>
