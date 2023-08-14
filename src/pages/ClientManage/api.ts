import { request } from '@umijs/max';

// 导出筛选结果
export async function exportDoctor(data: any) {
  return request(`/api/xiaoai/client/exportDoctor`, { method: 'POST', data });
}

// 项目
export async function projectItemList() {
  return request(`/api/xiaoai/doctor/projectItemList`, { method: 'GET' });
}

// 建档客户
export async function searchClient(data: any) {
  return request(`/api/xiaoai/client/searchClient`, { method: 'POST', data });
}

// 单独更新状态--（基本信息）
export async function updateDoctorStatus(data: any) {
  return request(`/api/xiaoai/client/updateDoctorStatus`, { method: 'POST', data });
}

// 删除微信信息
export async function doctorUserRevokeAsync(data: any) {
  return request(`/api/xiaoai/client/doctorUserRevokeAsync`, { method: 'POST', data });
}

// 区域列表
export async function getAreaList(data: any) {
  return request(`/api/xiaoai/area/getAreaList?name=${data.name}&maxData=${data.maxData}`, { method: 'GET' });
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

// 添加执业点
export async function addDoctorWorkplace(data: any) {
  return request(`/api/xiaoai/client/addDoctorWorkplace`, { method: 'POST', data });
}

// 修改执业点
export async function updateDoctorWorkplace(data: any) {
  return request(`/api/xiaoai/client/updateDoctorWorkplace`, { method: 'POST', data });
}

// 修改基本信息
export async function updateDoctorInfo(data: any) {
  return request(`/api/xiaoai/client/updateDoctorInfo`, { method: 'POST', data });
}

// 修改专业信息
export async function updateDoctorProfessional(data: any) {
  return request(`/api/xiaoai/client/updateDoctorProfessional`, { method: 'POST', data });
}

// 补录邀请码
export async function inputInviteCode(data: any) {
  return request(`/api/xiaoai/client/inputInviteCode`, { method: 'POST', data });
}

// 服务号-列表搜索
export async function getRepList(data: any) {
  return request(`/api/xiaoai/client/GetRepList?text=${data.text}`, { method: 'GET' });
}
