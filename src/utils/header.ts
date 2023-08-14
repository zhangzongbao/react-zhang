import { APPKEY, SECRET } from '@/constants';
import { getUserDetail } from '@/services/UserController';
import CryptoJS from 'crypto-js';

const utils = {
  // 获取随机数
  getRandom: () => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0].toString();
  },
  // SHA256加密
  sha256: (message: string) => {
    return CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex);
  },
  // base64加密
  base64: (message: string) => {
    const wordArray = CryptoJS.enc.Utf8.parse(message);
    return CryptoJS.enc.Base64.stringify(wordArray);
  },
  debase64: (message: string) => {
    return CryptoJS.enc.Base64.parse(message).toString(CryptoJS.enc.Utf8);
  },
  // 获取当前时间戳
  getTimeStamp: () => {
    return Date.parse(new Date().toString()).toString();
  },
  // 生GUID
  guid: () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },
  // 生成头 authorization
  getHeader: () => {
    const user = getUserDetail();
    const random = utils.getRandom();
    const timeStamp = utils.getTimeStamp();
    const signature = utils.sha256(random + timeStamp + SECRET);
    return utils.base64(`${APPKEY}.${random}.${timeStamp}.${signature}${user ? '.' + user.userId : ''}${user ? '.' + user.token.value : ''}`);
  },
  // AES加密
  aes: (message: string) => {
    return CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(SECRET), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();
  },
};

export default utils;
