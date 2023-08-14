import { ActionType } from '@ant-design/pro-components';
import React from 'react';

export async function copyText(text: string) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  } else {
    const oInput = document.createElement('input');
    oInput.value = text;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand('Copy'); // 执行浏览器复制命令
    oInput.style.display = 'none';
    alert(oInput.value);
    document.body.removeChild(oInput);
  }
}

export function reloadTruePageIndex(ref: React.MutableRefObject<ActionType | undefined>, type = '', filter?: boolean) {
  if (type === 'del' || (type === 'freeze' && filter)) {
    const pageInfo: any = ref?.current?.pageInfo;
    if (pageInfo?.total - 1 === (pageInfo?.current - 1) * pageInfo?.pageSize && pageInfo?.current > 1) {
      ref?.current?.setPageInfo?.({
        current: pageInfo?.current - 1,
      });
    }
  }

  ref?.current?.reload();
}
