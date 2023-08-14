import { request } from '@umijs/max';

// 获取用户功能面板数据
export async function GetFunctionPanelData(): Promise<Navigation.PanelData> {
  return request(`/api/basic/Home/GetFunctionPanelData`, { method: 'POST' });
}

// 添加项目快速访问链接
export async function CreateProjectQuickLink(projectId: string) {
  return request(`/api/basic/Home/CreateProjectQuickLink/${projectId}`, { method: 'POST' });
}

// 添加任务快速访问链接
export async function CreateCampaignQuickLink(campaignId: string) {
  return request(`/api/basic/Home/CreateCampaignQuickLink/${campaignId}`, { method: 'POST' });
}
