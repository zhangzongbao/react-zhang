import { request } from '@umijs/max';

// 保存参数
export async function SaveParaItem(data: any) {
  return request(`/api/setting/ParaSetting/SaveParaItem`, { method: 'POST', data });
}

// 生效系统的全局参数【集采地图】
export async function SaveGlobalParam() {
  return request(`/api/setting/ParaSetting/EffectiveJcmapGlobalParam`, { method: 'POST' });
}
