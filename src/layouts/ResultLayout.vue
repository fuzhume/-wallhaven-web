<template>
    <a-layout class="result-layout">
        <filter-setting ref="filter-setting"></filter-setting>
        <a-layout-header class="header">
            <div class="logo">
                <router-link to="/">{{ systemName }}</router-link>
            </div>
            <div class="search">
                <a-space>
                    <search-wallpaper :keyword="keyword"></search-wallpaper>
                    <a-button icon="reload" @click="handleReloadPage">刷新</a-button>
                    <a-button icon="setting" @click="handleShowSetting">过滤器</a-button>
                </a-space>
            </div>
            <div class="navs">
                <router-link to="/wallpaper/search">
                    <i class="iconfont icon-sousuo"></i>
                    <span class="name">壁纸搜索</span>
                </router-link>
                <template v-for="(nav,n) in optionsNav">
                    <router-link :to="nav.meta.to" :key="n">
                        <i :class="nav.meta.icon"></i>
                        <span class="name">{{ nav.label }}</span>
                    </router-link>
                </template>
            </div>
        </a-layout-header>
        <a-layout-content class="content">
            <router-view></router-view>
        </a-layout-content>
        <!--        <a-layout-footer class="footer"></a-layout-footer>-->
    </a-layout>
</template>

<script>
import {optionsNav} from "@/options/nav";
import SearchWallpaper from "@/components/form/searchWallpaper";
import FilterSetting from "@/components/dialog/filterSetting";

export default {
    name: "ResultLayout",
    components: {FilterSetting, SearchWallpaper},
    data() {
        return {
            optionsNav,
        }
    },
    computed: {
        systemName() {
            // eslint-disable-next-line no-undef
            return customConfig.systemName || process.env.VUE_APP_SYSTEM_NAME
        },
        isSearchResultUrl() {
            const {path} = this.$route;
            return path === "/wallpaper/search";
        },
        keyword() {
            return this.$route.query.keyword || "";
        }
    },
    methods: {
        handleReloadPage() {
            this.$bus.$emit("reload-page");
        },
        handleShowSetting() {
            this.$refs["filter-setting"].show();
        }
    }
}
</script>

<style lang="less" scoped>
.result-layout {
    min-height: 100vh;
    background-color: transparent;


    .header, .content, .footer {
        background-color: transparent;
        padding: 0 20px;
    }

    .header, .footer {
        height: 60px;
    }

    .header {
        position: sticky;
        top: 0;
        z-index: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f7f7f7;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

        .logo, .search {
            flex-shrink: 0;
        }

        .search {
            padding: 0 30px;
            display: inline-flex;
            justify-content: flex-start;
            align-items: center;
        }

        .logo, .navs {
            a {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                color: #333333;
                height: 60px;
            }
        }

        .logo {
            display: inline-flex;
            justify-content: flex-start;

            a {
                font-size: 20px;
                font-weight: bold;
            }
        }

        .navs {
            flex: 1;
            display: inline-flex;
            justify-content: flex-end;

            a {

                .iconfont {
                    font-size: 20px;
                    margin-right: 5px;
                }

                .name {
                    font-size: 16px;
                }

                &.router-link-active {
                    color: #40a9ff;
                }

                & + a {
                    margin-left: 15px;
                }
            }
        }
    }

    .footer {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .content {
        padding: 20px;
    }
}
</style>