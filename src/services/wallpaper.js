import {METHOD, request} from "@/utils/request";
import {api} from "@/services/api";

/**
 * 获取最新上传的壁纸列表
 * @param queryWhere
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function getLatestWallpaperList(queryWhere = {}) {
    return request(api.latest, METHOD.GET, queryWhere);
}

/**
 * 获取热门的壁纸列表
 * @param queryWhere
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function getHotWallpaperList(queryWhere = {}) {
    return request(api.hot, METHOD.GET, queryWhere);
}

/**
 * 获取排行榜的壁纸列表
 * @param queryWhere
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function getTopWallpaperList(queryWhere = {}) {
    return request(api.toplist, METHOD.GET, queryWhere);
}

/**
 * 获取搜索的壁纸列表
 * @param queryWhere
 * @param keyword
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function getSearchWallpaperList(queryWhere = {}, keyword = "") {
    queryWhere.q = keyword;
    return request(api.search, METHOD.GET, queryWhere);
}


/**
 * 获取随机的壁纸列表
 * @param queryWhere
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function getRandomWallpaperList(queryWhere = {}) {
    return request(api.random, METHOD.GET, queryWhere);
}

export default {
    getLatestWallpaperList,
    getHotWallpaperList,
    getTopWallpaperList,
    getSearchWallpaperList,
    getRandomWallpaperList
}