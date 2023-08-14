import routes from '../config/routes';

export default (initialState: Home.login_res) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://next.umijs.org/docs/max/access
  // 只要全局的 initialState 改变 这个文件会重新执行
  const access: any = {};
  const site = initialState?.siteList?.find((site) => site.systemId === process.env.SYSTEMID);
  if (initialState?.user?.isDeveloper) {
    const flat = (arr: any) =>
      arr.reduce((sum: any, item: any) => [...sum, ...(item.access ? [item.access] : []), ...(item.routes ? flat(item.routes) : [])], []);
    if (site) site.pageIds = flat(routes);
  }
  if (site?.pageIds?.length) site.pageIds.forEach((item) => (access[item] = true));
  return access;
};
