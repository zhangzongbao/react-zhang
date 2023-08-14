import {
  exportDoctor,
  getAreaList,
  getDeptList,
  getDoctorProfessional,
  getDoctorTitleList,
  projectItemList,
  searchClient,
  searchHospitalName,
} from '@/pages/ClientManage/api';
import { CheckOutlined, EyeInvisibleOutlined, EyeOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';
import { DrawerForm, ProColumns, ProFormSelect, ProTable } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import { useModel } from '@umijs/max';
import { Button, Checkbox, Image, Input, message, Space, Tag } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Fragment, useRef, useState } from 'react';
import { Link } from 'umi';
import PracticeSiteAddEdit from './components/PracticeSiteAddEdit';
import styles from './index.less';

const ClientManage = () => {
  const { paginationSize, changePaginationSize } = useModel('paginationSize');
  const { tableSize, changeTableSize } = useModel('tableSize');
  const ref = useRef<any>();
  const [specialtyInfo, setSpecialtyInfo] = useState<any>(undefined); // 专业
  const [indentityCodeFlag, setIndentityCodeFlag] = useState<boolean>(false);
  const [listParams, setListParams] = useState<number | any>({
    name: '',
    hospital: '',
    areaId: '',
    deptId: '',
    doctorTitleId: '',
    onlyRegistUser: false,
    projectId: '',
    orderParam: {
      field: '',
      orderType: 0,
    },
  });

  console.log('webStrom');

  // 专业信息
  const queryGetDoctorProfessional = async (doctorId: string) => {
    const res = await getDoctorProfessional(doctorId);
    setSpecialtyInfo(res);
  };

  const columns: ProColumns<ClientManage.DoctorItem>[] = [
    {
      title: '医生编码',
      dataIndex: 'doctorId',
      align: 'left',
      width: 80,
      sorter: true,
      render: (_, record) => (
        <Link target="_blank" to={`/physician-management/client-manage/detail?doctorId=${record.doctorId}`}>
          {record.doctorId}
        </Link>
      ),
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
      title: '微信注册',
      dataIndex: 'registStatus',
      align: 'left',
      width: 80,
      sorter: true,
      render: (_, record) => (
        <div>
          {record.registStatus === '已注册' && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 8, height: 8, background: 'var( --color-success)', marginRight: 8, borderRadius: '50%' }}></div>
              {record.registStatus}
            </div>
          )}
        </div>
      ),
    },
    {
      title: '邀请医职人',
      dataIndex: 'inviteRepName',
      align: 'left',
      width: 120,
      sorter: true,
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
      render: (_, record) => <>{<PracticeSiteAddEdit workplaceCount={record.workplaceCount} doctorId={record.doctorId} btnFlag="list" />}</>,
    },
    {
      title: '首要任职医院',
      dataIndex: 'hospitalName',
      align: 'left',
      width: 80,
      sorter: true,
    },
    {
      title: '省市区县',
      dataIndex: 'area',
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
      title: '专业信息',
      dataIndex: 'x',
      align: 'left',
      width: 80,
      render: (_, record) => (
        <Fragment>
          {record.isProfessionalVerified ? (
            <Space>
              <DrawerForm
                title="专业信息"
                width={420}
                trigger={<CheckOutlined onClick={() => queryGetDoctorProfessional(record.doctorId)} style={{ color: 'var(--color-primary)' }} />}
                layout="horizontal"
                submitter={false}
              >
                {/*专业信息  */}
                <div className={`${styles.contentItem} padding-lr-24`} style={{ borderRight: '1px dashed var(--color-text-06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="font-w6 margin-bottom12 font-size14 color-text85">专业信息</div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <div className="margin-bottom12 color-title font-w6" style={{ width: 70, height: 20 }}>
                      身份证号：
                    </div>
                    {specialtyInfo?.indentityCode && (
                      <Fragment>
                        {indentityCodeFlag ? (
                          <div style={{ display: 'flex', height: 20, alignItems: 'center' }}>
                            <div style={{ width: 146 }}>{specialtyInfo?.indentityCode}</div>
                            <EyeInvisibleOutlined
                              style={{ marginRight: 10, marginLeft: 4, cursor: 'pointer' }}
                              onClick={() => setIndentityCodeFlag(!indentityCodeFlag)}
                            />
                          </div>
                        ) : (
                          <div style={{ display: 'flex', height: 20, alignItems: 'center' }}>
                            <div style={{ width: 146 }}>***********************</div>
                            <EyeOutlined
                              style={{ marginRight: 10, marginLeft: 4, cursor: 'pointer' }}
                              onClick={() => setIndentityCodeFlag(!indentityCodeFlag)}
                            />
                          </div>
                        )}
                      </Fragment>
                    )}
                  </div>
                  <div style={{ color: 'var(--color-error)', fontSize: 14, height: 20, marginBottom: 12 }}>资格证书</div>
                  <div style={{ display: 'flex' }}>
                    <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                      证书编码：
                    </div>
                    <div>{specialtyInfo?.credentialCode}</div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                      发证日期：
                    </div>
                    <div>{specialtyInfo?.credentialIssueDate}</div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                      签发机关：
                    </div>
                    <div>{specialtyInfo?.credentialIssueAgency}</div>
                  </div>
                  {/* credentialPhotoUrl */}
                  {/* credentialPhotoUrl2 */}
                  {/* credentialPhotoUrl3 */}
                  {/* 'https://ww-cdn.oss-cn-shanghai.aliyuncs.com/pic/platform/platform-profile_photo.png' */}
                  <div style={{ display: 'flex' }}>
                    {specialtyInfo?.credentialPhotoUrl && (
                      <div className={`${styles.imgDiv} padding6  border-r-8`}>
                        <Image height={58} width={58} src={specialtyInfo?.credentialPhotoUrl} preview={{ src: specialtyInfo?.credentialPhotoUrl }} />
                        {/* <Image src={specialtyInfo?.credentialPhotoUrl || 'https://ww-cdn.oss-cn-shanghai.aliyuncs.com/pic/platform/platform-profile_photo.png'} preview={{ src: specialtyInfo?.credentialPhotoUrl || 'https://ww-cdn.oss-cn-shanghai.aliyuncs.com/pic/platform/platform-profile_photo.png' }} /> */}
                      </div>
                    )}
                    {specialtyInfo?.credentialPhotoUrl2 && (
                      <div className={`${styles.imgDiv} padding6 border-r-8`} style={{ margin: '0 4px' }}>
                        <Image height={58} width={58} src={specialtyInfo?.credentialPhotoUrl2} preview={{ src: specialtyInfo?.credentialPhotoUrl2 }} />
                      </div>
                    )}
                    {specialtyInfo?.credentialPhotoUrl3 && (
                      <div className={`${styles.imgDiv} padding6 border-r-8`}>
                        <Image height={58} width={58} src={specialtyInfo?.credentialPhotoUrl3} preview={{ src: specialtyInfo?.credentialPhotoUrl3 }} />
                      </div>
                    )}
                  </div>
                  <div style={{ color: 'var(--color-success)', fontSize: 14, height: 20, marginBottom: 12, marginTop: 12 }}>执业证书</div>
                  <div style={{ display: 'flex' }}>
                    <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                      证书编码：
                    </div>
                    <div style={{ color: 'var(--color-text-85)' }}>{specialtyInfo?.licenseCode}</div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                      发证日期：
                    </div>
                    <div style={{ color: 'var(--color-text-85)' }}>{specialtyInfo?.licenseIssueDate}</div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                      签发机关：
                    </div>
                    <div style={{ color: 'var(--color-text-85)' }}>{specialtyInfo?.licenseIssueAgency}</div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                      执业类别：
                    </div>
                    <div style={{ color: 'var(--color-text-85)' }}>{specialtyInfo?.licenseType}</div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                      执业范围：
                    </div>
                    <div style={{ color: 'var(--color-text-85)' }}>{specialtyInfo?.licenseScope}</div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                      执业地点：
                    </div>
                    <div style={{ color: 'var(--color-text-85)' }}>{specialtyInfo?.licenseSite}</div>
                  </div>
                  {/* licensePhotoUrl */}
                  {/* licensePhotoUrl2 */}
                  {/* licensePhotoUrl3 */}
                  {/* 'https://ww-cdn.oss-cn-shanghai.aliyuncs.com/pic/platform/platform-profile_photo.png' */}
                  <div style={{ display: 'flex' }}>
                    {specialtyInfo?.licensePhotoUrl && (
                      <div className={`${styles.imgDiv} padding6 imgHeight border-r-8`}>
                        <Image height={58} width={58} src={specialtyInfo?.licensePhotoUrl} preview={{ src: specialtyInfo?.licensePhotoUrl }} />
                      </div>
                    )}
                    {specialtyInfo?.licensePhotoUrl2 && (
                      <div className={`${styles.imgDiv} padding6 imgHeight border-r-8`} style={{ margin: '0 4px' }}>
                        <Image height={58} width={58} src={specialtyInfo?.licensePhotoUrl2} preview={{ src: specialtyInfo?.licensePhotoUrl2 }} />
                      </div>
                    )}
                    {specialtyInfo?.licensePhotoUrl3 && (
                      <div className={`${styles.imgDiv} padding6 imgHeight border-r-8`}>
                        <Image height={58} width={58} src={specialtyInfo?.licensePhotoUrl3} preview={{ src: specialtyInfo?.licensePhotoUrl3 }} />
                      </div>
                    )}
                  </div>
                </div>
              </DrawerForm>
            </Space>
          ) : (
            '-'
          )}
        </Fragment>
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
      aLink.name = '建档客户';
      aLink.download = '建档客户.xlsx';
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink); //点击完成后记得删除创建的链接
      message.success('导出成功');
    }
  };

  return (
    <PageContainer header={{ breadcrumb: {} }}>
      <ProTable<ClientManage.DoctorItem>
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
          console.log(sort, 'sort');
          const { data, dataCount } = await searchClient({
            pageIndex: params.current,
            pageSize: params.pageSize,
            name: params.name,
            hospital: params.hospital,
            areaId: params.areaId,
            deptId: params.deptId,
            projectId: params.projectId,
            doctorTitleId: params.doctorTitleId,
            onlyRegistUser: params.onlyRegistUser,
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
          <Button key="3" type="primary" onClick={() => message.error('暂无此功能')}>
            新增
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
                  name="hospital"
                  style={{ width: 244, marginLeft: 8 }}
                  fieldProps={{
                    showSearch: true,
                    dropdownMatchSelectWidth: false,
                    onClear: () => {
                      setListParams({ ...listParams, hospital: '' });
                    },
                    onSelect: (value) => {
                      setListParams({ ...listParams, hospital: value?.split('-')[1] });
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
                  name="areaId"
                  style={{ width: 244, marginLeft: 8 }}
                  fieldProps={{
                    showSearch: true,
                    dropdownMatchSelectWidth: false,
                    onClear: () => {
                      setListParams({ ...listParams, areaId: '' });
                    },
                    onSelect: (value) => {
                      setListParams({ ...listParams, areaId: value });
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
                />
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
                />
              </Space>
            </div>
          ),
          subTitle: (
            <div>
              <Space style={{ marginLeft: -8 }}>
                <Input.Search style={{ width: 160 }} placeholder="综合查询" allowClear onSearch={(e) => setListParams({ ...listParams, name: e })} />
                <Checkbox
                  style={{ marginTop: 4, marginLeft: 8 }}
                  onChange={(e: CheckboxChangeEvent) => setListParams({ ...listParams, onlyRegistUser: e.target.checked })}
                >
                  仅显示注册用户
                </Checkbox>
              </Space>
            </div>
          ),
        }}
      />
    </PageContainer>
  );
};

export default ClientManage;
