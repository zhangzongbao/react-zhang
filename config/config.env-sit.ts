import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env.ENV': 'sit',
    'process.env.BASE': '/xiaoai',
    'process.env.BASE_URL': 'https://sit.wingwell.cloud/',
  },
  base: '/xiaoai/',
  publicPath: '/xiaoai/',
  proxy: {
    '/api': {
      target: 'https://sit.wingwell.cloud/',
      secure: false,
      changeOrigin: true,
    },
  },
});
