<template>
    <a-modal class="customSetting" title="自定义配置" width="520px" :visible="visible" :footer="null" @cancel="hide">
        <a-form-model ref="form" :rules="rules" :model="form" v-if="visible">
            <a-form-model-item label="系统名称" >
                <a-input v-model="form.systemName" placeholder="留空则使用默认名称" :maxLength="100" :allowClear="true"></a-input>
            </a-form-model-item>
            <a-form-model-item label="接口地址" extra="修改接口地址需要刷新页面才可生效！">
                <a-input v-model="form.overwriteApiUrl" placeholder="留空则使用默认地址" :maxLength="100" :allowClear="true"></a-input>
            </a-form-model-item>
            <a-form-model-item label="主题色">
                <a-radio-group v-model="form.theme" :options="optionsTheme"></a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="主页缩放">
                <a-slider :min="1" :max="2" :step="0.1" v-model="form.indexScaleRatio"></a-slider>
            </a-form-model-item>
            <a-form-model-item label="背景图">
                <a-input v-model="form.indexBgImage" placeholder="留空则不需要" :maxLength="200" :allowClear="true"></a-input>
            </a-form-model-item>
            <a-form-model-item :wrapperCol="{style: {marginLeft: '5em'}}">
                <a-space>
                    <a-button type="primary" icon="check" @click="handleSave">保存配置</a-button>
                    <a-button icon="delete" @click="handleRemove">删除配置</a-button>
                </a-space>
            </a-form-model-item>
        </a-form-model>
    </a-modal>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import {optionsTheme} from "@/options/customSetting";

export default {
    name: "customSetting",
    data() {
        return {
            optionsTheme,
            visible: false,
            rules: {
                systemName: [
                    {required: true, message: '系统名称不能为空！', trigger: 'change'},
                ],
                overwriteApiUrl: [
                    {required: true, message: '接口地址不能为空！', trigger: 'change'},
                ]
            },
            form: {},
            placeholder: {
                overwriteApiUrl: process.env.VUE_APP_API_BASE_URL
            }
        }
    },
    computed: {
        ...mapGetters("wallpaper", ["customSetting"])
    },
    methods: {
        ...mapMutations("wallpaper", ["setCustomSetting"]),
        reset() {
            this.form = {
                overwriteApiUrl: process.env.VUE_APP_API_BASE_URL,
                theme: "theme-default",
                indexScaleRatio: 1.5,
                systemName: process.env.VUE_APP_SYSTEM_NAME,
                indexBgImage: ""
            };
        },
        show() {
            this.reset();

            const {customSetting} = this;
            if (customSetting) this.form = customSetting;

            this.visible = true;
        },
        hide() {
            this.visible = false;
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
                    this.setCustomSetting(null);
                    this.$message.success("已恢复默认设置");
                    this.handleFilter();
                }
            })
        },
        handleSave() {
            this.$refs.form.validate((ok) => {
                if (ok) {
                    this.setCustomSetting(this.form);
                    this.$message.success("保存成功");
                    this.handleFilter();
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.customSetting {
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