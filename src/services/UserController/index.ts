import utils from '@/utils/header';
import { history } from '@umijs/max';
import dayjs from 'dayjs';

let userObject: Home.login_res | null = null;

export function getUserDetail() {
  if (!userObject) {
    let userString = localStorage.getItem('user');
    if (userString) {
      try {
        userObject = JSON.parse(utils.debase64(userString));
      } catch (e) {
        userObject = null;
      }
    }
  }

  if (!(userObject?.token?.expireTime && dayjs().isAfter(dayjs(userObject.token.expireTime)))) userObject = null;

  // 验证关键字段是否存在
  if (!userObject?.siteList) userObject = null;

  return userObject;
}

export function getDeepCopyUserDetail() {
  let result = null;
  let userString = localStorage.getItem('user');
  if (userString) {
    try {
      result = JSON.parse(utils.debase64(userString));
    } catch (e) {
      result = null;
    }
  }

  if (!(result?.token.expireTime && dayjs().isAfter(dayjs(result.token.expireTime)))) result = null;

  // 验证关键字段是否存在
  if (!userObject?.siteList) userObject = null;

  return result;
}

export function clearUserDetail() {
  userObject = null;
  localStorage.removeItem('user');
}

export function setUserDetail(user: any) {
  if (user?.token?.value) {
    try {
      userObject = user;
      localStorage.setItem('user', utils.base64(JSON.stringify(user)));
    } catch (e) {
      clearUserDetail();
    }
  } else {
    clearUserDetail();
    throw new Error('用户信息传入不合法');
  }
}

export function goLoginPage() {
  if (process.env.NODE_ENV === 'development') {
    alert('当前开发环境token已过期，请获取正确token后替换app.ts 35行处代码');
  } else {
    sessionStorage.setItem('preUrl', history.location.pathname);
    window.location.href = window.location.origin;
  }
}

export function goHomePage() {
  if (process.env.NODE_ENV === 'development') {
    alert('当前是开发环境，接口调用已成功！如看具体功能请发版。');
  } else {
    window.location.href = window.location.origin;
  }
}
