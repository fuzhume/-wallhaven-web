import {defaultCustomSetting, defaultFilterSetting} from "@/config/config";

export default {
    namespaced: true,
    state: {
        filterSetting: null,
        customSetting: null,
    },
    mutations: {
        setFilterSetting(state, filterSetting) {
            if (filterSetting) {
                window.localStorage.setItem(process.env.VUE_APP_FILTER_SETTING_KEY, JSON.stringify(filterSetting));
            } else {
                window.localStorage.removeItem(process.env.VUE_APP_FILTER_SETTING_KEY);
            }
            state.filterSetting = filterSetting;
        },
        setCustomSetting(state, customSetting) {
            if (customSetting) {
                window.localStorage.setItem(process.env.VUE_APP_CUSTOM_SETTING_KEY, JSON.stringify(customSetting));
            } else {
                window.localStorage.removeItem(process.env.VUE_APP_CUSTOM_SETTING_KEY);
            }
            state.customSetting = customSetting;
        }
    },
    getters: {
        filterSetting(state) {
            if (!state.filterSetting) {
                const filterSetting = JSON.parse(window.localStorage.getItem(process.env.VUE_APP_FILTER_SETTING_KEY));
                state.filterSetting = filterSetting || defaultFilterSetting;
            }
            return state.filterSetting;
        },
        customSetting(state) {
            if (!state.customSetting) {
                let customSetting = JSON.parse(window.localStorage.getItem(process.env.VUE_APP_CUSTOM_SETTING_KEY));
                state.customSetting = customSetting || defaultCustomSetting;
            }
            return state.customSetting;
        },
    }
}