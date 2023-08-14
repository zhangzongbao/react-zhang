import { getDoctorDetail, getDoctorProfessional, getDoctorWechatInfo, getDoctorWorkplace, getRepList, inputInviteCode } from '@/pages/ClientAll/api';
import { ExclamationCircleFilled, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { ModalForm, ProFormSelect } from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import { Button, Checkbox, Empty, Form, Image, message, Space, Tabs, Tag } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Fragment, useEffect, useState } from 'react';
import DoctorDetailEdit from '../DoctorDetailEdit';
import PracticeSiteAddEdit from '../PracticeSiteAddEdit';
import ProfessionalEdit from '../ProfessionalEdit';
import styles from './index.less';

const DetailComponent = () => {
  const [getParams, setParams] = useSearchParams();
  const [doctorDetail, setDoctorDetail] = useState<any>();
  const [mobileFlag, setMobileFlag] = useState<boolean>(false);
  const [practiceSite, setpracticeSite] = useState<any>(undefined); //执业
  const [wechatInfo, setwechatInfo] = useState<any>(undefined); //微信
  const [specialtyInfo, setSpecialtyInfo] = useState<any>(undefined); // 专业
  const [indentityCodeFlag, setIndentityCodeFlag] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(true);

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

  return (
    <div className={`${styles.detailBox} padding-tb-24`}>
      <header className="padding-lr-24">
        <div className={`${styles.head} border-r-2`}>
          <img
            alt=""
            className="imgHeight"
            src={doctorDetail?.avatarUrl || 'https://ww-cdn.oss-cn-shanghai.aliyuncs.com/pic/platform/platform-profile_photo.png'}
          />
        </div>
        <div className={`${styles.headerContent} margin-left10`}>
          <div>
            <span style={{ color: '#262626', fontSize: 16, fontWeight: 600, marginRight: 4 }}>{doctorDetail?.doctorName}</span>
            <div style={{ display: 'flex', marginBottom: 4 }}>
              {doctorDetail?.mobile && (
                <Fragment>
                  {mobileFlag ? (
                    <div style={{ width: 90 }}>{doctorDetail?.mobile}</div>
                  ) : (
                    <div style={{ width: 90 }}>{`${doctorDetail?.mobile?.substring(0, 3)}****${doctorDetail?.mobile?.substring(7)}`}</div>
                  )}

                  {mobileFlag ? (
                    <EyeInvisibleOutlined style={{ marginRight: 10, marginLeft: 4, cursor: 'pointer' }} onClick={() => setMobileFlag(!mobileFlag)} />
                  ) : (
                    doctorDetail?.mobile && (
                      <EyeOutlined style={{ marginRight: 10, marginLeft: 4, cursor: 'pointer' }} onClick={() => setMobileFlag(!mobileFlag)} />
                    )
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
          <div className="color-text-45 font-14">{doctorDetail?.hospitalArea}</div>
        </div>
        {/* 这期不做 */}
        <div style={{ position: 'absolute', right: '24px', top: 0 }}>
          <Button type="primary" ghost onClick={() => message.warning('暂无此功能')}>
            添加沟通记录
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="primary" onClick={() => message.warning('暂无此功能')}>
            推送消息
          </Button>
        </div>
      </header>
      <div style={{ padding: '0 24px' }}>
        <Tabs items={[{ key: 'articles', label: '档案' }]} />
      </div>
      <div className={styles.content}>
        {/*  基础信息*/}
        <div className={`${styles.contentItem} padding-lr-24`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="font-w6 font-size14 color-text85">基础信息</div>
            {doctorDetail && <DoctorDetailEdit doctorDetail={doctorDetail} doctorId={getParams.get('doctorId')} queryGetDoctorDetail={queryGetDoctorDetail} />}
          </div>
          <div style={{ display: 'flex' }} className="margin-top8">
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              医生类型：
            </div>
            <div>{doctorDetail?.doctorTypeName}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              职称：
            </div>
            <div>{doctorDetail?.doctorTitleName}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              性别：
            </div>
            <div>{doctorDetail?.gender === 'M' ? '男' : doctorDetail?.gender === 'F' ? '女' : ''}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              生日：
            </div>
            <div>{doctorDetail?.birthday}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              邮箱：
            </div>
            <div>{doctorDetail?.email}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              最高学历：
            </div>
            <div>{doctorDetail?.highestDegree}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              毕业年份：
            </div>
            <div>{doctorDetail?.graduateYear}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              毕业学校：
            </div>
            <div>{doctorDetail?.graduateSchool}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              专业：
            </div>
            <div>{doctorDetail?.graduateMajor}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              工作年数：
            </div>
            <div>{doctorDetail?.workingYear}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              病人数：
            </div>
            <div>{doctorDetail?.patientCount}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              简介：
            </div>
            <div>{doctorDetail?.remark}</div>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="font-w6 font-size14 color-text85">执业点</div>
            {practiceSite?.length > 0 && <PracticeSiteAddEdit doctorId={getParams.get('doctorId')} />}
          </div>
          <div style={{ overflow: 'auto', height: 'calc(100vh - 240px)' }}>
            {practiceSite?.length > 0 ? (
              practiceSite?.map((item: any, index: number) => (
                <div className={`${styles.wechatBorder} padding12 margin-top8 border-r-6`} key={index}>
                  <div>
                    {item.isFirst && <Tag color="success">{'首要'}</Tag>}
                    <span className="color-primary font-w5">{item.hospitalId}</span>
                  </div>
                  <div>{item.hospitalName}</div>
                  <div style={{ color: 'var(--color-text-65)' }}>{item.deptName}</div>
                  <div className="font-12 color-text-65">{item.areaName}</div>
                </div>
              ))
            ) : (
              <div style={{ width: '100%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Empty />
              </div>
            )}
          </div>
        </div>
        {/*专业信息  */}

        <div className={`${styles.contentItem} padding-lr-24`} style={{ borderRight: '1px dashed var(--color-text-06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="font-w6 font-size14 color-text85">专业信息</div>
            <ProfessionalEdit
              queryGetDoctorProfessional={queryGetDoctorProfessional}
              specialtyInfo={specialtyInfo?.approveStatus === 'SUCCESSFUL' ? specialtyInfo : {}}
            />
          </div>
          {specialtyInfo?.approveStatus === 'SUCCESSFUL' ? (
            <Fragment>
              <div style={{ display: 'flex' }} className="margin-top8">
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
                        <EyeOutlined style={{ marginRight: 10, marginLeft: 4, cursor: 'pointer' }} onClick={() => setIndentityCodeFlag(!indentityCodeFlag)} />
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
              <div style={{ display: 'flex' }}>
                {specialtyInfo?.credentialPhotoUrl && (
                  <div className={`${styles.imgDiv} padding6  border-r-8`}>
                    <Image width={58} height={58} src={specialtyInfo?.credentialPhotoUrl} preview={{ src: specialtyInfo?.credentialPhotoUrl }} />
                  </div>
                )}
                {specialtyInfo?.credentialPhotoUrl2 && (
                  <div className={`${styles.imgDiv} padding6 border-r-8`} style={{ margin: '0 4px' }}>
                    <Image width={58} height={58} src={specialtyInfo?.credentialPhotoUrl2} preview={{ src: specialtyInfo?.credentialPhotoUrl2 }} />
                  </div>
                )}
                {specialtyInfo?.credentialPhotoUrl3 && (
                  <div className={`${styles.imgDiv} padding6 border-r-8`}>
                    <Image width={58} height={58} src={specialtyInfo?.credentialPhotoUrl3} preview={{ src: specialtyInfo?.credentialPhotoUrl3 }} />
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
              <div style={{ display: 'flex' }}>
                {specialtyInfo?.licensePhotoUrl && (
                  <div className={`${styles.imgDiv} padding6 border-r-8`}>
                    <Image width={58} height={58} src={specialtyInfo?.licensePhotoUrl} preview={{ src: specialtyInfo?.licensePhotoUrl }} />
                  </div>
                )}
                {specialtyInfo?.licensePhotoUrl2 && (
                  <div className={`${styles.imgDiv} padding6 border-r-8`} style={{ margin: '0 4px' }}>
                    <Image width={58} height={58} src={specialtyInfo?.licensePhotoUrl2} preview={{ src: specialtyInfo?.licensePhotoUrl2 }} />
                  </div>
                )}
                {specialtyInfo?.licensePhotoUrl3 && (
                  <div className={`${styles.imgDiv} padding6 border-r-8`}>
                    <Image width={58} height={58} src={specialtyInfo?.licensePhotoUrl3} preview={{ src: specialtyInfo?.licensePhotoUrl3 }} />
                  </div>
                )}
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div style={{ display: 'flex' }} className="margin-top8">
                <div className="margin-bottom12 color-title font-w6" style={{ width: 70, height: 20 }}>
                  身份证号：
                </div>
              </div>
              <div style={{ color: 'var(--color-error)', fontSize: 14, height: 20, marginBottom: 12 }}>资格证书</div>
              <div style={{ display: 'flex' }}>
                <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                  证书编码：
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                  发证日期：
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                  签发机关：
                </div>
              </div>
              <div style={{ color: 'var(--color-success)', fontSize: 14, height: 20, marginBottom: 12, marginTop: 12 }}>执业证书</div>
              <div style={{ display: 'flex' }}>
                <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                  证书编码：
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                  发证日期：
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                  签发机关：
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                  执业类别：
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                  执业范围：
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                  执业地点：
                </div>
              </div>
            </Fragment>
          )}
        </div>
        {/*  微信信息*/}
        <div className={`${styles.contentItem} padding-lr-24`}>
          <div className="font-w6 font-size14 color-text85" style={{ height: 32, display: 'flex', alignItems: 'center' }}>
            微信信息
          </div>
          <Fragment>
            {wechatInfo ? (
              <Fragment>
                <div style={{ display: 'flex' }} className="margin-top8">
                  <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                    邀请人：
                  </div>
                  <div>
                    {wechatInfo?.inviteRepName} &nbsp;{wechatInfo?.inviteRepId && <a className="font-14">({wechatInfo?.inviteRepId})</a>}&nbsp;&nbsp;&nbsp;
                    {
                      <Space>
                        <ModalForm
                          title={<div>{wechatInfo?.inviteRepId ? '修改邀请码' : '补录邀请码'}</div>}
                          width={480}
                          trigger={
                            <Button type="primary" size="small">
                              {wechatInfo?.inviteRepId ? '修改邀请码' : '补录邀请码'}
                            </Button>
                          }
                          layout="horizontal"
                          onOpenChange={() => setChecked(true)}
                          modalProps={{
                            destroyOnClose: true,
                          }}
                          submitter={{
                            searchConfig: {
                              submitText: '立即修改',
                            },
                            resetButtonProps: {
                              style: {
                                display: 'none',
                              },
                            },
                          }}
                          onFinish={async (values) => {
                            const res = await inputInviteCode({
                              doctorUserId: doctorDetail.doctorUserId || '',
                              doctorId: doctorDetail.doctorId || '',
                              repInfo: values.repInfo || '',
                              isSendMsg: checked,
                            });
                            if (res) {
                              message.success(wechatInfo?.inviteRepId ? '修改邀请码成功！' : '补录邀请码成功！');
                              queryGetDoctorWechatInfo();
                            }
                            return true;
                          }}
                        >
                          <Form.Item label="即刻推送消息提醒医职人" className="margin-bottom12">
                            <Checkbox onChange={(e: CheckboxChangeEvent) => setChecked(e.target.checked)} checked={checked}></Checkbox>
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
                    }
                  </div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                    注册时间：
                  </div>
                  <div>{wechatInfo?.registTime}</div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                    注册来源：
                  </div>
                  <div>{wechatInfo?.registFrom}</div>
                </div>
                <div>
                  <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
                    活跃平台：
                  </div>
                </div>
                <div style={{ height: '74%', overflow: 'hidden', overflowY: 'auto' }}>
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
              </Fragment>
            ) : (
              <div style={{ width: '100%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Empty />
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </div>
  );
};

export default DetailComponent;
