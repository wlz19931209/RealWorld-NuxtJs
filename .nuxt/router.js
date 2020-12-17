import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _639fedba = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _769d6922 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _5c9f2a4e = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _ed8f2480 = () => interopDefault(import('..\\pages\\setting' /* webpackChunkName: "" */))
const _0067e919 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _319ba734 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))
const _fc4afd20 = () => interopDefault(import('..\\pages\\article\\edit' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _639fedba,
    children: [{
      path: "",
      component: _769d6922,
      name: "home"
    }, {
      path: "/login",
      component: _5c9f2a4e,
      name: "login"
    }, {
      path: "/register",
      component: _5c9f2a4e,
      name: "register"
    }, {
      path: "/setting",
      component: _ed8f2480,
      name: "setting"
    }, {
      path: "/profile/:username",
      component: _0067e919,
      name: "profile"
    }, {
      path: "/article/:slug",
      component: _319ba734,
      name: "article"
    }, {
      path: "/editArticle/:slug?",
      component: _fc4afd20,
      name: "editArticle"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
