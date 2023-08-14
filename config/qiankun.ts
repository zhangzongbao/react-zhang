/**
 * 脚手架默认按照父应用配置
 * 父应用 需要配置 本文件 路由
 * 子应用 需要配置 本文件 app.tsx
 * 非乾坤 需要配置 本文件
 */

/**
 * 父应用
 * 需要在routes里面配置路由 跳转可以用路由跳转 也可以用组件跳转
 * 子跳父 子跳子 等常见问题 请查阅文档 https://qiankun.umijs.org/zh/faq
 */
// export default {
//   master: {
//     apps: [
//       {
//         name: 'app1',
//         entry: '//localhost:8001',
//         credentials: true,
//       },
//     ],
//   },
// };

/**
 * 子应用
 * 子应用 还需要在app.ts 暴露出乾坤的生命周期
 */
// export default {
//   slave: {},
// }

// 非qiankun应用
export default {
  master: {
    enable: false,
  },
};
