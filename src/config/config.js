const defaultCustomSetting = {
    overwriteApiUrl: process.env.VUE_APP_API_BASE_URL,
    theme: "theme-default",
    indexScaleRatio: 1.5,
    systemName: process.env.VUE_APP_SYSTEM_NAME,
    indexBgImage: ""
};

const defaultFilterSetting = {
    "order": "desc",
    "sorting": "favorites",
    "categories": [
        100,
        10
    ],
    "purity": [
        100
    ],
    "size": 1,
    "ratio": 1,
    "color": "",
    "size_type": 1,
    "direction": "landscape",
    "customSize": {
        "width": window.screen.width,
        "height": window.screen.height
    },
    "customRatio": {
        "x": 16,
        "y": 9
    }
};

export {
    defaultCustomSetting,
    defaultFilterSetting
}