import EmptyLayout from "@/layouts/EmptyLayout";
import ResultLayout from "@/layouts/ResultLayout";

export default [
    {
        path: '/',
        component: EmptyLayout,
        redirect: {
            path: "/index"
        },
        children: [
            {
                path: 'index',
                meta: {
                    title: "搜索壁纸"
                },
                component: () => import("@/pages/index/index")
            }
        ]
    },
    {
        path: '/wallpaper',
        component: ResultLayout,
        redirect: {
            path: "/"
        },
        children: [
            {
                path: 'latest',
                meta: {
                    title: "最新上传"
                },
                component: () => import("@/pages/queryResult/queryResult")
            },
            {
                path: 'top',
                meta: {
                    title: "排行榜"
                },
                component: () => import("@/pages/queryResult/queryResult")
            },
            {
                path: 'random',
                meta: {
                    title: "随机壁纸"
                },
                component: () => import("@/pages/queryResult/queryResult")
            },
            {
                path: 'search',
                meta: {
                    title: "搜索结果"
                },
                component: () => import("@/pages/queryResult/queryResult")
            }
        ]
    }
]