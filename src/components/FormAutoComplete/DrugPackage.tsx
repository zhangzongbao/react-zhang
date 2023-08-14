import { useRequest } from 'ahooks';
import { AutoComplete } from 'antd';
import { useState } from 'react';
import { GetDrugPackageQuery } from './api';

interface DrugPackageItem {
  brandId: string;
  brandName: string;
  genericName: number;
  dosageForm: string;
  factoryId: string;
  factoryName: number;
  factoryShortName: string;
  packageId: string;
  packageName: number;
  packageUnit: string;
  price: string;
  approvalNumber: number;
  avatarUrl: string;
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

const FormAutoCompleteDrugPackage = (props: Props) => {
  const { value, onChange, readonly, defaultValue, showTip } = props;
  const [needShowTip, setNeedShowTip] = useState(false);

  const handleSearch = async (v: string | boolean | undefined): Promise<Array<DrugPackageItem>> => {
    if (showTip) setNeedShowTip(true);

    onChange?.(undefined);
    if (typeof v === 'boolean' || !v) return [];
    return (await GetDrugPackageQuery(v)).map((item: DrugPackageItem) => ({
      ...item,
      label: `【${item.packageId}】${item.packageName}`,
      value: `【${item.packageId}】${item.packageName}`,
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
        placeholder="请输入品规编码或者名称检索"
        onSelect={(_, item: DrugPackageItem) => onChange?.(item.packageId)}
      />
      {needShowTip && !value ? <div style={{ position: 'absolute', left: 0, bottom: -23, color: 'var(--color-warning)' }}>请在下拉框中选择！</div> : null}
    </>
  );
};

export default FormAutoCompleteDrugPackage;
