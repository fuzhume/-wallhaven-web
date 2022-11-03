<template>
    <div class="index">
        <a-button type="primary" @click="handleClick">按钮</a-button>
    </div>
</template>

<script>
export default {
    name: "index",
    methods: {
        handleClick(){
            this.$message.success("欢迎使用")
        }
    }
}
</script>

<style lang="less" scoped>
.index {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    font-size: 100px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>