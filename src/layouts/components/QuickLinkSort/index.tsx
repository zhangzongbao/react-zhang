import { QuickLink } from '@/models/quickLinkList';
import { ExclamationCircleOutlined, MenuOutlined, MinusCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { DragSortTable, DrawerForm, ProColumns } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { App, Tag } from 'antd';
import { RemoveQuickLink, SaveQuickLinkSorts } from './api';
import styles from './index.less';

const QuickLinkSortComponent = () => {
  const { modal, message } = App.useApp();
  const { quickLinkList, initQuickLinkList, changeQuickLinkList } = useModel('quickLinkList');

  const onDragSortEnd = async (newDataSource: QuickLink[]) => {
    changeQuickLinkList(newDataSource); // 避免页面闪烁
    await SaveQuickLinkSorts(newDataSource.reduce((sum: string[], item) => [...sum, item.linkId], []));
  };

  const del = (record: QuickLink) => {
    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `确定要从快速访问中移除【${record.linkName}】？`,
      onOk: async () => {
        await RemoveQuickLink(record.linkId);
        await initQuickLinkList();
        message.success('已从快速访问中移除');
        return true;
      },
    });
  };

  const columns: ProColumns<QuickLink>[] = [
    {
      dataIndex: 'action',
      align: 'center',
      width: 36,
    },
    {
      dataIndex: 'linkName',
      search: false,
      render: (_, record) => (
        <div className={styles.linkData}>
          {record.linkType === 'Project' ? (
            <Tag color="processing">项目</Tag>
          ) : record.linkType === 'Campaign' ? (
            <Tag color="success">任务</Tag>
          ) : (
            <Tag color="warning">站点</Tag>
          )}
          <div className={styles.linkName}>{_}</div>
          <MinusCircleOutlined className={styles.del} onClick={() => del(record)} />
        </div>
      ),
    },
  ];

  return (
    <DrawerForm
      title="快速访问设置"
      trigger={<SettingOutlined style={{ cursor: 'pointer' }} />}
      drawerProps={{
        destroyOnClose: true,
        width: 480,
        bodyStyle: { padding: '12px 0' },
      }}
      submitter={false}
    >
      <DragSortTable<QuickLink>
        rowKey="linkId"
        dataSource={quickLinkList}
        columnEmptyText={false}
        columns={columns}
        search={false}
        showHeader={false}
        pagination={false}
        tableLayout="auto"
        toolbar={{ settings: [] }}
        dragSortKey="action"
        dragSortHandlerRender={() => <MenuOutlined className={styles.dragHandle} />}
        onDragSortEnd={onDragSortEnd}
      />
    </DrawerForm>
  );
};

export default QuickLinkSortComponent;
