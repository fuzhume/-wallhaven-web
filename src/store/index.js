import Vue from "vue";
import Vuex from "vuex";
import wallpaper from "@/store/modules/wallpaper";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        wallpaper
    }
});

export default store;
