import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import config from "./config";

const router = new VueRouter({
    mode: "hash",
    routes: config
})

export default router;
