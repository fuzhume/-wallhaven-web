// eslint-disable-next-line no-undef
const baseUrl = customConfig.apiUrl || process.env.VUE_APP_API_BASE_URL;

const api = {
    latest: baseUrl + "/wallhaven/latest",
    hot: baseUrl + "/wallhaven/hot",
    toplist: baseUrl + "/wallhaven/toplist",
    random: baseUrl + "/wallhaven/random",
    search: baseUrl + "/wallhaven/search",
}

export {
    baseUrl,
    api
}