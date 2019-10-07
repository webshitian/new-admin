import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Index from '@/views/Index'
//注册路由插件
Vue.use(Router)

//创建路由对象
export default new Router({
  //路由地址都是以"#"形式展示
  //mode: 'history'可忽略,默认的声明,作用:去掉路由地址的#,主要是带#号与不带#号的区别
  //http://localhost:8080/#/login
  //http://localhost:8080/login
  mode: 'history',
  //可忽略
  base: process.env.BASE_URL,
  //路由的配置  
  routes: [
    //登录页
    {path:"/login",component:Login},
    //后台首页
    {path:"/",component:Index}
  ]
})
