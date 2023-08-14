// 运行时配置
import HeaderTitleComponent from '@/components/HeaderTitle';
import MenuItemComponent from '@/components/MenuItem';
// import RightContentRenderComponent from '@/components/RightContentRender';
import NotAuthPage from '@/pages/403';
import { getUserDetail, goLoginPage, setUserDetail } from '@/services/UserController';
import { apiErrorTip } from '@/utils/format';
import header from '@/utils/header';
import { MenuDataItem } from '@ant-design/pro-layout';
// import { BaseMenuProps } from '@ant-design/pro-layout/lib/components/SiderMenu/BaseMenu';
import { history, matchRoutes, RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import dayjs from 'dayjs'; //加载中文语言包
import 'dayjs/locale/zh-cn';
import React from 'react';

// 设置dayjs 语言
dayjs.locale('zh-cn'); //全局使用

// 如果是开发环境 设置 user token userId 要对应
if (process.env.NODE_ENV === 'development') {
  const user = {
    showHomeKpi: true,
    siteList: [
      {
        pageIds: ['DoctorVerifyProfessional', 'DoctorVerifyWorkplace', 'ProspectiveCustomer', 'ClientManage', 'DoctorLake', 'ClientAll', 'YhydData'],
        siteId: 'WingWell.XiaoAi.WebApp',
        siteName: '小爱中心',
        sort: 8041,
        systemId: 'XiaoAi',
      },
    ],
    token: {
      value: '24b5d7c7ed484cd0ad8f39f9cb862360',
      expireTime: dayjs().unix() + 259200,
    },
    user: {
      avatarUrl: 'https://data.oss.wingwell.cloud/516f/20220918060403/vj9oum8jhh0k?x-oss-process=style/avatar',
      gender: '',
      isDeveloper: false,
      mobile: '18054054306',
      nickName: '黄小梦',
      unionId: 'oK_8h6bkMU10JrGOCN_AzKmkq5NU',
      userAccount: 'luke',
      userId: 'F1D996E52B2A4997A3937B0B64F1F4FE',
      userName: '陆维',
    },
    userId: 'F1D996E52B2A4997A3937B0B64F1F4FE',
  };

  if (process.env.ENV === 'sit') {
    user.userId = '0AFD7C5B6B694752989478C597CE315F';
    user.user.userId = '0AFD7C5B6B694752989478C597CE315F';
    user.token.value = '54f00d26467544558569df7b91291386';
  }
  setUserDetail(user);
}

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<Home.login_res | undefined> {
  // 在这里处理登录逻辑 localStorage 在无痕浏览是没有用的 所以需要额外登录
  const user = getUserDetail();
  console.log(user, 'app-user');

  if (user) {
    return user;
  } else {
    goLoginPage();
    return undefined;
  }
}

console.log(`当前运行在${process.env.ENV}环境中`);

// 配置请求拦截 响应拦截
export const request: RequestConfig = {
  baseURL: process.env.NODE_ENV === 'development' ? '' : process.env.BASE_URL,
  timeout: 60000,
  requestInterceptors: [
    (config: any) => {
      config.headers.Authorization = header.getHeader();
      return config;
    },
  ],
  responseInterceptors: [
    (res: any): any => {
      if (res.status < 400) {
        /**
         * 从这一层开始就是与后端约定返回值的地方
         * 但是后端往往并不统一规范 这里就需要额外留出口子 对特殊请求不进行拦截
         * - 比如 请求 json 不拦截
         * - other 其他的 自行往里面加
         */
        if (res.config.url.includes('http')) {
          // 直接放行 不做处理
        } else {
          if (res.data.status) {
            res.data = res.data.data;
          } else {
            throw res;
          }
        }
      } else {
        throw res;
      }
      return res;
    },
  ],
  errorConfig: {
    errorHandler: (error) => apiErrorTip(error),
  },
};

export function onRouteChange({ clientRoutes, location, routes }: any) {
  const route: any = matchRoutes(clientRoutes, location.pathname, process.env.BASE)?.pop()?.route;
  const userdetail = getUserDetail();
  const site = userdetail?.siteList?.find((site: Home.site) => site.systemId === process.env.SYSTEMID);

  if (!site?.pageIds.length && !userdetail?.user.isDeveloper && route.path !== '/403') {
    history.replace('/403');
    return;
  }

  if (site && route && (!(route.access && site.pageIds.includes(route.access)) || route.isLayout)) {
    const aimRote: any = Object.values(routes).find((item: any) => item.path.includes(route.path) && site.pageIds.includes(item.access));
    if (aimRote) history.replace(aimRote.path);
  }
}

export const layout: RunTimeLayoutConfig = () => {
  return {
    // navTheme: 'realDark', // 暗黑主题配色
    layout: 'mix',
    splitMenus: true, // 菜单拆分
    logo: (
      <svg className="icon" aria-hidden="true">
        <use xlinkHref="#icon-xiaoyi-page-header" />
      </svg>
    ),
    // rightContentRender: () => <RightContentRenderComponent />,
    // menuItemRender: (itemProps: MenuDataItem, defaultDom: React.ReactNode, props: BaseMenuProps) => (
    //   <MenuItemComponent itemProps={itemProps} defaultDom={defaultDom} props={props} />
    // ),
    onMenuHeaderClick: (e: any) => e.preventDefault(),
    headerTitleRender: HeaderTitleComponent,
    rightContentRender: false,
    menuItemRender: (itemProps: MenuDataItem, defaultDom: React.ReactNode, props: any) => (
      <MenuItemComponent itemProps={itemProps} defaultDom={defaultDom} props={props} />
    ),
    onPageChange: () => {
      if (!getUserDetail()) goLoginPage();
    },
    token: {
      header: {
        heightLayoutHeader: 48,
        colorTextMenuSelected: 'var(--color-primary)',
      },
      sider: {
        colorTextMenuSelected: 'var(--color-primary)',
        colorBgMenuItemSelected: 'var(--color-bg-primary)',
      },
      pageContainer: {
        paddingInlinePageContainerContent: 24,
      },
    },
    siderWidth: 210,
    unAccessible: <NotAuthPage />,
  };
};

// 乾坤子应用 导出生命周期
// export const qiankun = {
//   // 初始化调用
//   async bootstrap(props: any) {
//     console.log('bootstrap', props);
//   },
//   // 每次进入调用
//   async mount(props: any) {
//     console.log('mount', props);
//   },
//   // 每次 切出/卸载 调用
//   async unmount (props: any) {
//     console.log('unmount ', props);
//   },
// };
