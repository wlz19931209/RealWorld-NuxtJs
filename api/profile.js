import { request } from "@/plugins/request.js";
// 按名称获取用户信息
export const getProfile = username => {
    return request({
        method: 'GET',
        url: `api/profiles/${username}`
    })
}