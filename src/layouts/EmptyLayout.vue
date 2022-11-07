<template>
    <div class="empty-layout">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "EmptyLayout"
}
</script>

<style lang="less" scoped>
.empty-layout {
    min-height: 100vh;
}
</style>