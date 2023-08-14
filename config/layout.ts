import { Settings } from '@ant-design/pro-components';

const layout: Settings & {
  pwa?: boolean;
  logo?: string;
} = {
  menu: {
    locale: false,
  },
  pwa: false,
  title: '小爱中心',
  iconfontUrl: 'https://cdn.oss.wingwell.cloud/pic/platform/iconfont.js',
};

export default layout;
