import { request } from '@umijs/max';

// 添加任务快速访问链接
export async function CreateSitePageQuickLink(pageId: string) {
  return request(`/api/basic/Home/CreateSitePageQuickLink/${pageId}`, { method: 'POST' });
}

// 删除快速访问链接
export async function RemoveQuickLink(linkId: string) {
  return request(`/api/basic/Home/RemoveQuickLink/${linkId}`, { method: 'POST' });
}
