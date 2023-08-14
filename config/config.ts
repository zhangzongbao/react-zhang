import { defineConfig } from '@umijs/max';
import layout from './layout';
import qiankun from './qiankun';
import routes from './routes';

import { theme } from 'antd';
const { defaultAlgorithm, defaultSeed } = theme;
const mapToken = defaultAlgorithm(defaultSeed);

export default defineConfig({
  antd: {},
  access: {},
  define: {
    'process.env.ENV': 'dev',
    'process.env.BASE': '',
    'process.env.BASE_URL': 'https://dev.wingwell.cloud/',
    // 以下是通用的
    'process.env.OSS_URL': 'https://oss.wingwell.cloud',
    'process.env.SYSTEMID': 'XiaoAi',
  },
  esbuildMinifyIIFE: true,
  headScripts: [{ src: 'https://cdn.oss.wingwell.cloud/pic/platform/iconfont.js', defer: true }],
  links: [{ rel: 'icon', href: 'https://ww-cdn.oss-cn-shanghai.aliyuncs.com/pic/platform/webicon.png' }],
  metas: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover',
    },
  ],
  mfsu: {
    shared: {
      react: {
        singleton: true,
      },
    },
  },
  mock: {},
  model: {},
  hash: true, // 打包
  initialState: {},
  proxy: {
    '/api': {
      target: 'https://dev.wingwell.cloud/',
      secure: false,
      changeOrigin: true,
    },
  },
  qiankun,
  request: {},
  layout,
  lessLoader: { modifyVars: mapToken },
  routes,
  npmClient: 'npm',
});
