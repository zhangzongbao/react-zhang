import NavigationComponent from '@/layouts/components/Navigation';
import { Outlet } from '@umijs/max';
import { App, ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

/*
* 如果 global.less 里面用到的var变量在这里被改变了 global那里需要手动改一遍
* 有俩中方法
* 第一种：直接手动改 global.less 里面的变量 保持一致
* 第二种：用那面的函数 来改变 （好处是 该变的东西写在一起）
  const t: any = theme.useToken().token;

  useEffect(() => {
    const r:any = document.querySelector(':root');
    function myFunction_get(key: string) {
      return getComputedStyle(r).getPropertyValue(key);
    }
    function myFunction_set(key: string, value: string) {
      r.style.setProperty(key, value);
    }

    myFunction_set('--color-success', t.colorSuccess)
    myFunction_set('--color-primary', t.colorPrimary)
    myFunction_set('--color-white', t.colorBgBase)
    myFunction_set('--color-error', t.colorError)
    myFunction_set('--color-warning', t.colorWarning)
    myFunction_set('--color-bg-layout', t.colorBgLayout)
    myFunction_set('--color-bg-primary', t.colorPrimaryBg)
    myFunction_set('--color-text-100', t.colorTextBase)
    myFunction_set('--color-text-85', t.colorText)
    myFunction_set('--color-text-65', t.colorTextSecondary)
    myFunction_set('--color-text-45', t.colorTextTertiary)
    myFunction_set('--color-text-25', t.colorTextQuaternary)
    myFunction_set('--color-text-15', t.colorFill)
    myFunction_set('--color-text-06', t.colorFillSecondary)
    myFunction_set('--color-text-04', t.colorFillTertiary)
    myFunction_set('--color-text-02', t.colorFillQuaternary)

  }, [])
* */

const BaseLayout = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <App>
        <Outlet />

        <NavigationComponent />
      </App>
    </ConfigProvider>
  );
};

export default BaseLayout;
