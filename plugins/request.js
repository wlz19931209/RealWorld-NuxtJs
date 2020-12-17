import axios from "axios";

export const request = axios.create({
    baseURL: "https://conduit.productionready.io/",
});
// 通过插件机制获取到上下文对象（query, params, store, req, res, app... ）
// 插件导出函数必须作为 default 成员
export default ({ store }) => {
    request.interceptors.request.use(
        config => {
            const { user } = store.state;
            if (user && user.token) {
                config.headers.Authorization = `Token ${user.token}`;
            }
            return config;
        },
        err => {
            return Promise.reject(err);
        }
    );
};
