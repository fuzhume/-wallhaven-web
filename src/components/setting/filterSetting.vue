<template>
    <a-modal class="filterSetting" title="过滤器配置" width="720px" :visible="visible" :footer="null" @cancel="hide">
        <a-form-model ref="form" :rules="rules" :model="form" v-if="visible">
            <a-form-model-item label="壁纸分类" prop="categories">
                <a-checkbox-group v-model="form.categories" :options="optionsCategory"></a-checkbox-group>
            </a-form-model-item>
            <a-form-model-item label="受众群体" prop="purity">
                <a-checkbox-group v-model="form.purity" :options="optionsPurity"></a-checkbox-group>
            </a-form-model-item>
            <a-form-model-item label="壁纸方向">
                <a-radio-group v-model="form.direction" :options="optionsDirection"></a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="壁纸尺寸" extra="固定值表示就是这个尺寸！范围值表示大于等于这个尺寸！">
                <a-radio-group v-model="form.size_type" :options="optionsSizeType"></a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="壁纸尺寸">
                <a-radio-group v-model="form.size" :options="optionsSize" @change="handleChangeSize"></a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="设置尺寸" v-show="form.size === 0">
                <a-input-number placeholder="宽度" v-model="form.customSize.width"></a-input-number>
                <a-icon type="plus" style="transform: rotate(45deg); margin:0 .5em"/>
                <a-input-number placeholder="高度" v-model="form.customSize.height"></a-input-number>
            </a-form-model-item>
            <a-form-model-item label="壁纸比例">
                <a-radio-group v-model="form.ratio" :options="optionsRatio" @change="handleChangeRatio"></a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="设置比例" v-show="form.ratio === 0">
                <a-input-number placeholder="宽度" v-model="form.customRatio.x"></a-input-number>
                <a-icon type="plus" style="transform: rotate(45deg); margin:0 .5em"/>
                <a-input-number placeholder="高度" v-model="form.customRatio.y"></a-input-number>
            </a-form-model-item>
            <a-form-model-item label="主色调">
                <div class="color-list">
                    <a-tooltip title="不限制">
                        <div :class="['color-block',form.color === '' ? 'active':null]" @click="form.color = ''">
                            <div class="color" style="text-align: center;">
                                <a-icon type="question"/>
                            </div>
                        </div>
                    </a-tooltip>
                    <template v-for="(opt,o) in optionsThemeColor">
                        <div :class="['color-block',opt.value === form.color ? 'active':null]" :key="o" @click="form.color = opt.value;">
                            <div class="color" :style="{backgroundColor: `#${opt.value}`}"></div>
                        </div>
                    </template>
                </div>
            </a-form-model-item>
            <a-form-model-item label="排序方式">
                <a-space>
                    <a-select v-model="form.sorting" :options="optionsSorting" style="width: 100px;"></a-select>
                    <a-select v-model="form.order" :options="optionsOrder" style="width: 150px;"></a-select>
                </a-space>
            </a-form-model-item>
            <a-form-model-item :wrapperCol="{style: {marginLeft: '5em'}}">
                <a-space>
                    <a-button type="primary" icon="check" @click="handleSave">保存配置</a-button>
                    <template v-if="layout === 'index'">
                        <a-button icon="delete" @click="handleRemove">删除配置</a-button>
                    </template>
                    <template v-else>
                        <a-button icon="reload" @click="handleFilter">仅过滤壁纸</a-button>
                    </template>
                </a-space>
            </a-form-model-item>
        </a-form-model>
    </a-modal>
</template>

<script>
import {optionsCategory, optionsDirection, optionsOrder, optionsPurity, optionsRatio, optionsSize, optionsSizeType, optionsSorting, optionsThemeColor} from "@/options/query";
import {mapGetters, mapMutations} from "vuex";
import {defaultFilterSetting} from "@/config/config";

export default {
    name: "filterSetting",
    data() {
        return {
            optionsThemeColor,
            optionsCategory,
            optionsPurity,
            optionsSize,
            optionsSizeType,
            optionsDirection,
            optionsRatio,
            optionsSorting,
            optionsOrder,
            visible: false,
            rules: {
                categories: [
                    {required: true, message: '分类最少选择1个！', trigger: 'change'},
                ],
                purity: [
                    {required: true, message: '受众群体最少选择1个！', trigger: 'change'},
                ]
            },
            form: {}
        }
    },
    computed: {
        ...mapGetters("wallpaper", ["filterSetting"])
    },
    methods: {
        ...mapMutations("wallpaper", ["setFilterSetting"]),
        reset() {
            this.form = defaultFilterSetting;
        },
        show() {
            this.reset();

            const {filterSetting} = this;
            if (filterSetting) this.form = filterSetting;

            this.visible = true;
        },
        hide() {
            this.visible = false;
        },
        handleChangeRatio() {
            const val = this.form.ratio;

            if (val !== 0) {
                for (const opt of optionsRatio) {
                    if (opt.value === val && opt.meta) {
                        const {value} = opt.meta;
                        const values = value.split("x");
                        this.form.customRatio = {
                            x: values[0],
                            y: values[1]
                        };
                        break;
                    }
                }
            }
        },
        handleChangeSize() {
            const val = this.form.size;

            if (val !== 0) {
                for (const opt of optionsSize) {
                    if (opt.value === val && opt.meta) {
                        const {value} = opt.meta;
                        const values = value.split("x");
                        this.form.customSize = {
                            width: values[0],
                            height: values[1]
                        };
                        break;
                    }
                }
            }
        },
        handleFilter() {
            this.hide();
            this.$bus.$emit("save-config", this.form);
        },
        handleRemove() {
            this.$confirm({
                title: "删除确认",
                content: "是否要删除自定义配置？删除后将使用默认配置！",
                onOk: () => {
                    this.setFilterSetting(null);
                    this.$message.success("已恢复默认设置");
                    this.handleFilter();
                }
            })
        },
        handleSave() {
            this.$refs.form.validate((ok) => {
                if (ok) {
                    this.setFilterSetting(this.form);
                    this.$message.success("保存成功");
                    this.handleFilter();
                }
            })
        }
    },
    props: {
        layout: {
            type: String,
            default() {
                return "result";
            }
        }
    }
}
</script>

<style lang="less" scoped>
.filterSetting {
    /deep/ .ant-form-item {
        display: flex;

        .ant-form-item-label {
            flex-shrink: 0;
            width: 5em;
        }

        .ant-form-item-control-wrapper {
            padding-left: 15px;
            flex: 1;
        }
    }

    .color-list {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        padding-top: 10px;
        line-height: normal;

        .color-block {
            line-height: inherit;
            display: inline-block;
            border: 2px solid #dedede;
            margin-bottom: 5px;
            margin-right: 5px;
            border-radius: 3px;
            background-color: #f8f8f8;
            padding: 3px;
            height: 30px;
            width: 50px;

            &.active {
                border-color: #1890ff;
            }

            .color {
                display: inline-block;
                width: 100%;
                height: 100%;
                border-radius: 2px;
            }
        }
    }
}
</style>