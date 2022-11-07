import axios from "axios";
import Cookie from "js-cookie";

// 跨域认证信息 header 名
const xsrfHeaderName = "Authorization";

const instance = axios.create();
instance.defaults.timeout = 1000 * 10;
instance.defaults.withCredentials = false;
instance.defaults.xsrfHeaderName = xsrfHeaderName;
instance.defaults.xsrfCookieName = xsrfHeaderName;

/**
 * 请求拦截
 */
instance.interceptors.request.use(
    (config) => {
        return config;
    }
);
/**
 * 返回报文拦截
 */
instance.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            if (response.data.code === 200) {
                return response.data;
            } else {
                return Promise.reject(response.data.msg);
            }
        }
        return Promise.reject(response.statusText);
    }
);

// 认证类型
const AUTH_TYPE = {
    BEARER: "Bearer",
};

// http method
const METHOD = {
    GET: "get",
    POST: "post"
};

/**
 * axios请求
 * @param url 请求地址
 * @param method {METHOD} http method
 * @param params 请求参数
 * @returns {Promise<AxiosResponse<T>>}
 */
async function request(url, method, params, config) {
    switch (method) {
        case METHOD.GET:
            return instance.get(url, {params, ...config});
        case METHOD.POST:
            return instance.post(url, params, config);
        default:
            return instance.get(url, {params, ...config});
    }
}

/**
 * 设置认证信息
 * @param auth {Object}
 * @param authType {AUTH_TYPE} 认证类型，默认：{AUTH_TYPE.BEARER}
 */
function setAuthorization(auth, authType = AUTH_TYPE.BEARER) {
    switch (authType) {
        case AUTH_TYPE.BEARER:
            Cookie.set(xsrfHeaderName, "Bearer " + auth.token, {expires: auth.expireAt});
            break;
        default:
            break;
    }
}

/**
 * 移出认证信息
 * @param authType {AUTH_TYPE} 认证类型
 */
function removeAuthorization(authType = AUTH_TYPE.BEARER) {
    switch (authType) {
        case AUTH_TYPE.BEARER:
            Cookie.remove(xsrfHeaderName);
            break;
        default:
            break;
    }
}

/**
 * 检查认证信息
 * @param authType
 * @returns {boolean}
 */
function checkAuthorization(authType = AUTH_TYPE.BEARER) {
    switch (authType) {
        case AUTH_TYPE.BEARER:
            if (Cookie.get(xsrfHeaderName)) {
                return true;
            }
            break;
    }
    return false;
}

export {METHOD, AUTH_TYPE, request, setAuthorization, removeAuthorization, checkAuthorization, xsrfHeaderName};
