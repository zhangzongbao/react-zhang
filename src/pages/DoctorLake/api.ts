import { request } from '@umijs/max';

// 建档客户
export async function searhClient(data: any) {
  return request(`/api/xiaoai/client/searhClient`, { method: 'POST', data });
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

// 专业人士列表
export async function doctorFuzzyList(data: any) {
  return request(`/api/xiaoai/professional/doctorFuzzyList`, { method: 'POST', data });
}

// 添加医生索引
export async function doctorIndex(data: any) {
  return request(`/api/xiaoai/professional/doctorIndex`, { method: 'POST', data });
}

// 添加医生索引
export async function professionalImport(data: any) {
  return request(`/api/xiaoai/professional/import`, { method: 'POST', data });
}

//获取数据字典选项 获取DoctorType
export async function dictionaryId(data: any) {
  return request(`/api/basic/Dictionary/GetDictionaryOptionList/dictionaryId?dictionaryId=${data.dictionaryId}`, { method: 'POST' });
}

//专业人士信息
export async function doctorInfo(data: any) {
  return request(`/api/xiaoai/professional/doctorInfo?id=${data}`, { method: 'GET' });
}

//省市区json
export async function getProvinceCityDistrictList(data: any) {
  return request(`/api/xiaoai/area/getProvinceCityDistrictList`, { method: 'GET' });
}
