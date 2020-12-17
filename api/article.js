import { request } from "@/plugins/request.js";
// 获取文章列表
export const getArticles = params => {
    return request({
        method: "GET",
        url: "/api/articles",
        params,
    });
};
// 获取文章详情
export const getArticle = slug => {
    return request({
        method: "GET",
        url: `/api/articles/${slug}`,
    });
};
// 添加文章
export const postArticles = data => {
    return request({
        method: "POST",
        url: "/api/articles",
        data,
    });
};
// 修改文章
export const putArticle = (slug, data) => {
    return request({
        method: "PUT",
        url: `/api/articles/${slug}`,
        data: data
    });
};
// 删除文章
export const deleteArticle = slug => {
    return request({
        method: "DELETE",
        url: `/api/articles/${slug}`,
    });
};
// 你关注的
export const getYourFeed = params => {
    return request({
        method: "GET",
        url: "/api/articles/feed",
        params,
    });
};
// 添加收藏
export const addFavorite = slug => {
    return request({
        method: "POST",
        url: `/api/articles/${slug}/favorite`,
    });
};
// 取消收藏
export const deleteFavorite = slug => {
    return request({
        method: "DELETE",
        url: `/api/articles/${slug}/favorite`,
    });
};

// 获取文章评论
export const getComments = slug => {
    return request({
        method: "GET",
        url: `/api/articles/${slug}/comments`,
    });
};
// 评论文章
export const setComment = (slug, params) => {
    return request({
        method: "POST",
        url: `/api/articles/${slug}/comments`,
        data: params,
    });
};
// 删除评论
export const deleteComment = (slug, commentId) => {
    return request({
        method: "DELETE",
        url: `/api/articles/${slug}/comments/${commentId}`,
    });
};
// 关注作者
export const setFollow = authorName => {
    return request({
        method: "POST",
        url: `/api/profiles/${authorName}/follow`,
    });
};
// 取消关注
export const deleteFollow = authorName => {
    return request({
        method: "DELETE",
        url: `/api/profiles/${authorName}/follow`,
    });
};