import { useRequest } from 'ahooks';
import { AutoComplete } from 'antd';
import { useState } from 'react';
import { GetAdvertQuery } from './api';

interface AdvertItem {
  advertId: string;
  advertName: string;
  advertType: string;
  contact: string;
  keyInfo: string;
  label: string;
  value: string;
}

interface Props {
  value?: { id: string | undefined; text: string | undefined } | string | undefined;
  onChange?: (value: string | undefined) => void;
  readonly?: boolean;
  defaultValue?: string | undefined;
  showTip?: boolean | undefined;
}

const FormAutoCompleteAdvert = (props: Props) => {
  const { value, onChange, readonly, defaultValue, showTip } = props;
  const [needShowTip, setNeedShowTip] = useState(false);

  const handleSearch = async (v: string | boolean | undefined): Promise<Array<AdvertItem>> => {
    if (showTip) setNeedShowTip(true);

    onChange?.(undefined);
    if (typeof v === 'boolean' || !v) return [];
    return (await GetAdvertQuery(v)).map((item: AdvertItem) => ({
      ...item,
      label: `【${item.advertId}】${item.advertName}`,
      value: `【${item.advertId}】${item.advertName}`,
    }));
  };

  const { data, run }: any = useRequest(handleSearch, {
    debounceWait: 300,
    manual: true,
  });

  return readonly ? (
    <>{defaultValue || '-'}</>
  ) : (
    <>
      <AutoComplete
        defaultValue={defaultValue}
        options={data}
        allowClear
        onClear={run}
        onKeyUp={(e: any) => setTimeout(() => run(e.target.value), 0)}
        // onSearch={run}
        placeholder="请输入广告编码或者名称检索"
        onSelect={(_, item: AdvertItem) => onChange?.(item.advertId)}
      />
      {needShowTip && !value ? <div style={{ position: 'absolute', left: 0, bottom: -23, color: 'var(--color-warning)' }}>请在下拉框中选择！</div> : null}
    </>
  );
};

export default FormAutoCompleteAdvert;
