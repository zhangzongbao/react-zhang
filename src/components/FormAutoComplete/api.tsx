import { request } from '@umijs/max';

// 平台用户自动完成选择器
export async function GetUserQuery(text: string) {
  return request(`/api/basic/AutoSelector/GetUserQuery`, { method: 'POST', data: { text } });
}

// 医职人自动完成选择器
export async function GetRepQuery(text: string) {
  return request(`/api/basic/AutoSelector/GetRepQuery`, { method: 'POST', data: { text } });
}

// 行政区划自动完成选择器
export async function GetAreaQuery(text: string) {
  return request(`/api/basic/AutoSelector/GetAreaQuery`, { method: 'POST', data: { text } });
}

// 医院自动完成选择器
export async function GetHospitalQuery(text: string) {
  return request(`/api/basic/AutoSelector/GetHospitalQuery`, { method: 'POST', data: { text } });
}

// 科室用户自动完成选择器
export async function GetDeptQuery(text: string) {
  return request(`/api/basic/AutoSelector/GetDeptQuery`, { method: 'POST', data: { text } });
}

// 商业广告自动完成选择器
export async function GetAdvertQuery(text: string) {
  return request(`/api/basic/AutoSelector/GetAdvertQuery`, { method: 'POST', data: { text } });
}

// 药厂信息自动完成选择器
export async function GetDrugFactoryQuery(text: string) {
  return request(`/api/basic/AutoSelector/GetDrugFactoryQuery`, { method: 'POST', data: { text } });
}

// 药品商品自动完成选择器
export async function GetDrugBrandQuery(text: string) {
  return request(`/api/basic/AutoSelector/GetDrugBrandQuery`, { method: 'POST', data: { text } });
}

// 药品品规自动完成选择器
export async function GetDrugPackageQuery(text: string) {
  return request(`/api/basic/AutoSelector/GetDrugPackageQuery`, { method: 'POST', data: { text } });
}

// 资料自动完成选择器
export async function GetLibraryQuery(text: string) {
  return request(`/api/basic/AutoSelector/GetLibraryQuery`, { method: 'POST', data: { text } });
}

// 问卷自动完成选择器
export async function GetSurveyQuery(text: string) {
  return request(`/api/basic/AutoSelector/GetSurveyQuery`, { method: 'POST', data: { text } });
}
