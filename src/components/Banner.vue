<template>
    <div class="banner">
        <md-swiper ref="swiper" :is-prevent="false" :useNative-driver="false">
            <md-swiper-item :key="$index" v-for="(item, $index) in data">
                <div class="banner-item" @click="goBook(item)">
                    <img :src="item.img" :alt="item.title" />
                </div>
            </md-swiper-item>
        </md-swiper>
    </div>
</template>

<script>
import { Swiper, SwiperItem } from 'mand-mobile';

export default {
    name: 'Banner',
    components: {
        [Swiper.name]: Swiper,
        [SwiperItem.name]: SwiperItem
    },
    props: {
        data: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    methods: {
        async goBook(obj) {
            await this.$db.setData('current', obj);
            this.$router.push({ name: 'BookDetail', query: { bookid: obj.link } });
        }
    }
};
</script>

<style lang="scss" scoped>
.banner {
    height: 280px;
    img {
        display: block;
        width: 100%;
        height: auto;
    }
}
</style>
