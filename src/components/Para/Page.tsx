import ParaListComponent from '@/components/Para/ParaList';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { PageContainer, ProFormInstance } from '@ant-design/pro-components';
import { App, Button } from 'antd';
import { useRef } from 'react';
import { SaveGlobalParam } from './api';

const ParaPageComponent = (props: { list: Parameter.ParaSetting | undefined; width?: number }) => {
  const { list, width } = props;
  const { message, modal } = App.useApp();
  const formRef = useRef<ProFormInstance>();

  const takeEffect = async () => {
    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定要执行生效操作吗？',
      onOk: async () => {
        await SaveGlobalParam();
        message.success('生效成功');
        return true;
      },
    });
  };

  return (
    <PageContainer
      header={{ breadcrumb: {} }}
      extra={[
        <Button type="primary" size="small" key="save" onClick={takeEffect}>
          生效变更
        </Button>,
      ]}
      loading={{
        spinning: !list,
        className: 'center-box',
        size: 'default',
      }}
    >
      <ParaListComponent list={list} width={width} />
    </PageContainer>
  );
};

export default ParaPageComponent;
