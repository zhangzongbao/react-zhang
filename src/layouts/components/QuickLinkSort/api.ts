import { request } from '@umijs/max';

// 删除快速访问链接
export async function RemoveQuickLink(linkId: string) {
  return request(`/api/basic/Home/RemoveQuickLink/${linkId}`, { method: 'POST' });
}

// 保存快速访问链接排序
export async function SaveQuickLinkSorts(data: string[]) {
  return request(`/api/basic/Home/SaveQuickLinkSorts`, { method: 'POST', data });
}
