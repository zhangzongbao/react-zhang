import { request } from '@umijs/max';

// 【UserToken】获取STS颁发的AccessKey
export async function GetUserTokenStsAccessKey() {
  return request(`/api/basic/Aliyun/GetUserTokenStsAccessKey`, { method: 'POST' });
}
