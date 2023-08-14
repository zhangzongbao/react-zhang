/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,title 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @doc https://umijs.org/docs/guides/routes
 * title 有值需要跳转到 其他站点
 */
export default [
  {
    path: '/',
    component: '@/layouts/BaseLayout',
    flatMenu: true,
    routes: [
      {
        name: '医生审核',
        path: '/doctor',
        routes: [
          {
            name: '档案审核',
            path: '/doctor/verify',
            icon: 'icon-xiaoyi-menu-file_review',
            routes: [
              {
                name: '审核工作证明',
                path: '/doctor/verify/workplace',
                component: './DoctorVerifyWorkplace',
                access: 'DoctorVerifyWorkplace',
              },
              {
                name: '审核专业信息',
                path: '/doctor/verify/professional',
                component: './DoctorVerifyProfessional',
                access: 'DoctorVerifyProfessional',
              },
            ],
          },
        ],
      },
      {
        name: '医生管理',
        path: '/physician-management',
        routes: [
          {
            name: '建档客户',
            icon: 'icon-xiaoai-menu-registered_customer',
            path: '/physician-management/client-manage',
            component: './ClientManage',
            access: 'ClientManage',
          },
          {
            name: '建档客户详情',
            path: '/physician-management/client-manage/detail',
            component: './ClientManage/components/Detail',
            hideInMenu: true,
          },
          {
            name: '潜在客户',
            icon: 'icon-xiaoai-menu-potential_customer',
            path: '/physician-management/prospective-customer',
            component: './ProspectiveCustomer',
            access: 'ProspectiveCustomer',
          },
          {
            name: '潜在客户详情',
            path: '/physician-management/prospective-customer/detail',
            component: './ProspectiveCustomer/components/Detail',
            hideInMenu: true,
          },
          {
            name: '全部客户',
            icon: 'icon-xiaoai-menu-potential_customer',
            path: '/physician-management/client-all',
            component: './ClientAll',
            access: 'ClientAll',
          },
          {
            name: '专业人士湖',
            icon: 'icon-xiaoai-menu-professional',
            path: '/physician-management/doctor-lake',
            component: './DoctorLake',
            access: 'DoctorLake',
          },
          {
            name: '建档客户详情',
            path: '/physician-management/client-all/detail',
            component: './ClientAll/components/Detail',
            hideInMenu: true,
          },
          {
            name: '专业人士详情',
            path: '/physician-management/doctor-lake/detail',
            component: './DoctorLake/components/Detail',
            hideInMenu: true,
          },
        ],
      },
      // {
      //   name: '医汇医典',
      //   path: '/yhyd-data',
      //   routes: [
      //     {
      //       name: '关联内容列表',
      //       icon: 'icon-xiaoai-menu-potential_customer',
      //       path: '/yhyd-data/list',
      //       component: './YhydData',
      //       access: 'YhydData',
      //     },
      //   ],
      // },
      {
        name: '403',
        path: '/403',
        component: './403',
        hideInMenu: true,
        headerRender: false,
        layout: false,
      },

      {
        name: '404',
        path: '*',
        component: './404',
        hideInMenu: true,
      },
    ],
  },
];
