import { useModel } from '@umijs/max';
import { useAsyncEffect } from 'ahooks';
import { useState } from 'react';
import { GetQuickLinkList } from './api';

export declare type QuickLink = {
  linkId: string;
  userId: string;
  linkType: string;
  linkCode: string;
  linkName: string;
  linkUrl: string;
  sort: number;
};

const QuickLinkList = () => {
  const { initialState } = useModel('@@initialState');
  const [quickLinkList, setQuickLinkList] = useState<QuickLink[]>([]);
  const bc = new BroadcastChannel('quickLinkList');

  const changeQuickLinkList = (list: QuickLink[]) => bc.postMessage(list);

  const initQuickLinkList = async () => {
    if (initialState) changeQuickLinkList(await GetQuickLinkList());
  };

  useAsyncEffect(async () => initQuickLinkList(), [initialState]);

  useAsyncEffect(async () => {
    bc.onmessage = (e) => {
      if ((e.currentTarget as any)?.name === 'quickLinkList') setQuickLinkList(e.data);
    };
  }, []);

  return { quickLinkList, initQuickLinkList, changeQuickLinkList };
};

export default QuickLinkList;
