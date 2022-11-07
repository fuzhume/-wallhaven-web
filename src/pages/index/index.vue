<template>
    <div :class="['index',theme]" :style="{backgroundImage: indexBgImage ? `url(${indexBgImage})` : null}">
        <custom-setting ref="custom-setting"></custom-setting>
        <filter-setting ref="filter-setting" layout="index"></filter-setting>
        <div class="toolbar">
            <a-tooltip title="自定义配置" placement="right">
                <a-button icon="setting" @click="$refs['custom-setting'].show()"></a-button>
            </a-tooltip>
            <a-tooltip title="过滤配置" placement="right">
                <a-button icon="search" @click="$refs['filter-setting'].show()"></a-button>
            </a-tooltip>
        </div>
        <div class="wrapper" :style="{transform: `scale(${indexScaleRatio})`}">
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
import FilterSetting from "@/components/setting/filterSetting";
import CustomSetting from "@/components/setting/customSetting";

export default {
    name: "index",
    components: {CustomSetting, FilterSetting, SearchWallpaper},
    computed: {
        ...mapGetters("wallpaper", ["filterSetting", "customSetting"]),
        systemName() {
            const {customSetting} = this;
            if (customSetting && customSetting.systemName) return customSetting.systemName;
            return process.env.VUE_APP_SYSTEM_NAME
        },
        theme() {
            const {customSetting} = this;
            if (customSetting && customSetting.theme) return customSetting.theme;
            return "theme-default";
        },
        indexScaleRatio() {
            const {customSetting} = this;
            if (customSetting && customSetting.indexScaleRatio) return customSetting.indexScaleRatio;
            return 1.5;
        },
        indexBgImage() {
            const {customSetting} = this;
            if (customSetting && customSetting.indexBgImage) return customSetting.indexBgImage;
            return null;
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

    &.theme-default {
        color: #000000;
        background-color: #ffffff;
    }

    &.theme-white {
        color: #ffffff;
        background-color: #000000;
        background-image: linear-gradient(to bottom, #333, #222);
        text-shadow: 0 1px 1px #000000;

        .wrapper {
            .logo {
                color: #ffffff;
            }

            .type-list {
                .type {
                    color: #ffffff;
                }
            }
        }
    }

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