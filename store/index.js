const cookieParser = process.server ? require('cookieparser') : undefined

// 在服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，务必要把 state 定义成一个函数，韩慧数据对象
export const state = () => {
    return {
        user: null
    }   
}

export const mutations = {
    setUser (state, data) {
        state.user = data
    },
    logout(state) {
        state.user = null
    }
}

export const actions = {
    /**
     * nuxtServerInit 是一个特殊的 actions
     * 这个 actions 只会在服务端渲染时调用
     * 作用： 初始化容器数据，传递数据给客户端使用
     */
    nuxtServerInit({commit}, {req}) {
        let user = null
        if (req.headers.cookie) {
            const parsed = cookieParser.parse(req.headers.cookie)
            try {
                user = JSON.parse(parsed.user)
            } catch (error) {
                
            }
            commit('setUser', user)
        }
    }
}