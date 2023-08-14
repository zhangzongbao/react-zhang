import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env.ENV': 'dev',
    'process.env.BASE': '/xiaoai',
    'process.env.BASE_URL': 'https://dev.wingwell.cloud/',
  },
  base: '/xiaoai/',
  publicPath: '/xiaoai/',
  proxy: {
    '/api': {
      target: 'https://dev.wingwell.cloud/',
      secure: false,
      changeOrigin: true,
    },
  },
});
