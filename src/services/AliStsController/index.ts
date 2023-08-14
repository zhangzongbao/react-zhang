import { GetUserTokenStsAccessKey } from '@/services/AliStsController/api';
import header from '@/utils/header';
import CryptoJS from 'crypto-js';

interface formDataParamsDTO {
  OSSAccessKeyId: string;
  signature: string;
  policy: string;
  'x-oss-security-token': string;
  expiration: number;
}

let formDataParams: formDataParamsDTO | null = null;

const computeSignature = (accessKeySecret: string, canonicalString: string) =>
  CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(canonicalString, accessKeySecret));

const policyText = (expiration: number) => ({
  expiration: new Date(expiration * 1000).toISOString(), // 设置policy过期时间。
  conditions: [
    // 限制上传大小。
    ['content-length-range', 0, 1024 * 1024 * 1024],
  ],
});
export async function getSts() {
  if (!formDataParams || formDataParams.expiration - 5 < Date.now() / 1000) {
    const credentials = await GetUserTokenStsAccessKey();
    const policy = header.base64(JSON.stringify(policyText(credentials.expiresUnix))); // policy必须为base64的string。
    const signature = computeSignature(credentials.accessKeySecret, policy);
    formDataParams = {
      OSSAccessKeyId: credentials.accessKeyId,
      signature,
      policy,
      'x-oss-security-token': credentials.securityToken,
      expiration: credentials.expiresUnix,
    };
    return formDataParams;
  }

  return formDataParams;
}
