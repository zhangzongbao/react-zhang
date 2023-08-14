import { useRequest } from 'ahooks';
import { AutoComplete } from 'antd';
import { useState } from 'react';
import { GetUserQuery } from './api';

interface UserItem {
  avatarUrl: string;
  gender: string;
  isDeveloper: boolean;
  mobile: string;
  nickName: string;
  unionId: string;
  userAccount: boolean;
  userId: string;
  userName: string;
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

const FormAutoCompleteUser = (props: Props) => {
  const { value, onChange, readonly, defaultValue, showTip } = props;
  const [needShowTip, setNeedShowTip] = useState(false);

  const handleSearch = async (v: string | boolean | undefined): Promise<Array<UserItem>> => {
    if (showTip) setNeedShowTip(true);

    onChange?.(undefined);
    if (typeof v === 'boolean' || !v) return [];
    return (await GetUserQuery(v)).map((item: UserItem) => ({
      ...item,
      label: `【${item.userId}】${item.userName}`,
      value: `【${item.userId}】${item.userName}`,
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
        placeholder="请输入用户编码或者姓名检索"
        onSelect={(_, item: UserItem) => onChange?.(item.userId)}
      />
      {needShowTip && !value ? <div style={{ position: 'absolute', left: 0, bottom: -23, color: 'var(--color-warning)' }}>请在下拉框中选择！</div> : null}
    </>
  );
};

export default FormAutoCompleteUser;
