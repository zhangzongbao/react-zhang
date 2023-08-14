import {
  createDoctorArchives,
  getAppList,
  getDeptList,
  getDoctorTitleList,
  getRepList,
  inputInviteCode,
  projectItemList,
  searchHospitalName,
  searchPotentialClient,
  sendCompleteInfoMessage,
  sendRefuseMessage,
} from '@/pages/ProspectiveCustomer/api';
import { ExclamationCircleFilled, LoadingOutlined, ManOutlined, PlusOutlined, WomanOutlined } from '@ant-design/icons';
import { ModalForm, ProColumns, ProFormInstance, ProFormSelect, ProFormText, ProTable } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import { request, useModel } from '@umijs/max';
import { Button, Checkbox, Form, Image, Input, message, Popconfirm, Space, Tag, Upload } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useRef, useState } from 'react';
import { Link } from 'umi';
import styles from './index.less';

const ProspectiveCustomer = () => {
  const formRef = useRef<ProFormInstance>();
  const { paginationSize, changePaginationSize } = useModel('paginationSize');
  const { tableSize, changeTableSize } = useModel('tableSize');
  const ref = useRef<any>();
  const [listParams, setListParams] = useState<number | any>({
    name: '',
    appId: '',
    workplaceApproveStatus: '',
    projectId: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<any>([]);
  const [imgPreview, setImgPreview] = useState<string>();
  const [visible, setVisible] = useState<boolean>(true);
  const [checked, setChecked] = useState<boolean>(true);
  const [popconfirm, setPopconfirm] = useState<boolean>(false);

  const handleUpload = (info: any) => {
    setLoading(true);
    let formData = new FormData();
    formData.append('file', info.file, 'file.png');
    request(`/api/xiaoai/client/uploadPic`, {
      method: 'POST',
      data: formData,
    }).then((res) => {
      setLoading(false);
      setImageUrl([
        ...imageUrl,
        {
          uid: (Math.random() * 10).toFixed(4),
          name: 'image.png',
          status: 'done',
          url: res,
        },
      ]);
    });
  };

  const handleOnRemove = (uid: string) => {
    imageUrl.splice(
      imageUrl.findIndex((item: any) => item.uid === uid),
      1,
    );
    setImageUrl([...imageUrl]);
    if (imageUrl.length === 0) {
      formRef?.current?.setFieldsValue({
        workplacePhoto: '',
      });
    }
  };

  const handleOnPreview = (uid: string) => {
    setImgPreview(imageUrl.find((item: any) => item.uid === uid).url);
    setVisible(true);
  };

  // 通知
  const handleInform = async (record: any) => {
    setPopconfirm(true);
    let informObj: ProspectiveCustomer.Inform = {
      repId: record.inviteRepId || '',
      doctorId: record.doctorId || '',
    };
    if (record.approveStatus === 'REFUSED') {
      await sendRefuseMessage(informObj);
      message.success('提醒成功');
      setPopconfirm(false);
    } else {
      await sendCompleteInfoMessage(informObj);
      message.success('提醒成功');
      setPopconfirm(false);
    }
  };

  const onChangeChecked = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传照片</div>
    </div>
  );

  const columns: ProColumns<ProspectiveCustomer.DoctorItem>[] = [
    {
      title: '医生编码',
      dataIndex: 'doctorId',
      align: 'left',
      width: 80,
      sorter: true,
      render: (_, record) => (
        <Link target="_blank" to={`/physician-management/prospective-customer/detail?doctorId=${record.doctorId}`}>
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
              <WomanOutlined style={{ fontSize: 14, color: '#F58CAB' }} />
            ) : (
              <ManOutlined style={{ fontSize: 14, color: '#81A5E3' }} />
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
      title: '注册来源',
      dataIndex: 'registFrom',
      align: 'left',
      width: 80,
      sorter: true,
    },
    {
      title: '注册时间',
      dataIndex: 'registTime',
      align: 'left',
      width: 120,
      sorter: true,
    },
    {
      title: '医院',
      dataIndex: 'hospitalName',
      align: 'left',
      width: 120,
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
      title: '邀请医职人',
      dataIndex: 'doctorTitleName',
      align: 'left',
      width: 100,
      sorter: true,
      render: (_, record) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ color: 'var(--color-primary)', width: 70 }}>{record.inviteRepId}</div>&nbsp;
            <div style={{ width: 50, textAlign: 'left' }}>{record.inviteRepName}</div>&nbsp;
            {record.inviteCode && <div style={{ textAlign: 'left' }}>【{record.inviteCode}】</div>}
          </div>
        );
      },
    },
    {
      title: '通知',
      // title: <div onClick={() => setSortObj({ field: 'inviteRepName', orderType: sortObj.orderType === 0 ? 1 : 0 })}>通知</div>,
      dataIndex: 'inviteRepName',
      align: 'left',
      width: 80,
      // sorter: true,
      render: (_, record) => (
        <div>
          {(record.approveStatus === 'DRAFT' || record.approveStatus === 'REFUSED') && record.inviteRepId ? (
            <Popconfirm
              title="确定发起此次通知?"
              onConfirm={() => handleInform(record)}
              okText="确定"
              cancelText="取消"
              okButtonProps={{ loading: popconfirm }}
            >
              <Button type="primary" size="small">
                点击通知
              </Button>
            </Popconfirm>
          ) : null}
          &nbsp;
          {record.lastSendStamp && <span>上次通知时间：{record.lastSendStamp}</span>}
        </div>
      ),
    },
    {
      title: '执业点',
      dataIndex: 'approveStatus',
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
      },
    },
    {
      title: '操作',
      dataIndex: 'x',
      width: 100,
      align: 'left',
      key: 'option',
      fixed: 'right',
      render: (_, record) => {
        return (
          <div>
            <a className="font-14">
              <Space>
                <ModalForm
                  title={<div>{record.inviteCode ? '修改邀请码' : '补录邀请码'}</div>}
                  width={480}
                  trigger={<div>{record.inviteCode ? '修改邀请码' : '补录邀请码'}</div>}
                  layout="horizontal"
                  onOpenChange={() => setChecked(true)}
                  modalProps={{
                    destroyOnClose: true,
                  }}
                  submitter={{
                    searchConfig: {
                      submitText: '立即补录',
                    },
                    resetButtonProps: {
                      style: {
                        display: 'none',
                      },
                    },
                  }}
                  onFinish={async (values) => {
                    const res = await inputInviteCode({
                      doctorUserId: record.doctorUserId || '',
                      doctorId: record.doctorId || '',
                      repInfo: values.repInfo || '',
                      isSendMsg: checked,
                    });
                    if (res) {
                      message.success('邀请码补录成功！');
                      ref.current.reset();
                    }
                    return true;
                  }}
                >
                  <Form.Item label="即刻推送消息提醒医职人" className="margin-bottom12">
                    <Checkbox onChange={onChangeChecked} checked={checked}></Checkbox>
                  </Form.Item>
                  <ProFormSelect
                    width={352}
                    name="repInfo"
                    label="邀请码"
                    rules={[{ required: true, message: '请输入医职人编码或姓名!' }]}
                    placeholder="请输入医职人编码或姓名"
                    fieldProps={{
                      showSearch: true,
                      dropdownMatchSelectWidth: false,
                    }}
                    debounceTime={300}
                    request={async (e: any) => {
                      const data = await getRepList({ text: e.keyWords ? e.keyWords : '' });
                      return data.map((item: any) => ({
                        label: `${item.repName}-${item.repId}`,
                        value: item.repId,
                      }));
                    }}
                  />
                  <div className="margin-bottom12">
                    医生姓名：<span className="font-w6 color-error">{record.doctorName}</span>
                  </div>
                  <div>
                    <ExclamationCircleFilled style={{ color: '#FAAD14', fontSize: 16, marginRight: 4 }} />
                    由此医职人上传工作证明，系统即刻推送消息通知TA，请谨慎操作！
                  </div>
                </ModalForm>
              </Space>
            </a>

            {!record.inviteRepId || record.approveStatus === 'DRAFT' || record.approveStatus === 'REFUSED' ? (
              <a className="font-14 margin-left8">
                <Space>
                  <ModalForm
                    width={480}
                    title="建档"
                    trigger={<div>建档</div>}
                    layout="horizontal"
                    formRef={formRef}
                    onOpenChange={() => setImageUrl([])}
                    modalProps={{
                      destroyOnClose: true,
                    }}
                    initialValues={{
                      doctorId: record.doctorId || '',
                      filledHospitalName: record.hospitalName || '',
                      filledDeptName: record.deptName || '',
                    }}
                    onFinish={async (values) => {
                      let obj: ProspectiveCustomer.CreateDoctorArchivesParams = {
                        workplacePhotoUrl: imageUrl[0]?.url || '',
                        workplacePhotoUrl2: imageUrl[1]?.url || '',
                        workplacePhotoUrl3: imageUrl[2]?.url || '',
                        deptName: values.deptName?.split('-')[1] || '',
                        deptId: values.deptName?.split('-')[0] || '',
                        doctorTitleName: values.doctorTitleName?.split('-')[1] || '',
                        doctorTitleId: values.doctorTitleName?.split('-')[0] || '',
                        hospitalName: values.hospitalName?.split('-')[1] || '',
                        hospitalId: values.hospitalName?.split('-')[0] || '',
                        doctorId: values.doctorId || '',
                        doctorUserId: record.doctorUserId || '',
                        doctorKeyId: record.doctorKeyId || '',
                      };
                      const res = await createDoctorArchives(obj);
                      console.log(res, 'res');
                      message.success(res?.msg || res?.message || '更新成功');
                      ref.current.reset();
                      return true;
                    }}
                    labelCol={{ span: 4 }}
                    colon={false}
                  >
                    <ProFormText width={352} name="doctorId" label="医生编码" placeholder="请输入医生编码" />
                    <ProFormText width={352} name="filledHospitalName" label="已填医院" disabled placeholder="" />
                    <ProFormSelect
                      width={352}
                      name="hospitalName"
                      label="医院"
                      rules={[{ required: true, message: '请输入医院编码或名称!' }]}
                      placeholder="请输入医院编码或名称"
                      fieldProps={{
                        showSearch: true,
                        dropdownMatchSelectWidth: false,
                      }}
                      debounceTime={300}
                      request={async (e: any) => {
                        const { data } = await searchHospitalName({ name: e.keyWords });
                        return data.map((item: any) => ({
                          label: item.hospitalName,
                          value: `${item.hospitalId}-${item.hospitalName}`,
                        }));
                      }}
                    />
                    <ProFormText width={352} disabled name="filledDeptName" label="已填科室" placeholder="" />
                    <ProFormSelect
                      width={352}
                      name="deptName"
                      label="科室"
                      placeholder="请选择科室"
                      rules={[{ required: true, message: '请选择科室!' }]}
                      fieldProps={{
                        showSearch: true,
                        dropdownMatchSelectWidth: false,
                      }}
                      debounceTime={300}
                      request={async () => {
                        const data = await getDeptList();
                        return data.map((item: any) => ({
                          label: item.deptName,
                          value: `${item.deptId}-${item.deptName}`,
                        }));
                      }}
                    />
                    <ProFormSelect
                      width={352}
                      name="doctorTitleName"
                      label="职称"
                      placeholder="请选择职称"
                      fieldProps={{
                        showSearch: true,
                        dropdownMatchSelectWidth: false,
                      }}
                      debounceTime={300}
                      request={async () => {
                        const data = await getDoctorTitleList();
                        return data[0].doctorTitleList.map((item: any) => ({
                          label: item.doctorTitleName,
                          value: `${item.doctorTitleId}-${item.doctorTitleName}`,
                        }));
                      }}
                    />
                    <Form.Item name="workplacePhoto" label="工作证明" rules={[{ required: true, message: '请上传工作证明!' }]} extra="只支持.jpg/.png 格式">
                      <Upload
                        name="avatar"
                        accept=".jpg,.png"
                        listType="picture-card"
                        className="avatar-uploader"
                        fileList={imageUrl?.length > 0 ? imageUrl : []}
                        maxCount={3}
                        customRequest={handleUpload}
                        onRemove={(file) => handleOnRemove(file.uid)}
                        onPreview={(file) => handleOnPreview(file.uid)}
                      >
                        {imageUrl?.length === 3 ? null : uploadButton}
                      </Upload>
                    </Form.Item>
                  </ModalForm>
                </Space>
              </a>
            ) : null}
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer header={{ breadcrumb: {} }}>
      <ProTable<ProspectiveCustomer.DoctorItem>
        actionRef={ref}
        rowKey="doctorUserId"
        search={false}
        className={styles.prospectiveCustomer}
        columnEmptyText={false}
        columns={columns}
        columnsState={{
          persistenceKey: 'Xiaoai-ProTable-ColumnsState-ProspectiveCustomer',
          persistenceType: 'localStorage',
        }}
        params={{ ...listParams }}
        request={async (params, sort = {}) => {
          const { data, dataCount } = await searchPotentialClient({
            pageIndex: params.current,
            pageSize: params.pageSize,
            name: params.name || '',
            appId: params.appId || '',
            projectId: params.projectId || '',
            workplaceApproveStatus: params.workplaceApproveStatus || '',
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
        toolbar={{
          multipleLine: true,
          filter: (
            <div style={{ background: '#EDF1FF', width: '100%', display: 'flex', alignItems: 'center', height: 44 }} className="margin-bottom16">
              <Space>
                <ProFormSelect
                  placeholder="请选择服务号"
                  name="appId"
                  style={{ width: 160, marginLeft: 8 }}
                  fieldProps={{
                    onClear: () => {
                      setListParams({ ...listParams, appId: '' });
                    },
                    onSelect: (value) => {
                      setListParams({ ...listParams, appId: value });
                    },
                  }}
                  request={async () => {
                    const data = await getAppList();
                    return data.map((item: any) => ({
                      label: item.appName,
                      value: item.appId,
                    }));
                  }}
                />
                <ProFormSelect
                  name="workplaceApproveStatus"
                  placeholder="工作证明审核"
                  style={{ width: 160, marginLeft: 8 }}
                  fieldProps={{
                    onClear: () => {
                      setListParams({ ...listParams, workplaceApproveStatus: '' });
                    },
                    onSelect: (value) => {
                      setListParams({ ...listParams, workplaceApproveStatus: value });
                    },
                  }}
                  options={[
                    { label: '待提交', value: 'DRAFT' },
                    { label: '审核中', value: 'SUBMITTED' },
                    { label: '审核不通过', value: 'REFUSED' },
                  ]}
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
            <Space style={{ marginLeft: -8 }}>
              <Input.Search style={{ width: 160 }} placeholder="综合查询" allowClear onSearch={(e) => setListParams({ ...listParams, name: e })} />
            </Space>
          ),
        }}
      />
      {imgPreview && <Image src={imgPreview} style={{ display: 'none' }} preview={{ visible, src: imgPreview, onVisibleChange: setVisible }}></Image>}
    </PageContainer>
  );
};

export default ProspectiveCustomer;
