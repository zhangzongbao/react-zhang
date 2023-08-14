import {
  contaceList,
  exportDoctor,
  getAreaList,
  getDeptList,
  getDoctorTitleList,
  projectItemList,
  searchDoctor,
  searchHospitalName,
  verifyStatusList,
} from '@/pages/ClientAll/api';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import { ProColumns, ProFormSelect, ProTable } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import { useModel } from '@umijs/max';
import { Button, Checkbox, Input, message, Modal, Space, Tag } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useRef, useState } from 'react';
import { Link } from 'umi';
import PracticeSiteAddEdit from './components/PracticeSiteAddEdit';
import styles from './index.less';

const ClientAll = () => {
  const { paginationSize, changePaginationSize } = useModel('paginationSize');
  const { tableSize, changeTableSize } = useModel('tableSize');
  const ref = useRef<any>();
  const [listParams, setListParams] = useState<number | any>({
    keyWord: '', //综合查询
    hospitalName: '', //医院编码或名称
    area: '', //省市区县
    deptId: '', //科室
    doctorTitleId: '', //职称
    projectId: '', //项目
    verifyStatus: '', //工作证明审核状态
    isFriendContact: null, //显示小爱客户
    isRegister: null, //显示注册用户
    status: '', // 是否是无效客户-建档客户 DRAFT,INACTIVE
    orderParam: {
      field: '',
      orderType: 0,
    },
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [contaceData, setContaceData] = useState<any>();

  const queryContaceList = async (doctorId: string) => {
    const res = await contaceList(doctorId);
    setContaceData(res);
    setIsModalOpen(true);
  };
  // DRAFT
  const columns: ProColumns<ClientAll.DoctorItem>[] = [
    {
      title: '医生编码',
      dataIndex: 'doctorId',
      align: 'left',
      width: 80,
      sorter: true,
      render: (_, record) => {
        return record.status === 'DRAFT' ? (
          <Link target="_blank" to={`/physician-management/prospective-customer/detail?doctorId=${record.doctorId}`}>
            {record.doctorId}
          </Link>
        ) : record.status === 'ACTIVE' ? (
          <Link target="_blank" to={`/physician-management/client-manage/detail?doctorId=${record.doctorId}`}>
            {record.doctorId}
          </Link>
        ) : (
          <Link target="_blank" to={`/physician-management/client-all/detail?doctorId=${record.doctorId}`}>
            {record.doctorId}
          </Link>
        );
      },
    },
    {
      title: '姓名',
      dataIndex: 'doctorName',
      align: 'left',
      width: 80,
      sorter: true,
      render: (_, record) => (
        <div>
          {record.doctorName}
          {record.gender ? (
            record.gender === 'M' ? (
              <ManOutlined style={{ fontSize: 14, color: '#81A5E3' }} />
            ) : (
              <WomanOutlined style={{ fontSize: 14, color: '#F58CAB' }} />
            )
          ) : null}
        </div>
      ),
    },
    {
      title: '手机号码',
      dataIndex: 'mobile',
      align: 'left',
      width: 80,
      sorter: true,
      render: (_, record) => {
        return (
          <div>
            {record.mobile} {record.mobileVerify === '不一致' && <Tag color="error">{record.mobileVerify}</Tag>}
          </div>
        );
      },
    },

    {
      title: '职称',
      dataIndex: 'doctorTitleName',
      align: 'left',
      width: 120,
      sorter: true,
    },
    {
      title: '执业点',
      dataIndex: 'workplaceCount',
      align: 'left',
      width: 120,
      sorter: true,
      render: (_, record) => (
        <>{record.workplaceCount ? <PracticeSiteAddEdit workplaceCount={record.workplaceCount} doctorId={record.doctorId} btnFlag="list" /> : ''}</>
      ),
    },
    {
      title: '首要任职医院',
      dataIndex: 'hospitalName',
      align: 'left',
      width: 80,
      sorter: true,
      render: (_, record) => {
        return (
          <>
            <a>{record.hospitalId}</a>&nbsp;
            <span>{record.hospitalName}</span>
          </>
        );
      },
    },
    {
      title: '省市区县',
      dataIndex: 'area',
      align: 'left',
      width: 80,
      sorter: true,
    },
    {
      title: '区县类型',
      dataIndex: 'areaType',
      align: 'left',
      width: 80,
      sorter: true,
    },
    {
      title: '科室',
      dataIndex: 'deptName',
      align: 'left',
      width: 80,
      sorter: true,
    },
    {
      title: '职务',
      dataIndex: 'hospitalPosition',
      align: 'left',
      width: 80,
      sorter: true,
    },
    {
      title: '审核状态',
      dataIndex: 'verifyStatus',
      align: 'left',
      width: 80,
      sorter: true,
      valueEnum: {
        DRAFT: {
          text: <span style={{ color: '#FAAD14' }}>待提交</span>,
          status: 'DRAFT',
          color: '#FAAD14',
        },
        SUBMITTED: {
          text: <span style={{ color: '#12B8D7' }}>审核中</span>,
          status: 'SUBMITTED',
          color: '#12B8D7',
        },
        REFUSED: {
          text: <span style={{ color: '#FF4D4F' }}>审核不通过</span>,
          status: 'REFUSED ',
          color: '#FF4D4F',
        },
        ACTIVE: {
          text: <span style={{ color: '#52C41A' }}>已核实</span>,
          status: 'ACTIVE ',
          color: '#52C41A',
        },
        INACTIVE: {
          text: ' ',
          status: 'INACTIVE',
        },
      },
    },
    {
      title: '审核时间',
      dataIndex: 'verifyStamp',
      align: 'left',
      width: 80,
      sorter: true,
    },
    {
      title: '建档医职人',
      dataIndex: 'creatorRepName',
      align: 'left',
      width: 100,
      sorter: true,
    },
    {
      title: '微信注册',
      dataIndex: 'registStatus',
      align: 'left',
      width: 80,
      sorter: true,
      render: (_, record) => <div>{record.registStatus === '已注册' && <Tag color="success">已注册</Tag>}</div>,
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      align: 'left',
      width: 120,
      sorter: true,
    },
    {
      title: '注册时间',
      dataIndex: 'registerDate',
      align: 'left',
      width: 120,
      sorter: true,
    },
    {
      title: '招募医职人',
      dataIndex: 'inviteRepName',
      align: 'left',
      width: 120,
      sorter: true,
    },
    {
      title: '外部联系人',
      dataIndex: 'isContact',
      align: 'left',
      width: 80,
      sorter: true,
      render: (_, record) => (
        <a onClick={() => queryContaceList(record.doctorId)} style={{ cursor: 'pointer' }}>
          {!!record.isContact && '是'}
        </a>
      ),
    },
    {
      title: '添加时间',
      dataIndex: 'addContactDate',
      align: 'left',
      width: 80,
      sorter: true,
    },
    {
      title: '小爱好友',
      dataIndex: 'isFriendContact',
      align: 'left',
      width: 80,
      sorter: true,
      render: (_, record) => <div>{!!record.isFriendContact && '是'}</div>,
    },
    {
      title: '阅读文章数',
      dataIndex: 'readCount',
      align: 'left',
      width: 100,
      sorter: true,
      render: (_, record) => <div>{!!record.readCount && record.readCount}</div>,
    },
    {
      title: '有效阅读文章数',
      dataIndex: 'validReadCount',
      align: 'left',
      width: 130,
      sorter: true,
      render: (_, record) => <div>{!!record.validReadCount && record.validReadCount}</div>,
    },
    {
      title: '有效阅读文章次数',
      dataIndex: 'validReadTimes',
      align: 'left',
      width: 150,
      sorter: true,
      render: (_, record) => <div>{!!record.validReadTimes && record.validReadTimes}</div>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'left',
      width: 80,
      sorter: true,
      render: (_, record) => (
        <div style={{ color: record.status === 'DRAFT' ? '#FAAD14' : record.status === 'ACTIVE' ? '#52C41A' : '#FF4D4F' }}>
          {record.status === 'DRAFT' ? '待提交' : record.status === 'ACTIVE' ? '有效' : '无效'}
        </div>
      ),
    },
  ];

  // 导出筛选结果
  const handleExport = async () => {
    const res = await exportDoctor(listParams);
    if (res) {
      const aLink = document.createElement('a'); //创建a链接
      aLink.style.display = 'none';
      aLink.href = res.fileName;
      aLink.name = '全部客户';
      aLink.download = '全部客户' + '.xlsx';
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink); //点击完成后记得删除创建的链接
      message.success('导出成功');
    }
  };

  return (
    <PageContainer header={{ breadcrumb: {} }}>
      <ProTable<ClientAll.DoctorItem>
        actionRef={ref}
        rowKey="doctorId"
        search={false}
        className={styles.clientManage}
        columnEmptyText={false}
        columns={columns}
        columnsState={{
          persistenceKey: 'Xiaoai-ProTable-ColumnsState-ClientManage',
          persistenceType: 'localStorage',
        }}
        params={{ ...listParams }}
        request={async (params, sort = {}) => {
          const { data, dataCount } = await searchDoctor({
            pageIndex: params.current,
            pageSize: params.pageSize,
            keyWord: params.keyWord,
            hospitalName: params.hospitalName,
            status: params.status, //显示建档客户  无效客户
            isRegister: params.isRegister, //仅显示注册用户
            isFriendContact: params.isFriendContact, //显示小爱可客户
            verifyStatus: params.verifyStatus, //工作证明审核
            projectId: params.projectId,
            areaId: params.areaId,
            deptId: params.deptId,
            area: params.area,
            doctorTitleId: params.doctorTitleId,
            orderParam: {
              field: (JSON.stringify(sort) !== '{}' && Object.keys(sort)[0]) || '',
              orderType: JSON.stringify(sort) !== '{}' && sort[`${Object.keys(sort)}`] === 'ascend' ? 0 : sort[`${Object.keys(sort)}`] === 'descend' ? 1 : 0,
            },
          });
          return {
            data: data,
            total: dataCount,
          };
        }}
        pagination={{
          defaultPageSize: paginationSize,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: (v1, v2) => changePaginationSize(v2),
        }}
        onSizeChange={changeTableSize}
        defaultSize={tableSize}
        tableLayout="auto"
        scroll={{ x: 'max-content', y: 'calc(100vh - 372px)' }}
        toolBarRender={() => [
          <Button key="3" onClick={handleExport}>
            导出筛选结果
          </Button>,
        ]}
        toolbar={{
          multipleLine: true,
          filter: (
            <div
              style={{ background: '#EDF1FF', width: '100%', display: 'flex', alignItems: 'center', height: 44, padding: '4px 0' }}
              className="margin-bottom16"
            >
              <Space>
                <ProFormSelect
                  placeholder="请输入医院编码或名称"
                  name="hospitalName"
                  style={{ width: 244, marginLeft: 8 }}
                  fieldProps={{
                    showSearch: true,
                    dropdownMatchSelectWidth: false,
                    onClear: () => {
                      setListParams({ ...listParams, hospitalName: '' });
                    },
                    onSelect: (value) => {
                      setListParams({ ...listParams, hospitalName: value?.split('-')[1] });
                    },
                  }}
                  debounceTime={300}
                  request={async (e: any) => {
                    const { data } = await searchHospitalName({ name: e.keyWords, pageIndex: 1, pageSize: 200 });
                    return data.map((item: any) => ({
                      label: item.hospitalName,
                      value: `${item.hospitalId}-${item.hospitalName}`,
                    }));
                  }}
                />
                <ProFormSelect
                  placeholder="请输入区域名称检索"
                  name="area"
                  style={{ width: 244, marginLeft: 8 }}
                  fieldProps={{
                    showSearch: true,
                    dropdownMatchSelectWidth: false,
                    onClear: () => {
                      setListParams({ ...listParams, area: '' });
                    },
                    onSelect: (value) => {
                      setListParams({ ...listParams, area: value });
                    },
                  }}
                  debounceTime={300}
                  request={async (e: any) => {
                    const data = await getAreaList({ name: e.keyWords ? e.keyWords : '', maxData: 200 });
                    return data.map((item: any) => ({
                      label: item.displayName,
                      value: item.areaId,
                    }));
                  }}
                />
                <ProFormSelect
                  placeholder="请选择科室"
                  name="deptId"
                  style={{ width: 160, marginLeft: 8 }}
                  fieldProps={{
                    showSearch: true,
                    dropdownMatchSelectWidth: false,
                    onClear: () => {
                      setListParams({ ...listParams, deptId: '' });
                    },
                    onSelect: (value) => {
                      setListParams({ ...listParams, deptId: value });
                    },
                  }}
                  debounceTime={300}
                  request={async () => {
                    const data = await getDeptList();
                    return data.map((item: any) => ({
                      label: item.deptName,
                      value: item.deptId,
                    }));
                  }}
                />
                <ProFormSelect
                  placeholder="请选择职称"
                  name="doctorTitleId"
                  style={{ width: 160, marginLeft: 8 }}
                  fieldProps={{
                    onClear: () => {
                      setListParams({ ...listParams, doctorTitleId: '' });
                    },
                    onSelect: (value) => {
                      setListParams({ ...listParams, doctorTitleId: value });
                    },
                  }}
                  request={async () => {
                    const data = await getDoctorTitleList();
                    return data[0].doctorTitleList.map((item: any) => ({
                      label: item.doctorTitleName,
                      value: item.doctorTitleId,
                    }));
                  }}
                />{' '}
                <ProFormSelect
                  placeholder="请选择项目"
                  name="projectId"
                  style={{ width: 160, marginLeft: 8 }}
                  fieldProps={{
                    onClear: () => {
                      setListParams({ ...listParams, projectId: '' });
                    },
                    onSelect: (value) => {
                      setListParams({ ...listParams, projectId: value });
                    },
                  }}
                  request={async () => {
                    const data = await projectItemList();
                    return data.map((item: any) => ({
                      label: item.projectName,
                      value: item.projectId,
                    }));
                  }}
                />{' '}
                <ProFormSelect
                  placeholder="工作证明审核"
                  name="verifyStatus"
                  style={{ width: 160, marginLeft: 8 }}
                  fieldProps={{
                    onClear: () => {
                      setListParams({ ...listParams, verifyStatus: '' });
                    },
                    onSelect: (value) => {
                      setListParams({ ...listParams, verifyStatus: value });
                    },
                  }}
                  request={async () => {
                    const data = await verifyStatusList();
                    const arr: any = [];
                    data.forEach((item: any) => {
                      if (item.text !== '审批通过') {
                        arr.push({
                          label: item.text,
                          value: item.value,
                        });
                      }
                    });
                    return arr;
                  }}
                />
              </Space>
            </div>
          ),
          subTitle: (
            <div>
              <Space style={{ marginLeft: -8 }}>
                <Input.Search style={{ width: 160 }} placeholder="综合查询" allowClear onSearch={(e) => setListParams({ ...listParams, keyWord: e })} />
                <Checkbox
                  style={{ marginTop: 4, marginLeft: 8 }}
                  onChange={(e: CheckboxChangeEvent) => setListParams({ ...listParams, isRegister: e.target.checked ? true : null })}
                >
                  仅显示注册用户
                </Checkbox>
                <Checkbox
                  style={{ marginTop: 4 }}
                  onChange={(e: CheckboxChangeEvent) => setListParams({ ...listParams, status: e.target.checked ? 'ACTIVE' : null })}
                >
                  显示建档客户
                </Checkbox>
                <Checkbox
                  style={{ marginTop: 4 }}
                  onChange={(e: CheckboxChangeEvent) => setListParams({ ...listParams, status: e.target.checked ? 'INACTIVE' : null })}
                >
                  显示无效客户
                </Checkbox>
                <Checkbox
                  style={{ marginTop: 4 }}
                  onChange={(e: CheckboxChangeEvent) => setListParams({ ...listParams, isFriendContact: e.target.checked ? true : null })}
                >
                  显示小爱好友
                </Checkbox>
              </Space>
            </div>
          ),
        }}
      />

      <Modal
        width={480}
        title={
          <div className="color-text-85 font-16" style={{ fontWeight: 600, height: 56, lineHeight: '56px', borderBottom: '1px solid #eee', paddingLeft: 24 }}>
            外部联系人
          </div>
        }
        footer={null}
        open={isModalOpen}
        className={styles.modal}
        onCancel={() => setIsModalOpen(false)}
      >
        <div style={{ padding: '10px 24px 24px' }}>
          <div style={{ display: 'flex' }}>
            <div className="color-text-85 font-14 margin-right16">添加企微</div>
            <div
              style={{
                width: 352,
                height: 54,
                background: '#F5F5F5',
                paddingLeft: 12,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderRadius: 6,
              }}
            >
              <div className="color-text-88 font-14">{contaceData?.typeName}</div> <div className="color-text-88 font-14">{contaceData?.createStamp}</div>
            </div>
          </div>
          <div style={{ display: 'flex', marginTop: 24 }}>
            <div className="color-text-85 font-14 margin-right16">企微好友</div>
            <div style={{ width: 352, height: 32, lineHeight: '32px', background: '#F5F5F5', paddingLeft: 12, borderRadius: 6 }}>
              {contaceData?.relationStaffNames}
            </div>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
};

export default ClientAll;
