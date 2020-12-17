module.exports = {
    router: {
        extendRoutes(routes, resolve) {
            // 清除默认生成的路由表规则
            routes.splice(0);
            routes.push(
                ...[
                    {
                        path: "/",
                        component: resolve(__dirname, "pages/layout"),
                        children: [
                            {
                                path: "",
                                name: "home",
                                component: resolve(__dirname, "pages/home"),
                            },
                            {
                                path: "/login",
                                name: "login",
                                component: resolve(__dirname, "pages/login"),
                            },
                            {
                                path: "/register",
                                name: "register",
                                component: resolve(__dirname, "pages/login"),
                            },
                            {
                                path: "/setting",
                                name: "setting",
                                component: resolve(__dirname, "pages/setting"),
                            },
                            {
                                path: "/profile/:username",
                                name: "profile",
                                component: resolve(__dirname, "pages/profile"),
                            },
                            {
                                path: "/article/:slug",
                                name: "article",
                                component: resolve(__dirname, "pages/article"),
                            },
                            {
                                path: "/editArticle/:slug?",
                                name: "editArticle",
                                component: resolve(__dirname, "pages/article/edit"),
                            },
                        ],
                    },
                ]
            );
        },
        linkActiveClass: "active",
    },
    // 注册插件
    plugins: ["~/plugins/request.js", "~/plugins/dayjs.js"],
    head: {
        titleTemplate: "Conduit - Nuxt.js",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: "Meta description" },
        ],
    },
    server: {
        host: '0.0.0.0',
        port: 8800
    }
};
