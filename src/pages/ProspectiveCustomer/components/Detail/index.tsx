import {
  createDoctorArchives,
  doctorUserRevokeAsync,
  getDeptList,
  getDoctorDetail,
  getDoctorProfessional,
  getDoctorTitleList,
  getDoctorWechatInfo,
  getDoctorWorkplace,
  getRepList,
  inputInviteCode,
  searchHospitalName,
  sendCompleteInfoMessage,
  sendRefuseMessage,
} from '@/pages/ProspectiveCustomer/api';
import { history, useSearchParams } from '@umijs/max';
import { Button, Checkbox, Empty, Form, Image, message, Popconfirm, Space, Tabs, Tag, Upload } from 'antd';
import { Fragment, useEffect, useState } from 'react';

import { DeleteOutlined, ExclamationCircleFilled, EyeInvisibleOutlined, EyeOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { request } from '@umijs/max';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import styles from './index.less';

const DetailComponent = () => {
  const [getParams, setParams] = useSearchParams();
  const [doctorDetail, setDoctorDetail] = useState<any>();
  const [mobileFlag, setMobileFlag] = useState<boolean>(false);
  const [practiceSite, setpracticeSite] = useState<any>(undefined); //执业
  const [wechatInfo, setwechatInfo] = useState<any>(undefined); //微信
  const [specialtyInfo, setSpecialtyInfo] = useState<any>(undefined); // 专业
  const [imageUrl, setImageUrl] = useState<any>([]);
  const [imgPreview, setImgPreview] = useState<string>();
  const [visible, setVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [indentityCodeFlag, setIndentityCodeFlag] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(true);
  const [popconfirm, setPopconfirm] = useState<boolean>(false);

  // 详情
  const queryGetDoctorDetail = async () => {
    const res = await getDoctorDetail(getParams.get('doctorId'));
    setDoctorDetail(res);
  };

  // 执业点
  const queryGetDoctorWorkplace = async () => {
    const res = await getDoctorWorkplace(getParams.get('doctorId'));
    setpracticeSite(res);
  };

  // 微信信息
  const queryGetDoctorWechatInfo = async () => {
    const res = await getDoctorWechatInfo(getParams.get('doctorId'));
    setwechatInfo(res);
  };

  // 专业信息
  const queryGetDoctorProfessional = async () => {
    const res = await getDoctorProfessional(getParams.get('doctorId'));
    setSpecialtyInfo(res);
  };

  useEffect(() => {
    queryGetDoctorDetail();
    queryGetDoctorWorkplace();
    queryGetDoctorWechatInfo();
    queryGetDoctorProfessional();
  }, []);

  const handleOnRemove = (uid: string) => {
    imageUrl.splice(
      imageUrl.findIndex((item: any) => item.uid === uid),
      1,
    );
    setImageUrl([...imageUrl]);
  };

  const handleOnPreview = (uid: string) => {
    setImgPreview(imageUrl.find((item: any) => item.uid === uid).url);
    setVisible(true);
  };

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

  // 消息通知
  const handleInform = async () => {
    setPopconfirm(true);
    let informObj: ProspectiveCustomer.Inform = {
      repId: wechatInfo?.inviteRepId || '',
      doctorId: doctorDetail?.doctorId || '',
    };
    if (doctorDetail?.approveStatus === 'REFUSED') {
      const res = await sendRefuseMessage(informObj);
      message.success('提醒成功');
      setPopconfirm(false);
    } else {
      const res = await sendCompleteInfoMessage(informObj);
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

  return (
    <div className={`${styles.detailBox} padding-tb-24`}>
      <header className="padding-lr-24">
        <div className={`${styles.head} border-r-2`}>
          <img className="imgHeight" src={doctorDetail?.avatarUrl || 'https://ww-cdn.oss-cn-shanghai.aliyuncs.com/pic/platform/platform-profile_photo.png'} />
        </div>
        <div className={`${styles.headerContent} margin-left10`}>
          <div>
            <Space>
              <span style={{ color: '#262626', fontSize: 16, fontWeight: 600, marginRight: 4 }}>{doctorDetail?.doctorName}</span>
              {doctorDetail?.isContact === 1 ? <Tag color="processing">外部联系人</Tag> : null}
            </Space>
            <div style={{ display: 'flex', marginBottom: 4 }}>
              {doctorDetail?.mobile && (
                <Fragment>
                  {mobileFlag ? (
                    <div style={{ width: 84 }}>{doctorDetail?.mobile}</div>
                  ) : (
                    <div style={{ width: 84 }}>{`${doctorDetail?.mobile?.substring(0, 3)}****${doctorDetail?.mobile?.substring(7)}`}</div>
                  )}
                  {doctorDetail?.mobileQcellcore && <div style={{ marginRight: 10 }} className="font-14">{`(${doctorDetail?.mobileQcellcore})`}</div>}
                  {mobileFlag ? (
                    <EyeInvisibleOutlined style={{ marginRight: 10, marginLeft: 4, cursor: 'pointer' }} onClick={() => setMobileFlag(!mobileFlag)} />
                  ) : (
                    <EyeOutlined style={{ marginRight: 10, marginLeft: 4, cursor: 'pointer' }} onClick={() => setMobileFlag(!mobileFlag)} />
                  )}
                </Fragment>
              )}
              <span>
                {doctorDetail?.mobileVerify === '不一致' ? (
                  <Tag color="error">{doctorDetail?.mobileVerify}</Tag>
                ) : doctorDetail?.mobileVerify === '已实名' ? (
                  <Tag color="#87d068">{doctorDetail.mobileVerify}</Tag>
                ) : (
                  ''
                )}
              </span>
            </div>
          </div>
          <div>
            <a href="#" style={{ color: 'var(--color-primary)', marginRight: 4, fontWeight: 600 }}>
              {doctorDetail?.doctorId}
            </a>
            {doctorDetail?.registStatus === '已注册' ? <Tag color="success">{doctorDetail?.registStatus}</Tag> : null}
          </div>
        </div>
        <div style={{ position: 'absolute', right: '24px', top: 0 }}>
          <Space>
            <ModalForm
              title={<div>{wechatInfo?.inviteCode ? '修改邀请码' : '补录邀请码'}</div>}
              width={480}
              trigger={
                <Button type="primary" ghost style={{ marginRight: 12 }}>
                  {wechatInfo?.inviteCode ? '修改邀请码' : '补录邀请码'}
                </Button>
              }
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
                  doctorUserId: doctorDetail.doctorUserId,
                  doctorId: doctorDetail.doctorId,
                  repInfo: values.repInfo,
                  isSendMsg: checked,
                });
                if (res) {
                  message.success('邀请码补录成功！');
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
                医生姓名：<span className="font-w6 color-error">{doctorDetail?.doctorName}</span>
              </div>
              <div>
                <ExclamationCircleFilled style={{ color: '#FAAD14', fontSize: 16, marginRight: 4 }} />
                由此医职人上传工作证明，系统即刻推送消息通知TA，请谨慎操作！
              </div>
            </ModalForm>
          </Space>
          {(wechatInfo?.inviteRepId && doctorDetail?.approveStatus === 'DRAFT') || doctorDetail?.approveStatus === 'REFUSED' ? (
            <Popconfirm title="确定发起此次通知?" onConfirm={() => handleInform()} okText="确定" cancelText="取消" okButtonProps={{ loading: popconfirm }}>
              <Button type="primary">点击通知医职人</Button>
            </Popconfirm>
          ) : null}
          {!wechatInfo?.inviteRepId || doctorDetail?.approveStatus === 'DRAFT' || doctorDetail?.approveStatus === 'REFUSED' ? (
            <Space>
              <ModalForm
                width={480}
                title="建档"
                trigger={
                  <Button type="primary" style={{ marginLeft: 12 }}>
                    建档
                  </Button>
                }
                layout="horizontal"
                modalProps={{
                  destroyOnClose: true,
                }}
                initialValues={{
                  doctorId: doctorDetail?.doctorId || '',
                  filledHospitalName: doctorDetail?.hospitalName || '',
                  filledDeptName: doctorDetail?.deptName || '',
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
                    doctorUserId: doctorDetail.doctorUserId || '',
                    doctorKeyId: doctorDetail.doctorKeyId || '',
                  };
                  const res = await createDoctorArchives(obj);
                  history.push(`/physician-management/prospective-customer`);
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
          ) : null}
        </div>
      </header>
      <div style={{ padding: '0 24px' }}>
        <Tabs items={[{ key: 'articles', label: '档案' }]} />
      </div>
      <div className={styles.content}>
        {/*  基础信息*/}
        <div className={`${styles.contentItem} padding-lr-24`}>
          <div className="font-w6 margin-bottom12 font-size14 color-text85">基础信息</div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ width: 70, height: 20 }}>
              医生类型：
            </div>
            <div className={styles.fontColor}>{doctorDetail?.doctorTypeName}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ width: 70, height: 20 }}>
              职称：
            </div>
            <div className={styles.fontColor}>{doctorDetail?.doctorTitleName}</div>
          </div>
        </div>
        {/* 执业点 */}
        <div
          className={`${styles.contentItem} padding-lr-24`}
          style={{
            borderLeft: '1px dashed var(--color-text-06)',
            borderRight: '1px dashed var(--color-text-06)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="font-w6 margin-bottom12 font-size14 color-text85">执业点</div>
            <div>
              {doctorDetail?.approveStatus === 'DRAFT' && (
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-warning)' }}>
                  <div style={{ width: 8, height: 8, background: 'var(--color-warning)', marginRight: 8, borderRadius: '50%' }}></div>待提交
                </div>
              )}
              {doctorDetail?.approveStatus === 'SUBMITTED' && (
                <div style={{ display: 'flex', alignItems: 'center', color: 'var( --under-review)' }}>
                  <div style={{ width: 8, height: 8, background: 'var( --under-review)', marginRight: 8, borderRadius: '50%' }}></div>审核中
                </div>
              )}
              {doctorDetail?.approveStatus === 'REFUSED' && (
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-error)' }}>
                  <div style={{ width: 8, height: 8, background: 'var(--color-error)', marginRight: 8, borderRadius: '50%' }}></div>审核不通过
                </div>
              )}
            </div>
          </div>
          {practiceSite?.length > 0 ? (
            practiceSite?.map((item: any, index: number) => (
              <div className={`${styles.wechatBorder} padding12 margin-bottom12 border-r-6`} key={index}>
                <div>{item.hospitalName}</div>
                <div style={{ color: 'var(--color-text-65)' }}>{item.deptName}</div>
              </div>
            ))
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Empty />
            </div>
          )}
        </div>
        {/*专业信息  */}
        <div className={`${styles.contentItem} padding-lr-24`} style={{ borderRight: '1px dashed var(--color-text-06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="font-w6 margin-bottom12 font-size14 color-text85">专业信息</div>
            <div>
              {doctorDetail?.approveStatus === 'DRAFT' && (
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-warning)' }}>
                  <div style={{ width: 8, height: 8, background: 'var(--color-warning)', marginRight: 8, borderRadius: '50%' }}></div>待提交
                </div>
              )}
              {doctorDetail?.approveStatus === 'SUBMITTED' && (
                <div style={{ display: 'flex', alignItems: 'center', color: 'var( --under-review)' }}>
                  <div style={{ width: 8, height: 8, background: 'var( --under-review)', marginRight: 8, borderRadius: '50%' }}></div>审核中
                </div>
              )}
              {doctorDetail?.approveStatus === 'REFUSED' && (
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-error)' }}>
                  <div style={{ width: 8, height: 8, background: 'var(--color-error)', marginRight: 8, borderRadius: '50%' }}></div>审核不通过
                </div>
              )}
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ width: 70, height: 20 }}>
              身份证号：
            </div>
            {doctorDetail?.approveStatus !== 'DRAFT' ? (
              <div style={{ display: 'flex', height: 20, alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', height: 20, width: 140 }}>
                  {indentityCodeFlag ? specialtyInfo?.indentityCode : '***********************'}
                </div>
                {indentityCodeFlag ? (
                  <EyeInvisibleOutlined
                    style={{ marginRight: 10, marginLeft: 4, cursor: 'pointer', marginTop: -2 }}
                    onClick={() => setIndentityCodeFlag(!indentityCodeFlag)}
                  />
                ) : (
                  <EyeOutlined
                    style={{ marginRight: 10, marginLeft: 4, cursor: 'pointer', marginTop: -2 }}
                    onClick={() => setIndentityCodeFlag(!indentityCodeFlag)}
                  />
                )}
              </div>
            ) : null}
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
            <div className={styles.fontColor}>{specialtyInfo?.credentialIssueAgency}</div>
          </div>
          {/* credentialPhotoUrl */}
          {/* credentialPhotoUrl2 */}
          {/* credentialPhotoUrl3 */}
          {/* 'https://ww-cdn.oss-cn-shanghai.aliyuncs.com/pic/platform/platform-profile_photo.png' */}
          <div style={{ display: 'flex' }}>
            {specialtyInfo?.credentialPhotoUrl && (
              <div className={`${styles.imgDiv} padding6  border-r-8`}>
                <Image height={48} width={48} src={specialtyInfo?.credentialPhotoUrl} preview={{ src: specialtyInfo?.credentialPhotoUrl }} />
                {/* <Image src={specialtyInfo?.credentialPhotoUrl || 'https://ww-cdn.oss-cn-shanghai.aliyuncs.com/pic/platform/platform-profile_photo.png'} preview={{ src: specialtyInfo?.credentialPhotoUrl || 'https://ww-cdn.oss-cn-shanghai.aliyuncs.com/pic/platform/platform-profile_photo.png' }} /> */}
              </div>
            )}
            {specialtyInfo?.credentialPhotoUrl2 && (
              <div className={`${styles.imgDiv} padding6 border-r-8`} style={{ margin: '0 4px' }}>
                <Image height={48} width={48} src={specialtyInfo?.credentialPhotoUrl2} preview={{ src: specialtyInfo?.credentialPhotoUrl2 }} />
              </div>
            )}
            {specialtyInfo?.credentialPhotoUrl3 && (
              <div className={`${styles.imgDiv} padding6 border-r-8`}>
                <Image height={48} width={48} src={specialtyInfo?.credentialPhotoUrl3} preview={{ src: specialtyInfo?.credentialPhotoUrl3 }} />
              </div>
            )}
          </div>
          <div style={{ color: 'var(--color-success)', fontSize: 14, height: 20, marginBottom: 12, marginTop: 4 }}>执业证书</div>
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
            <div style={{ color: 'var(--color-text-85)' }}>{specialtyInfo?.licenseArea}</div>
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
              <div className={`${styles.imgDiv} padding6 imgHeight`}>
                <Image height={48} width={48} src={specialtyInfo?.licensePhotoUrl} preview={{ src: specialtyInfo?.licensePhotoUrl }} />
              </div>
            )}
            {specialtyInfo?.licensePhotoUrl2 && (
              <div className={`${styles.imgDiv} padding6 imgHeight`} style={{ margin: '0 4px' }}>
                <Image height={48} width={48} src={specialtyInfo?.licensePhotoUrl2} preview={{ src: specialtyInfo?.licensePhotoUrl2 }} />
              </div>
            )}
            {specialtyInfo?.licensePhotoUrl3 && (
              <div className={`${styles.imgDiv} padding6 imgHeight`}>
                <Image height={48} width={48} src={specialtyInfo?.licensePhotoUrl3} preview={{ src: specialtyInfo?.licensePhotoUrl3 }} />
              </div>
            )}
          </div>
        </div>
        {/*  微信信息*/}
        <div className={`${styles.contentItem} padding-lr-24`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="font-w6 margin-bottom12 font-size14 color-text85">微信信息</div>
            {wechatInfo ? (
              <Space>
                <ModalForm
                  title={
                    <div>
                      <ExclamationCircleFilled style={{ color: '#FAAD14', fontSize: 21, marginRight: 12 }} />
                      提示
                    </div>
                  }
                  width={400}
                  trigger={
                    <div className="color-text-25" style={{ cursor: 'pointer' }}>
                      <DeleteOutlined className="color-text-25" style={{ marginRight: 2 }} /> 注销
                    </div>
                  }
                  layout="horizontal"
                  onOpenChange={() => setChecked(true)}
                  modalProps={{
                    destroyOnClose: true,
                  }}
                  submitter={{
                    searchConfig: {
                      submitText: '确认',
                      resetText: '取消',
                    },
                  }}
                  onFinish={async (values) => {
                    const res = await doctorUserRevokeAsync({ doctorUserId: doctorDetail?.doctorUserId, reason: values.reason });
                    if (res) {
                      message.success('删除成功！');
                      await queryGetDoctorWechatInfo();
                    }
                    return true;
                  }}
                >
                  <div style={{ paddingLeft: 33 }}>
                    <div className="color-text-88 margin-bottom12">注销微信即将此微信从平台注销，请再次确认是否注销？</div>
                    <ProFormTextArea placeholder="请输入原因" name="reason" rules={[{ required: true, message: '请输入原因!' }]} />
                  </div>
                </ModalForm>
              </Space>
            ) : null}
          </div>

          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              邀请人：
            </div>
            {wechatInfo?.inviteRepId && (
              <div className={styles.fontColor}>
                {wechatInfo?.inviteRepName} &nbsp;{<a className="font-14">({wechatInfo?.inviteRepId})</a>}
              </div>
            )}
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              注册时间：
            </div>
            <div className={styles.fontColor}>{wechatInfo?.registTime}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              注册来源：
            </div>
            <div className={styles.fontColor}>
              {wechatInfo?.registFrom}&nbsp;{`(${wechatInfo?.registFromType})`}
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              添加企微：
            </div>
            <div>
              <div>
                {wechatInfo?.contactBindType}
                {wechatInfo?.contactCreateUser ? `(${wechatInfo?.contactCreateUser})` : null}
              </div>
              <div>{wechatInfo?.contactCreateStamp}</div>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              企微好友：
            </div>
            <div>{wechatInfo?.contactFriendList}</div>
          </div>
          <div>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              活跃平台：
            </div>
          </div>
          {wechatInfo?.platFormTraceList?.map((item: any, index: number) => (
            <div className={`${styles.wechatBorder} padding12 margin-bottom12 border-r-6`} key={index}>
              <div>
                {item.isSubscribe && (
                  <Tag style={{ marginRight: 2 }} color="success">
                    已关注
                  </Tag>
                )}
                {item.appName}
                {item.appType ? `（${item.appType}）` : null}
              </div>
              <div style={{ color: 'var(--color-text-45)', fontSize: 12, marginTop: 4 }}>上次访问时间：{item.lastAccessTime}</div>
            </div>
          ))}
        </div>
      </div>
      {imgPreview && <Image src={imgPreview} style={{ display: 'none' }} preview={{ visible, src: imgPreview, onVisibleChange: setVisible }}></Image>}
    </div>
  );
};

export default DetailComponent;
