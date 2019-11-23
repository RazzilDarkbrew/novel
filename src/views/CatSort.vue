<template>
    <div class="cat-sort">
        <div class="horizon">
            <div class="label" v-for="(item, key) in horizon.items" :key="key" :class="{ active: horizon.current === key }" @click="horizon.current = key">
                {{ item.label }}
            </div>
        </div>
        <div class="vertical">
            <div class="label" v-for="(item, key) in vertical.items" :key="key" :class="{ active: vertical.current === key }" @click="vertical.current = key">
                {{ item.label }}
            </div>
        </div>
        <div class="items">
            <div class="item" v-for="(item, key) in data" :key="key">
                <div class="img">
                    <!--                    <ImageItem v-if="item.cover" :source="item.cover" :alt="item.title" />-->
                </div>
                <div class="detail">
                    <div class="header">
                        <h3>{{ item.title }}</h3>
                        <div class="desc">{{ item.shortIntro }}</div>
                    </div>
                    <div class="info">
                        <span><Icon name="user" size="sm" />{{ item.author }}</span
                        ><span>{{ item.majorCate }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Icon } from 'vant';
export default {
    name: 'CatSort',
    data() {
        return {
            data: [],
            horizon: {
                current: 0,
                items: [
                    { name: 0, label: '男生' },
                    { name: 1, label: '女生' }
                ]
            },
            vertical: {
                current: 0,
                items: [
                    { name: 0, label: '最热榜' },
                    { name: 1, label: '潜力榜' },
                    { name: 2, label: '飙升榜' },
                    { name: 3, label: '完结榜' },
                    { name: 4, label: '好评榜' },
                    { name: 5, label: '留存榜' },
                    { name: 6, label: '热搜榜' },
                    { name: 7, label: '经典榜' }
                ]
            }
        };
    },
    created() {
        this.$emit('changeTitle', '分类排行');
    },
    watch: {
        id: {
            handler(val) {
                this.fetchData(val);
            },
            immediate: true
        }
    },
    computed: {
        id() {
            if (this.horizon.current === 0) {
                switch (this.vertical.current) {
                    case 0:
                        return 'dcf689ff585445218abbb23539f23c3c';
                    case 1:
                        return '770626157c3947a2a983a6433ca49820';
                    case 2:
                        return '19c48a03b452464d85c95f168577d97f';
                    case 3:
                        return '23a22accbe064e3b9f04eb1fb3abee03';
                    case 4:
                        return '00bb4cd7c4034e0693ba8d604066394f';
                    case 5:
                        return '20bb08d9d8de4a358e14b047074a4315';
                    case 6:
                        return '6fda0ecb16f54c188bc320ec085e1184';
                    case 7:
                        return 'eb1ab113d65a46bcb05d1e16f3da73f9';
                    default:
                        return 'dcf689ff585445218abbb23539f23c3c';
                }
            } else {
                switch (this.vertical.current) {
                    case 0:
                        return 'a1ee23f52e6447f5af7559ac31f8204b';
                    case 1:
                        return '909e0279f92549fb9820bfaa25121e81';
                    case 2:
                        return 'b0eea34b22644e3a8605e98c8795c018';
                    case 3:
                        return '297ff544f4274b3692f69bf29d0bd7df';
                    case 4:
                        return 'bcf48e77e1da4a58aff8df0d9fe6a6f2';
                    case 5:
                        return '24ef1860f3084c9bb07050de9882bf53';
                    case 6:
                        return '560b927118494ab1ac4c463b608add21';
                    case 7:
                        return 'b1cc92b6219840bebdca4b7cefa2205d';
                    default:
                        return 'a1ee23f52e6447f5af7559ac31f8204b';
                }
            }
        }
    },
    methods: {
        async fetchData(id = 'dcf689ff585445218abbb23539f23c3c') {
            await this.$axios({
                method: 'GET',
                url: '/hot',
                params: {
                    node: id
                }
            }).then(res => {
                if (res.data.result === 1) {
                    res.data.data.map(v => {
                        v.cover = decodeURIComponent(v.cover).replace(/\/\/statics.zhuishushenqi.com\/agent\//g, '');
                    });
                    this.data = res.data.data;
                }
            });
        }
    },
    components: {
        Icon
    },
    beforeRouteLeave(to, from, next) {
        this.bscroll && this.bscroll.destroy();
        this.$toast.clear();
        next();
    }
};
</script>

<style lang="scss" scoped>
.cat-sort {
    padding: 135px 0 0 135px;
    .horizon {
        border-bottom: 1px solid #d1d2d3;
    }
    .horizon,
    .vertical {
        position: fixed;
        display: flex;
        align-items: center;
        width: 100%;
        height: 120px;
        top: 80px;
        left: 0;
        z-index: 99;
        font-size: 28px;
        background-color: #f9fafb;
        color: #666f83;
        .label {
            display: flex;
            position: relative;
            align-items: center;
            justify-content: center;
            flex: 1;
            &.active {
                color: #2f86f6;
            }
        }
    }
    .vertical {
        flex-direction: column;
        padding: 0 15px;
        top: 200px;
        left: 0;
        width: 120px;
        height: calc(100vh - 180px);
        font-size: 24px;
        .label {
            &:after {
                position: absolute;
                display: block;
                content: '';
                bottom: 0;
                left: 0;
                width: 100%;
                height: 1px;
                background-color: #d1d2d3;
            }
        }
    }
    .item {
        display: flex;
        margin-bottom: 15px;
        height: 163px;
        overflow: hidden;
        .img {
            width: 122px;
            height: 163px;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .detail {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 4;
            padding-left: 15px;
            padding-right: 15px;
            font-size: 24px;
            color: #777;
            h3 {
                font-size: 30px;
                color: #333;
            }
            .desc {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .info {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                span:last-child {
                    padding: 2px 6px;
                    border-radius: 8px;
                    background-color: #d6d6d6;
                    font-size: 22px;
                }
            }
        }
    }
}
</style>
