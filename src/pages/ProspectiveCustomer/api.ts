import { request } from '@umijs/max';

// 潜在客户
export async function searchPotentialClient(data: any) {
  return request(`/api/xiaoai/client/searchPotentialClient`, { method: 'POST', data });
}

// 项目
export async function projectItemList() {
  return request(`/api/xiaoai/doctor/projectItemList`, { method: 'GET' });
}

// 删除微信信息
export async function doctorUserRevokeAsync(data: any) {
  return request(`/api/xiaoai/client/doctorUserRevokeAsync`, { method: 'POST', data });
}

// 服务号-列表搜索
export async function getAppList() {
  return request(`/api/xiaoai/client/getAppList`, { method: 'GET' });
}

// 服务号-列表搜索
export async function getRepList(data: any) {
  return request(`/api/xiaoai/client/GetRepList?text=${data.text}`, { method: 'GET' });
}

// 补录邀请码
export async function inputInviteCode(data: any) {
  return request(`/api/xiaoai/client/inputInviteCode`, { method: 'POST', data });
}

// 潜在客户-建档
export async function createDoctorArchives(data: any) {
  return request(`/api/xiaoai/client/createDoctorArchives`, { method: 'POST', data });
}

// 医院
export async function searchHospitalName(data: any) {
  return request(`/api/xiaoai/client/searchHospitalName`, { method: 'POST', data });
}

// 医生(职位)
export async function getDoctorTitleList() {
  return request(`/api/xiaoai/client/getDoctorTitleList`, { method: 'GET' });
}

// 科室
export async function getDeptList() {
  return request(`/api/xiaoai/client/getDeptList`, { method: 'GET' });
}

// 详情
export async function getDoctorDetail(data: any) {
  return request(`/api/xiaoai/client/getDoctorDetail?doctorId=${data}`, { method: 'GET' });
}

// 微信信息
export async function getDoctorWechatInfo(data: any) {
  return request(`/api/xiaoai/client/getDoctorWechatInfo?doctorId=${data}`, { method: 'GET' });
}

// 执业点信息
export async function getDoctorWorkplace(data: any) {
  return request(`/api/xiaoai/client/getDoctorWorkplace?doctorId=${data}`, { method: 'GET' });
}

// 专业信息
export async function getDoctorProfessional(data: any) {
  return request(`/api/xiaoai/client/getDoctorProfessional?doctorId=${data}`, { method: 'GET' });
}

// 消息提醒
export async function sendCompleteInfoMessage(data: any) {
  return request(`/api/xiaoai/client/sendCompleteInfoMessage`, { method: 'POST', data });
}

// 消息提醒-拒绝
export async function sendRefuseMessage(data: any) {
  return request(`/api/xiaoai/client/sendRefuseMessage`, { method: 'POST', data });
}

// // 获取工作单位认证的审核单据明细
// export async function GetWorkplaceModel(verifyId: any) {
//   return request(`/api/setting/DoctorVerify/GetWorkplaceModel/${verifyId}`, { method: 'POST' });
// }

// // 获取工作单位认证的审核表单数据
// export async function GetWorkplaceApproveForm(verifyId: any) {
//   return request(`/api/setting/DoctorVerify/GetWorkplaceApproveForm/${verifyId}`, { method: 'POST' });
// }

// // 提交工作单位认证单据审核【通过】
// export async function SubmitWorkplaceApproveForm(data: any) {
//   return request(`/api/setting/DoctorVerify/SubmitWorkplaceApproveForm`, { method: 'POST', data });
// }

// // 提交工作单位认证单据审核【驳回】
// export async function RefuseWorkplaceVerify(data: any) {
//   return request(`/api/setting/DoctorVerify/RefuseWorkplaceVerify`, { method: 'POST', data });
// }

// // 提交工作单位认证单据审核【取消】
// export async function CancelWorkplaceVerify(verifyId: any, data: any) {
//   return request(`/api/setting/DoctorVerify/CancelWorkplaceVerify/${verifyId}`, { method: 'POST', data });
// }
