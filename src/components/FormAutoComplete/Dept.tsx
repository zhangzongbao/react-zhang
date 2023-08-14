import { useRequest } from 'ahooks';
import { AutoComplete } from 'antd';
import { useState } from 'react';
import { GetDeptQuery } from './api';

interface DeptItem {
  deptGroupId: string;
  deptGroupName: string;
  deptGroupSort: number;
  deptId: string;
  deptName: string;
  deptSort: number;
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

const FormAutoCompleteDept = (props: Props) => {
  const { value, onChange, readonly, defaultValue, showTip } = props;
  const [needShowTip, setNeedShowTip] = useState(false);

  const handleSearch = async (v: string | boolean | undefined): Promise<Array<DeptItem>> => {
    if (showTip) setNeedShowTip(true);

    onChange?.(undefined);
    if (typeof v === 'boolean' || !v) return [];
    return (await GetDeptQuery(v)).map((item: DeptItem) => ({
      ...item,
      label: `【${item.deptId}】${item.deptName}`,
      value: `【${item.deptId}】${item.deptName}`,
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
        placeholder="请输入科室编码或者名称检索"
        onSelect={(_, item: DeptItem) => onChange?.(item.deptId)}
      />
      {needShowTip && !value ? <div style={{ position: 'absolute', left: 0, bottom: -23, color: 'var(--color-warning)' }}>请在下拉框中选择！</div> : null}
    </>
  );
};

export default FormAutoCompleteDept;
