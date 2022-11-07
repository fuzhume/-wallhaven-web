<template>
    <div class="queryResult" @contextmenu="lockPreview = true">
        <template v-if="emptyData">
            <div style="padding: 100px 0;">
                <a-empty>
                    <template slot="image">
                        <img src="@/assets/imgs/ku.png">
                    </template>
                    <template slot="description">
                        <h1>貌似没有找任何壁纸哟！</h1>
                        <p>建议更换关键词或使用英文关键词！缩小检索范围！</p>
                    </template>
                </a-empty>
            </div>
        </template>
        <template v-else>
            <a-row :gutter="10" class="wallpaper-list">
                <a-col :xxl="4" :md="8" :sm="12" :xs="24" v-for="(wallpaper,w) in wallpaperList" :key="w">
                    <a-dropdown :trigger="['contextmenu']">
                        <div class="wallpaper" :style="{backgroundImage: `url(${wallpaper.thumb})`}" @click="handlePreviewImage(wallpaper.url)"></div>
                        <a-menu slot="overlay" v-if="lockPreview" @click="(e)=>{handleMenuClick(e,wallpaper)}">
                            <a-menu-item key="handlePreviewImage">查看壁纸</a-menu-item>
                            <a-menu-item key="copyImageUrl">复制地址</a-menu-item>
                            <a-menu-item key="openNewWindow">新窗口打开</a-menu-item>
                            <a-menu-item key="setIndexBgImage">设为背景图</a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </a-col>
            </a-row>
            <div style="display: flex; justify-content: center; align-items: center; height: 100px;">
                <a-spin :spinning="loading" tip="玩命加载壁纸中"></a-spin>
            </div>
        </template>
    </div>
</template>

<script>
import {getHotWallpaperList, getLatestWallpaperList, getRandomWallpaperList, getSearchWallpaperList, getTopWallpaperList} from "@/services/wallpaper";
import nprogress from "@/utils/nprogress";
import {throttle} from "lodash";
import {mapGetters, mapMutations} from "vuex";

export default {
    name: "queryResult",
    data() {
        return {
            finished: false,
            lockPreview: false,
            loading: true,
            wallpaperList: [],
            page: 1,
            filterWhere: {}
        }
    },
    created() {
        const {filterSetting} = this;
        if (filterSetting) this.filterWhere = filterSetting;

        window.addEventListener('scroll', this.listenBottomOut);
        this.$bus.$on("reload-page", this.reload);
        this.$bus.$on("save-config", this.handleFilterWallpaper);

        this.reload();
    },
    destroyed() {
        window.removeEventListener('scroll', this.listenBottomOut, false);

        this.$bus.$off("reload-page", this.reload);
        this.$bus.$off("save-config", this.handleFilterWallpaper);
    },
    computed: {
        ...mapGetters("wallpaper", ["filterSetting", "customSetting"]),
        formatFilterWhere() {
            const {filterWhere} = this;
            const query = {};
            const {categories, purity, size_type, customSize, direction, customRatio, color, sorting, order} = filterWhere;

            // 分类
            if (categories) {
                let categories_value = 0;
                for (const val of categories) {
                    categories_value += val;
                }
                query.categories = categories_value.toString().padStart(3, "0");
            }

            // 受众群体
            if (purity) {
                let purity_value = 0;
                for (const val of purity) {
                    purity_value += val;
                }
                query.purity = purity_value.toString().padStart(3, "0");
            }


            // 尺寸
            if (size_type && customSize) {
                switch (size_type) {
                    case 1:
                        query.atleast = [customSize.width, customSize.height].join("x");
                        break;
                    case 2:
                        query.resolutions = [customSize.width, customSize.height].join("x");
                        break
                }
            }

            // 比例配置
            query.ratios = [];

            // 方向
            if (direction) {
                query.ratios.push(direction);

                // 比例
                if (customRatio) {
                    let arr = [customRatio.x, customRatio.y];
                    if (direction !== "landscape") arr = arr.reverse();
                    query.ratios.push(arr.join("x"));
                }

                // 处理比例
                query.ratios = query.ratios.join(",");
            }


            // 颜色
            if (color) query.colors = color;

            // 排序
            if (sorting) query.sorting = sorting;

            // 规则
            if (order) query.order = order;

            return query;
        },
        emptyData() {
            const {page, wallpaperList, finished} = this;
            return page === 1 && wallpaperList.length === 0 && finished;
        },
        keyword() {
            return this.$route.query.keyword || "";
        },
        action() {
            return this.$route.path.replace(/^\/wallpaper\//, "");
        }
    },
    watch: {
        $route: {
            immediate: false,
            handler() {
                this.reload();
            }
        }
    },
    methods: {
        ...mapMutations("wallpaper", ["setFilterSetting", "setCustomSetting"]),
        /**
         * 更新过滤条件
         * @param data
         */
        handleFilterWallpaper(data) {
            this.filterWhere = data;
            this.reload();
        },
        /**
         * 重新加载数据
         */
        reload() {
            this.page = 1;
            this.wallpaperList = [];
            this.getData();
        },
        /**
         * 图片右键菜单
         * @param r
         */
        handleMenuClick(r, wallpaper) {
            const {key} = r;
            const {url} = wallpaper;

            switch (key) {
                case "handlePreviewImage":
                    this.handlePreviewImage(url);
                    break;
                case "openNewWindow":
                    this.openNewWindow(url);
                    break;
                case "copyImageUrl":
                    this.copyImageUrl(url);
                    break;
                case "setIndexBgImage":
                    this.setIndexBgImage(url);
                    break;
            }
        },
        /**
         * 设置主页背景图
         * @param url
         * @returns {Promise<void>}
         */
        async setIndexBgImage(url) {
            const imgUrl = await this.getImageUrl(url);
            if (imgUrl) {
                const {customSetting} = this;
                customSetting.indexBgImage = imgUrl;
                this.setCustomSetting(customSetting);
            }
        },
        /**
         * 复制壁纸地址到剪贴板
         * @param url
         * @returns {Promise<void>}
         */
        async copyImageUrl(url) {
            const imgUrl = await this.getImageUrl(url);
            if (imgUrl) {
                this.$copyText(imgUrl).then(() => {
                    this.$message.success("复制成功啦！快去使用吧！")
                }, () => {
                    this.$message.error("复制失败！建议更换浏览器后重试！")
                })
            }
        },
        /**
         * 新窗口打开
         * @param url
         * @returns {Promise<void>}
         */
        async openNewWindow(url) {
            const imgUrl = await this.getImageUrl(url);
            if (imgUrl) window.open(imgUrl);
        },
        /**
         * 获取图片的真实url
         * @param imageUrl
         * @returns {Promise<*>}
         */
        async getImageUrl(imageUrl) {
            this.$message.loading({
                content: "获取壁纸地址中，这可能需要一些时间！",
                duration: 0,
            });

            const extensions = ["jpg", "png", "bmp", "jpeg", "webp"];
            let urls = [imageUrl];

            for (const ext of extensions) {
                urls.push(imageUrl.replace(/\.\w+$/, `.${ext}`));
            }

            urls = Array.from(new Set(urls));

            let trueUrl;

            for (const url of urls) {
                const valid = await this.checkImage(url);
                if (valid) {
                    trueUrl = url;
                    break;
                }
            }

            this.$message.destroy();
            if (!trueUrl) this.$message.error("图片地址解析失败！");

            return trueUrl;
        },
        /**
         * 预览图片
         * @param imageUrl
         * @returns {Promise<void>}
         */
        async handlePreviewImage(imageUrl) {
            const {lockPreview} = this;
            if (lockPreview) this.lockPreview = false;

            const imgUrl = await this.getImageUrl(imageUrl);
            if (imgUrl) {
                this.$hevueImgPreview({
                    url: imgUrl,
                    mainBackground: '#000000',
                    controlBackground: "#000000"
                });
            }
        },
        checkImage(imgUrl) {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = imgUrl;
                img.onload = () => {
                    resolve(imgUrl);
                };
                img.onerror = () => {
                    resolve(null);
                };
            })
        },
        listenBottomOut() {
            const {scrollTop, clientHeight, scrollHeight} = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight) {
                this.page++;
                this.loadMore();
            }
        },
        loadMore: throttle(function () {
            this.getData();
        }, 1000 * 1.5),
        getData() {
            const {action, formatFilterWhere, wallpaperList, page, keyword} = this;

            nprogress.start();

            this.loading = true;

            let queryWhere = {...{page}, ...formatFilterWhere}

            let req;

            switch (action) {
                case "latest":
                    req = getLatestWallpaperList(queryWhere);
                    break;
                case "top":
                    req = getTopWallpaperList(queryWhere);
                    break;
                case "hot":
                    req = getHotWallpaperList(queryWhere);
                    break;
                case "random":
                    req = getRandomWallpaperList(queryWhere);
                    break;
                case "search":
                    req = getSearchWallpaperList(queryWhere, keyword);
                    break;
            }

            req.then((res) => {
                const {data} = res.data;
                if (data.length === 0) this.finished = true;
                this.wallpaperList = [...wallpaperList, ...data];
                this.$nextTick(() => {
                    nprogress.end();
                    this.loading = false;
                })
            }).catch(() => {
                this.finished = true;
            }).finally(() => {
                nprogress.end();
                this.loading = false;
            })
        }
    }
}
</script>

<style lang="less" scoped>
.queryResult {
    .wallpaper-list {
        .wallpaper {
            cursor: pointer;
            width: 100%;
            height: 200px;
            background-size: cover;
            border-radius: 5px;
            margin-bottom: 10px;
            transition: .2s;
        }
    }
}
</style>