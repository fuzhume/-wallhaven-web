export default {
    namespaced: true,
    state: {
        config: null,
        settingFilter: null,
        settingSystem: null
    },
    mutations: {
        setSettingFilter(state, settingFilter) {
            if (settingFilter) {
                window.localStorage.setItem(process.env.VUE_APP_SETTING_FILTER, JSON.stringify(settingFilter));
            } else {
                window.localStorage.removeItem(process.env.VUE_APP_SETTING_FILTER);
            }
            state.settingFilter = settingFilter;
        },
        setSettingSystem(state, settingSystem) {
            if (settingSystem) {
                window.localStorage.setItem(process.env.VUE_APP_SETTING_SYSTEM, JSON.stringify(settingSystem));
            } else {
                window.localStorage.removeItem(process.env.VUE_APP_SETTING_SYSTEM);
            }
            state.settingSystem = settingSystem;
        }
    },
    getters: {
        settingFilter(state) {
            if (!state.settingFilter) {
                state.settingFilter = JSON.parse(window.localStorage.getItem(process.env.VUE_APP_SETTING_FILTER));
            }
            return state.settingFilter;
        },
        settingSystem(state) {
            if (!state.settingSystem) {
                state.settingSystem = JSON.parse(window.localStorage.getItem(process.env.VUE_APP_SETTING_SYSTEM));
            }
            return state.settingSystem || {indexScaleRatio: 1.5};
        },
    }
}