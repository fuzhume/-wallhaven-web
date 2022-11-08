import Vue from "vue";
import Vuex from "vuex";
import wallpaper from "@/store/modules/wallpaper";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        version: process.env.VUE_APP_SYSTEM_VERSION,
    },
    modules: {
        wallpaper
    }
});

export default store;
