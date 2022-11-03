<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import nprogress from "./utils/nprogress";

export default {
    metaInfo() {
        const {meta} = this.$route;
        const option = {
            title: process.env.VUE_APP_SYSTEM_VERSION,
            titleTemplate: `${process.env.VUE_APP_SYSTEM_NAME} | %s`
        }

        if (meta && meta.title) option.title = meta.title;

        return option;
    },
    name: 'App',
    components: {},
    mounted() {
        nprogress.start();
        let t = setTimeout(() => {
            clearTimeout(t);
            t = null;
            nprogress.done();
        }, 1000)
    }
}
</script>

<style lang="less">

</style>
