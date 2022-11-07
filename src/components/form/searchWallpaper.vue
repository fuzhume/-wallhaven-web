<template>
    <div class="searchWallpaper">
        <a-input-search v-model="queryWhere.keyword" :size="size" placeholder="在壁纸库中搜索" :allowClear="true" @search="handleSearch"></a-input-search>
    </div>
</template>

<script>
export default {
    name: "searchWallpaper",
    data() {
        return {
            queryWhere: {
                keyword: ""
            }
        }
    },
    watch: {
        keyword: {
            immediate: true,
            handler(keyword) {
                this.queryWhere.keyword = keyword;
            }
        }
    },
    methods: {
        handleSearch() {
            this.$router.push({
                path: "/wallpaper/search",
                query: this.queryWhere
            })
        }
    },
    props: {
        size: {
            type: String,
            default() {
                return "default"
            }
        },
        keyword: {
            type: String,
            default() {
                return "";
            }
        }
    }
}
</script>

<style scoped>

</style>