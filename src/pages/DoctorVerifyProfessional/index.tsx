import { ProfessionalGridQuery } from '@/pages/DoctorVerifyProfessional/api';
import DetailComponent from '@/pages/DoctorVerifyProfessional/components/Detail';
import { sortStatus } from '@/utils/enum';
import { reloadTruePageIndex } from '@/utils/util';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import { useModel } from '@umijs/max';
import { Input, Select, Space } from 'antd';
import { useRef, useState } from 'react';

const DoctorVerifyProfessional = () => {
  const { paginationSize, changePaginationSize } = useModel('paginationSize');
  const { tableSize, changeTableSize } = useModel('tableSize');
  const ref = useRef<ActionType>();
  const [data, setData] = useState<string | undefined>();
  const [filter, setFilter] = useState<string>('SUBMITTED');
  const [detail, setDetail] = useState<number | undefined>();

  const reLoadPage = () => reloadTruePageIndex(ref, filter === 'SUBMITTED' ? 'del' : '');

  const columns: ProColumns<DoctorVerifyProfessional.DoctorItem>[] = [
    {
      title: '审批单号',
      dataIndex: 'verifyId',
      align: 'center',
      width: 80,
      render: (_, record) => (
        <a style={{ padding: '0 10px' }} onClick={() => setDetail(record.verifyId)}>
          {_}
        </a>
      ),
    },
    {
      title: '医生编码',
      dataIndex: 'doctorId',
      width: 80,
    },
    {
      title: '医生姓名',
      dataIndex: 'doctorName',
      align: 'center',
      width: 80,
    },
    {
      title: '医院编码',
      dataIndex: 'hospitalId',
      width: 80,
    },
    {
      title: '医院名称',
      dataIndex: 'hospitalName',
      width: 80,
    },
    {
      title: '标准科室编码',
      dataIndex: 'deptId',
      align: 'center',
      width: 120,
    },
    {
      title: '标准科室名称',
      dataIndex: 'deptName',
      align: 'center',
      width: 120,
    },
    {
      title: '挂牌科室',
      dataIndex: 'deptDescription',
      align: 'center',
      width: 80,
    },
    {
      title: '职称',
      dataIndex: 'doctorTitleName',
      width: 40,
    },
    {
      title: '工作证明',
      dataIndex: 'hasVerifyPhoto',
      align: 'center',
      render: (dom) => dom && <span className="color-success">有</span>,
      width: 80,
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      valueType: 'select',
      request: async () => [
        { label: <span className="color-primary">待审核</span>, value: 'SUBMITTED' },
        { label: <span className="color-success">审批通过</span>, value: 'SUCCESSFUL' },
        { label: <span className="color-error">审批拒绝</span>, value: 'REFUSED' },
        { label: <span>撤回</span>, value: 'CANCELED' },
      ],
      sorter: true,
      width: 80,
      render: (_, record) => (
        <a style={{ padding: '0 10px' }} onClick={() => setDetail(record.verifyId)}>
          {_}
        </a>
      ),
    },
    {
      title: '提交人工号',
      dataIndex: 'submitUserId',
      width: 100,
    },
    {
      title: '提交人姓名',
      align: 'center',
      dataIndex: 'submitUserName',
      width: 100,
    },
    {
      title: '提交时间',
      dataIndex: 'submitStamp',
      width: 80,
    },
    {
      title: '审核人Id',
      dataIndex: 'verifyUserId',
      width: 80,
    },
    {
      title: '审核人',
      dataIndex: 'verifyUserName',
      width: 60,
    },
    {
      title: '取消时间',
      dataIndex: 'cancelStamp',
    },
  ];

  return (
    <PageContainer header={{ breadcrumb: {} }}>
      <ProTable<DoctorVerifyProfessional.DoctorItem>
        actionRef={ref}
        rowKey="verifyId"
        search={false}
        columnEmptyText={false}
        columns={columns}
        columnsState={{
          persistenceKey: 'Setting-ProTable-ColumnsState-DoctorVerifyProfessional',
          persistenceType: 'localStorage',
        }}
        pagination={{
          defaultPageSize: paginationSize,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: (v1, v2) => changePaginationSize(v2),
        }}
        onSizeChange={changeTableSize}
        defaultSize={tableSize}
        scroll={{ x: 'max-content', y: 'calc(100vh - 320px)' }}
        toolbar={{
          subTitle: (
            <Space>
              <Input.Search placeholder="综合查询" allowClear onSearch={setData} />
              <Select
                placeholder="下拉选择"
                defaultValue="SUBMITTED"
                style={{ height: 32, width: 231 }}
                onSelect={setFilter}
                options={[
                  { label: '全部', value: '' },
                  { label: '待审核', value: 'SUBMITTED' },
                  { label: '审核通过', value: 'SUCCESSFUL' },
                  { label: '审核驳回', value: 'REFUSED' },
                  { label: '撤回', value: 'CANCELED' },
                ]}
              />
            </Space>
          ),
        }}
        params={{
          data,
          filter,
        }}
        request={async (params, sort = {}, filter) => {
          const res = await ProfessionalGridQuery({
            pageIndex: params.current,
            pageSize: params.pageSize,
            data: params.data,
            // filter: verifyType[params.filter],
            approveStatus: params.filter,
            sorter: sort?.status
              ? {
                  key: 'status',
                  value: sort?.status ? sortStatus[sort?.status] : null,
                }
              : null,
          });

          return {
            data: res.data,
            success: true,
            total: res.dataCount,
          };
        }}
      />

      <DetailComponent detail={detail} onCancel={() => setDetail(undefined)} reLoadPage={reLoadPage} />
    </PageContainer>
  );
};

export default DoctorVerifyProfessional;
