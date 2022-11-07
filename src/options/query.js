const optionsOrder = [
    {
        label: "倒叙（新的靠前）",
        value: "desc"
    },
    {
        label: "正序（旧的靠前）",
        value: "asc"
    }
];

const optionsSorting = [
    {
        label: "相关性",
        value: "relevance"
    },
    {
        label: "纯随机",
        value: "random"
    },
    {
        label: "最新添加",
        value: "date_added"
    },
    {
        label: "最受欢迎",
        value: "views"
    },
    {
        label: "最多收藏",
        value: "favorites"
    },
    {
        label: "综合排名",
        value: "toplist"
    },
    {
        label: "热门榜",
        value: "hot"
    }
]

const optionsThemeColor = [
    {
        "label": "660000",
        "value": "660000"
    },
    {
        "label": "990000",
        "value": "990000"
    },
    {
        "label": "CC0000",
        "value": "cc0000"
    },
    {
        "label": "CC3333",
        "value": "cc3333"
    },
    {
        "label": "EA4C88",
        "value": "ea4c88"
    },
    {
        "label": "993399",
        "value": "993399"
    },
    {
        "label": "663399",
        "value": "663399"
    },
    {
        "label": "333399",
        "value": "333399"
    },
    {
        "label": "0066CC",
        "value": "0066cc"
    },
    {
        "label": "0099CC",
        "value": "0099cc"
    },
    {
        "label": "66CCCC",
        "value": "66cccc"
    },
    {
        "label": "77CC33",
        "value": "77cc33"
    },
    {
        "label": "669900",
        "value": "669900"
    },
    {
        "label": "336600",
        "value": "336600"
    },
    {
        "label": "666600",
        "value": "666600"
    },
    {
        "label": "999900",
        "value": "999900"
    },
    {
        "label": "CCCC33",
        "value": "cccc33"
    },
    {
        "label": "FFFF00",
        "value": "ffff00"
    },
    {
        "label": "FFCC33",
        "value": "ffcc33"
    },
    {
        "label": "FF9900",
        "value": "ff9900"
    },
    {
        "label": "FF6600",
        "value": "ff6600"
    },
    {
        "label": "CC6633",
        "value": "cc6633"
    },
    {
        "label": "996633",
        "value": "996633"
    },
    {
        "label": "663300",
        "value": "663300"
    },
    {
        "label": "000000",
        "value": "000000"
    },
    {
        "label": "999999",
        "value": "999999"
    },
    {
        "label": "CCCCCC",
        "value": "cccccc"
    },
    {
        "label": "FFFFFF",
        "value": "ffffff"
    },
    {
        "label": "424153",
        "value": "424153"
    }
];

const optionsCategory = [
    {
        label: "默认",
        value: 100
    },
    {
        label: "动漫",
        value: 10
    },
    {
        label: "人物",
        value: 1
    }
]

const optionsPurity = [
    {
        label: "祖国的花朵",
        value: 100
    },
    {
        label: "大孩子",
        value: 10
    },
]

const optionsSize = [
    {
        label: "自定义",
        value: 0
    },
    {
        label: "1080P",
        value: 1,
        meta: {
            value: "1920x1080",
        }
    },
    {
        label: "2K",
        value: 2,
        meta: {
            value: "2560x1440"
        }
    },
    {
        label: "4K",
        value: 4,
        meta: {
            value: "3840x2160",
        }
    }
]

const optionsSizeType = [
    {
        label: "固定值",
        value: 1
    },
    {
        label: "范围值",
        value: 2
    },
]

const optionsDirection = [
    {
        label: "横屏（电脑壁纸）",
        value: "landscape"
    },
    {
        label: "竖屏（手机壁纸）",
        value: "portrait"
    },
]

const optionsRatio = [
    {
        label: "自定义",
        value: 0,
        meta: {
            value: ""
        }
    },
    {
        label: "常规（16:9）",
        value: 1,
        meta: {
            value: "16x9"
        }
    },
    {
        label: "带鱼屏（21:9）",
        value: 2,
        meta: {
            value: "21x9"
        }
    },
    {
        label: "头像（1x1)",
        value: 3,
        meta: {
            value: "1x1"
        }
    }
]

export {
    optionsCategory,
    optionsSize,
    optionsSizeType,
    optionsPurity,
    optionsDirection,
    optionsRatio,
    optionsThemeColor,
    optionsSorting,
    optionsOrder
}