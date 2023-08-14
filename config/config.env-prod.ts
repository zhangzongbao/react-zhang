import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env.ENV': 'prod',
    'process.env.BASE': '/xiaoai',
    'process.env.BASE_URL': 'https://prod.wingwell.cloud/',
  },
  base: '/xiaoai/',
  publicPath: '/xiaoai/',
  proxy: {
    '/api': {
      target: 'https://prod.wingwell.cloud/',
      secure: false,
      changeOrigin: true,
    },
  },
});
