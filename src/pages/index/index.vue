<template>
    <div class="index">
        <filter-setting ref="filter-setting" layout="index"></filter-setting>
        <div class="toolbar">
            <a-tooltip title="过滤配置" placement="right">
                <a-button icon="search" @click="$refs['filter-setting'].show()"></a-button>
            </a-tooltip>
        </div>
        <div class="wrapper">
            <h1 class="logo">{{ systemName }}</h1>
            <div class="form">
                <search-wallpaper size="large"></search-wallpaper>
            </div>
            <div class="type-list">
                <template v-for="(nav,n) in optionsNav">
                    <router-link :to="nav.meta.to" class="type" :key="n">
                        <i :class="nav.meta.icon"></i>
                        <span class="name">{{ nav.label }}</span>
                    </router-link>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import {optionsNav} from "@/options/nav";
import SearchWallpaper from "@/components/form/searchWallpaper";
import {mapGetters} from "vuex";
import FilterSetting from "@/components/dialog/filterSetting";

export default {
    name: "index",
    components: {FilterSetting, SearchWallpaper},
    computed: {
        ...mapGetters("wallpaper", ["settingSystem"]),

        systemName() {
            // eslint-disable-next-line no-undef
            return customConfig.systemName || process.env.VUE_APP_SYSTEM_NAME
        }
    },
    data() {
        return {
            optionsNav
        }
    },
}
</script>

<style lang="less" scoped>
.index {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    .toolbar {
        display: flex;
        flex-direction: column;
        cursor: pointer;
        position: fixed;
        z-index: 1;
        top: 30px;
        left: 30px;
        opacity: 0.5;
        transition: .2s;

        /deep/ .ant-btn {
            & + .ant-btn {
                margin-top: 5px;
            }
        }

        &:hover {
            opacity: 1;
        }
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: .2s;
        transform: scale(1.5);

        .logo {
            font-size: 30px;
            font-weight: bold;
        }

        .form {
            padding: 15px 0;
            width: 100%;
            max-width: 20%;
            min-width: 300px;
        }

        .type-list {
            display: flex;
            align-items: center;
            justify-content: center;

            .type {
                cursor: pointer;
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100px;
                height: 100px;
                transition: .2s;
                color: #555;

                &:hover {
                    color: #40a9ff;
                }

                .iconfont {
                    font-size: 32px;
                }

                .name {
                    font-size: 14px;
                }
            }
        }
    }
}
</style>