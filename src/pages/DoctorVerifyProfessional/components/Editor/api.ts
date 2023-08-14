import { request } from '@umijs/max';

// 获取医生工作信息
export async function GetDoctorWorkplaceInfo(doctorId: any) {
  // return request(`/api/setting/DoctorSetting/GetDoctorWorkplaceData/${doctorId}`, { method: 'POST' });
  return request(`/api/xiaoai/doctorSetting/getDoctorWorkplaceData/${doctorId}`, { method: 'POST' });
}

// 修改医生工作信息
export async function SaveDoctorWorkplaceData(data: any) {
  // return request(`/api/setting/DoctorSetting/SaveDoctorWorkplaceData`, { method: 'POST', data });
  return request(`/api/xiaoai/doctorSetting/saveDoctorWorkplaceData`, { method: 'POST', data });
}

// 获取医生职称列表
export async function GetDoctorTitleList() {
  return request(`/api/basic/Dictionary/GetDoctorTitleList`, { method: 'POST' });
}
