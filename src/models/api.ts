import { request } from '@umijs/max';

// 获取用户快速访问链接列表
export async function GetQuickLinkList() {
  return request(`/api/basic/Home/GetQuickLinkList`, { method: 'POST' });
}
