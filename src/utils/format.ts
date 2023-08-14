import { clearUserDetail, goLoginPage } from '@/services/UserController';
import { message, Modal } from 'antd';

// api报错提示格式化
export function apiErrorTip(res: any) {
  const type = res.data?.data?.exceptionType || 0;
  // 500 和 default 一致
  switch (true) {
    case type === 403:
      clearUserDetail();
      goLoginPage();
      break;
    case type >= 600 && type < 700:
      Modal.error({
        title: res.data.data.message,
        content: `错误编号：${res.data.data.debugCode}`,
        okText: '知道了',
      });
      break;
    case type >= 700 && type < 800:
      message.error(res.data.data.message).then();
      break;
    default:
      message.error(res?.data?.message || res?.data?.msg || JSON.stringify(res.data)).then();
  }
}
