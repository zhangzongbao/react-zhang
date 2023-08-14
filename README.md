# README

`@umijs/max` 模板项目，更多功能参考 [Umi Max 简介](https://next.umijs.org/zh-CN/docs/max/introduce)

## 全局 css 说明

- 覆盖 antd 全局样式 在 global.less 顶部
- 重置 html 基本样式 在 global.less 中部
- 全局共用 class 放在 global.less 底部
- 关于颜色尽量使用 global.less 中定义的 如 var 或者未被更改的 v5 默认变量（https://ant.design/docs/react/customize-theme-cn）
- 开发约定：布局尽量使用 flex 弹性布局 尽量减少 float position
- 页面中使用:global 时 要使用页面 class 包裹，避免污染全局 css

## 关于路由

- 为了更好的理解和使用 我们使用配置式
- 关于约定式路由生成嵌套路由的例子https://github.com/umijs/umi/issues/8850#issuecomment-1206194329

## 关于多环境配置

- 参考https://github.com/umijs/umi/discussions/8341
- 需要注意的是 要同时修改 package 文件里面的 scripts 的脚本命令
- cross-env UMI_ENV=uat max dev|build
- config.ts
- config.${UMI_ENV}.ts
- config.${dev | prod | test}.ts
- config.${dev | prod | test}.${UMI_ENV}.ts
- config.local.ts
- 注意：dev | prod | test 是保留字段 最好不要动 所以我们在自己的配置环境前面加前缀 env-xxx

## 关于 document.ejs 的替代实现

- 参考https://github.com/umijs/umi-next/blob/master/examples/boilerplate/plugin.ts

## umi4 是默认页面层级的懒加载

- 所以直接在 src 底下新增 loading.tsx 就可以实现页面切换的菊花效果

## iconfont 在线引入

- headScripts 里面引入 Symbol 在线图标地址
- 在 css 里面 设置下 css 通用类名 .icon { width: 1em; height: 1em; vertical-align: -0.15em; fill: currentColor; overflow: hidden; }
- 具体页面里面使用 \<svg className="icon" aria-hidden="true">\<use xlinkHref='#PdfFilled'/>\</svg>

## 日期组件 抛弃 moment 直接引用 day.js

## 微前端

- 主应用配置 qiankun 配置路由
- 子应用配置 qiankun 导出生命周期函数
- 参考 umi4 umi3 文档按部就班的弄即可

## 微生成器

- https://umijs.org/docs/guides/generator

## .env 文件说明

- 环境变量配置 可以配置端口号等相关信息 https://umijs.org/docs/guides/env-variables#app_root

## request 使用说明

- 最简原则 只配置请求拦截 响应拦截
- 请求拦截 挂鉴权信息
- 响应拦截 做返回的数据处理 和 报错处理
- 具体用的 api 直接导 import { request } from '@umijs/max'; 不做额外封装

## 关于 pc 端布局的思考与指导

- pc 端 使用了俩个 ProComponents 的组件 ProLayout PageContainer
- ProLayout 做了全局的设置 菜单、头部导航（可自定义）、页面跳转监听等
- PageContainer 页面容器 可以配置面包屑 这里建议每个页面单独设置

## 关于 access 的使用

- 只要改变了 initialState access 就会重新初始化 不用自己操作 只用无脑使用
- 使用教程 https://next.umijs.org/docs/max/access

## 菜单逻辑

- 这里结合 access 权限路由 控制菜单的显示影藏
- app,tsx layout splitMenus 这个属性决定是否拆分菜单
- route 配置 title 代表需要导航到新站点
- 后台控制下单的显示隐藏的逻辑就是通过 返回 PagesId 来控制
- 需要把前端 route 的 path、access、name 配置到后台去
- path 如果是新站点 就是配置 title 的值 patn 可以为任何值
- access 就是 padeId 后端返回几个 pageId 那几个页面就可以显示
- name 就是页面标题和菜单名字

## 多级路由发布

- base: '/present/',
- publicPath: '/present/',
- iis webconfig 也需要额外配置

## 本脚手架使用说明

- 改 package 里面的 name 和版本号
- 按照 config/qiankun.ts 的说明 配置项目为乾坤项目还是非乾坤项目
- 更改请求鉴权用的 appKey secret
- 更改 title 名称
- 这个是主应用脚手架的 demo 子应用可以 copy setting

## max 命令行

- https://umijs.org/docs/api/commands
- max lint --fix (可以修复代码的不规范行为)
