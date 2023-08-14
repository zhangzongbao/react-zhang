import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useSearchParams } from '@umijs/max';
import { Image, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { doctorInfo } from '../../api';
import DoctorDetailEdit from '../DoctorDetailEdit';
import PracticeSiteAddEdit from '../PracticeSiteAddEdit';
import styles from './index.less';

const DetailComponent = () => {
  const [getParams, setParams] = useSearchParams();
  const [doctorDetail, setDoctorDetail] = useState<any>();
  const [mobileFlag, setMobileFlag] = useState<boolean>(false);
  const [indentityCodeFlag, setIndentityCodeFlag] = useState<boolean>(false);

  // 详情
  const queryGetDoctorDetail = async () => {
    const res = await doctorInfo(getParams.get('id'));
    setDoctorDetail(res);
  };

  useEffect(() => {
    queryGetDoctorDetail();
  }, []);

  return (
    <div className={`${styles.detailBox} padding-tb-24`}>
      <header className="padding-lr-24">
        <div className={`${styles.head} border-r-2`}>
          <img className="imgHeight" src={doctorDetail?.avatarUrl || 'https://ww-cdn.oss-cn-shanghai.aliyuncs.com/pic/platform/platform-profile_photo.png'} />
        </div>
        <div className={`${styles.headerContent} margin-left10`}>
          <div style={{ display: 'flex', marginBottom: 4 }}>
            <span style={{ color: '#262626', fontSize: 16, fontWeight: 600, marginRight: 4 }}>{doctorDetail?.doctorName}</span>
            {mobileFlag ? (
              <div style={{ width: 90 }}>{doctorDetail?.mobile}</div>
            ) : (
              <div style={{ width: 90 }}>{doctorDetail?.mobile && `${doctorDetail?.mobile.substr(0, 3)}****${doctorDetail?.mobile.substr(7)}`}</div>
            )}
            {mobileFlag ? (
              <EyeInvisibleOutlined style={{ marginRight: 10, marginLeft: 4, cursor: 'pointer' }} onClick={() => setMobileFlag(!mobileFlag)} />
            ) : (
              doctorDetail?.mobile && <EyeOutlined style={{ marginRight: 10, marginLeft: 4, cursor: 'pointer' }} onClick={() => setMobileFlag(!mobileFlag)} />
            )}
            {/* <span>{doctorDetail?.mobileVerify === '不一致' && <Tag color="error">{doctorDetail?.mobileVerify}</Tag>}</span> */}
          </div>
          {/* <div>
            <a href="#" style={{ color: 'var(--color-primary)', marginRight: 4, fontWeight: 600 }}>
              {doctorDetail?.doctorId}
            </a>
            {doctorDetail?.registStatus === '已注册' ? <Tag color="success">{doctorDetail?.registStatus}</Tag> : null}
          </div> */}
          <div className="color-text-45 font-14">{`${doctorDetail?.provinceName}-${doctorDetail?.cityName}-${doctorDetail?.districtName}`}</div>
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
            {<DoctorDetailEdit doctorDetail={doctorDetail} doctorId={getParams.get('id')} queryGetDoctorDetail={queryGetDoctorDetail} />}
          </div>
          <div className="margin-top8 " style={{ display: 'flex' }}>
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
            <div>{doctorDetail?.patientsCount}</div>
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
            <PracticeSiteAddEdit doctorDetail={doctorDetail} doctorId={getParams.get('id')} queryGetDoctorDetail={queryGetDoctorDetail} />
          </div>
          <div className="margin-top8 " style={{ overflow: 'auto', height: 'calc(100vh - 240px)' }}>
            <div className={`${styles.wechatBorder} padding12 margin-bottom12 border-r-6`}>
              <div>
                <span className="color-primary font-w5">{doctorDetail?.hospitalId}</span>
              </div>
              <div>{doctorDetail?.hospitalName}</div>
              <div style={{ color: 'var(--color-text-65)' }}>{doctorDetail?.deptName}</div>
              <div className="font-12 color-text-65">{doctorDetail?.hospitalPosition}</div>
            </div>
          </div>
        </div>
        {/*专业信息  */}
        <div className={`${styles.contentItem} padding-lr-24`} style={{ borderRight: '1px dashed var(--color-text-06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="font-w6 font-size14 color-text85">专业信息</div>
            {/* {<ProfessionalEdit queryGetDoctorProfessional={queryGetDoctorProfessional} specialtyInfo={specialtyInfo} />} */}
          </div>
          <div style={{ display: 'flex' }} className="margin-top8">
            <div className="margin-bottom12 color-title font-w6" style={{ width: 70, height: 20 }}>
              身份证号：
            </div>
            {doctorDetail?.indentityCode && (
              <>
                {indentityCodeFlag ? (
                  <div style={{ display: 'flex', height: 20, alignItems: 'center' }}>
                    <div style={{ width: 146 }}>{doctorDetail?.indentityCode}</div>
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
              </>
            )}
          </div>
          <div style={{ color: 'var(--color-error)', fontSize: 14, height: 20, marginBottom: 12 }}>资格证书</div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              证书编码：
            </div>
            <div>{doctorDetail?.credentialCode}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              发证日期：
            </div>
            <div>{doctorDetail?.credentialIssueDate}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              签发机关：
            </div>
            <div>{doctorDetail?.credentialIssueAgency}</div>
          </div>
          {/* credentialPhotoUrl */}
          {/* credentialPhotoUrl2 */}
          {/* credentialPhotoUrl3 */}
          {/* 'https://ww-cdn.oss-cn-shanghai.aliyuncs.com/pic/platform/platform-profile_photo.png' */}
          <div style={{ display: 'flex' }}>
            {doctorDetail?.credentialPhotoUrl && (
              <div className={`${styles.imgDiv} padding6  border-r-8`}>
                <Image width={58} height={58} src={doctorDetail?.credentialPhotoUrl} preview={{ src: doctorDetail?.credentialPhotoUrl }} />
              </div>
            )}
            {doctorDetail?.credentialPhotoUrl2 && (
              <div className={`${styles.imgDiv} padding6 border-r-8`} style={{ margin: '0 4px' }}>
                <Image width={58} height={58} src={doctorDetail?.credentialPhotoUrl2} preview={{ src: doctorDetail?.credentialPhotoUrl2 }} />
              </div>
            )}
            {doctorDetail?.credentialPhotoUrl3 && (
              <div className={`${styles.imgDiv} padding6 border-r-8`}>
                <Image width={58} height={58} src={doctorDetail?.credentialPhotoUrl3} preview={{ src: doctorDetail?.credentialPhotoUrl3 }} />
              </div>
            )}
          </div>
          <div style={{ color: 'var(--color-success)', fontSize: 14, height: 20, marginBottom: 12, marginTop: 12 }}>执业证书</div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              证书编码：
            </div>
            <div style={{ color: 'var(--color-text-85)' }}>{doctorDetail?.licenseCode}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              发证日期：
            </div>
            <div style={{ color: 'var(--color-text-85)' }}>{doctorDetail?.licenseIssueDate}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              签发机关：
            </div>
            <div style={{ color: 'var(--color-text-85)' }}>{doctorDetail?.licenseIssueAgency}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              执业类别：
            </div>
            <div style={{ color: 'var(--color-text-85)' }}>{doctorDetail?.licenseType}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              执业范围：
            </div>
            <div style={{ color: 'var(--color-text-85)' }}>{doctorDetail?.licenseArea}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="margin-bottom12 color-title font-w6" style={{ minWidth: 70, height: 20 }}>
              执业地点：
            </div>
            <div style={{ color: 'var(--color-text-85)' }}>{doctorDetail?.licenseSite}</div>
          </div>
          {/* licensePhotoUrl */}
          {/* licensePhotoUrl2 */}
          {/* licensePhotoUrl3 */}
          {/* 'https://ww-cdn.oss-cn-shanghai.aliyuncs.com/pic/platform/platform-profile_photo.png' */}
          <div style={{ display: 'flex' }}>
            {doctorDetail?.licensePhotoUrl && (
              <div className={`${styles.imgDiv} padding6`}>
                <Image width={58} height={58} src={doctorDetail?.licensePhotoUrl} preview={{ src: doctorDetail?.licensePhotoUrl }} />
              </div>
            )}
            {doctorDetail?.licensePhotoUrl2 && (
              <div className={`${styles.imgDiv} padding6`} style={{ margin: '0 4px' }}>
                <Image width={58} height={58} src={doctorDetail?.licensePhotoUrl2} preview={{ src: doctorDetail?.licensePhotoUrl2 }} />
              </div>
            )}
            {doctorDetail?.licensePhotoUrl3 && (
              <div className={`${styles.imgDiv} padding6`}>
                <Image width={58} height={58} src={doctorDetail?.licensePhotoUrl3} preview={{ src: doctorDetail?.licensePhotoUrl3 }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailComponent;
