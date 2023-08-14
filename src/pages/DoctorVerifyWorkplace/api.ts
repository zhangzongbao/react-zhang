import { request } from '@umijs/max';

// 获取工作单位认证列表（分页查询）
export async function WorkplaceGridQuery(data: any) {
  // return request(`/api/setting/DoctorVerify/WorkplaceGridQuery`, { method: 'POST', data });
  return request(`/api/xiaoai/doctorVerify/workplaceGridQuery`, { method: 'POST', data });
}

// 获取工作单位认证的审核单据明细
export async function GetWorkplaceModel(verifyId: any) {
  // return request(`/api/setting/DoctorVerify/GetWorkplaceModel/${verifyId}`, { method: 'POST' });
  return request(`/api/xiaoai/doctorVerify/getWorkplaceModel/${verifyId}`, { method: 'POST' });
}

// 获取工作单位认证的审核表单数据
export async function GetWorkplaceApproveForm(verifyId: any) {
  // return request(`/api/setting/DoctorVerify/GetWorkplaceApproveForm/${verifyId}`, { method: 'POST' });
  return request(`/api/xiaoai/doctorVerify/getWorkplaceApproveForm/${verifyId}`, { method: 'POST' });
}

// 提交工作单位认证单据审核【通过】
export async function SubmitWorkplaceApproveForm(data: any) {
  // return request(`/api/setting/DoctorVerify/SubmitWorkplaceApproveForm`, { method: 'POST', data });
  return request(`/api/xiaoai/doctorVerify/submitWorkplaceApproveForm`, { method: 'POST', data });
}

// 提交工作单位认证单据审核【驳回】
export async function RefuseWorkplaceVerify(data: any) {
  // return request(`/api/setting/DoctorVerify/RefuseWorkplaceVerify`, { method: 'POST', data });
  return request(`/api/xiaoai/doctorVerify/refuseWorkplaceVerify`, { method: 'POST', data });
}

// 提交工作单位认证单据审核【取消】
export async function CancelWorkplaceVerify(verifyId: any, data: any) {
  // return request(`/api/setting/DoctorVerify/CancelWorkplaceVerify/${verifyId}`, { method: 'POST', data });
  return request(`/api/xiaoai/doctorVerify/cancelWorkplaceVerify/${verifyId}`, { method: 'POST', data });
}
