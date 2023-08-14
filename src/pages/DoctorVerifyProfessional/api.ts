import { request } from '@umijs/max';

// 获取工作单位认证列表（分页查询）
export async function ProfessionalGridQuery(data: any) {
  // return request(`/api/setting/DoctorVerify/ProfessionalGridQuery`, { method: 'POST', data });
  return request(`/api/xiaoai/doctorVerify/professionalGridQuery`, { method: 'POST', data });
}

// 获取工作单位认证的审核单据明细
export async function GetProfessionalModel(verifyId: any) {
  // return request(`/api/setting/DoctorVerify/GetProfessionalModel/${verifyId}`, { method: 'POST' });
  return request(`/api/xiaoai/doctorVerify/getProfessionalModel/${verifyId}`, { method: 'POST' });
}

// 获取工作单位认证的审核表单数据
export async function GetProfessionalApproveForm(verifyId: any) {
  // return request(`/api/setting/DoctorVerify/GetProfessionalApproveForm/${verifyId}`, { method: 'POST' });
  return request(`/api/xiaoai/doctorVerify/getProfessionalApproveForm/${verifyId}`, { method: 'POST' });
}

// 提交工作单位认证单据审核【通过】
export async function SubmitProfessionalApproveForm(data: any) {
  // return request(`/api/setting/DoctorVerify/SubmitProfessionalApproveForm`, { method: 'POST', data });
  return request(`/api/xiaoai/doctorVerify/submitProfessionalApproveForm`, { method: 'POST', data });
}

// 提交工作单位认证单据审核【驳回】
export async function RefuseProfessionalVerify(data: any) {
  // return request(`/api/setting/DoctorVerify/RefuseProfessionalVerify`, { method: 'POST', data });
  return request(`/api/xiaoai/doctorVerify/refuseProfessionalVerify`, { method: 'POST', data });
}

// 提交工作单位认证单据审核【取消】
export async function CancelProfessionalVerify(verifyId: any, data: any) {
  // return request(`/api/setting/DoctorVerify/CancelProfessionalVerify/${verifyId}`, { method: 'POST', data });
  return request(`/api/xiaoai/doctorVerify/cancelProfessionalVerify/${verifyId}`, { method: 'POST', data });
}
