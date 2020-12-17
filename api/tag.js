import { request } from "@/plugins/request.js";
// 获取标签列表
export const getTags = data => {
    return request({
        method: "GET",
        url: "/api/tags",
        data,
    });
};
