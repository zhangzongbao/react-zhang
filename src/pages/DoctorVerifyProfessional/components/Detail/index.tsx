import DraggableModalForm from '@/components/DraggableModalForm';
import { getGender } from '@/components/util';
import { GetProfessionalModel, RefuseProfessionalVerify, SubmitProfessionalApproveForm } from '@/pages/DoctorVerifyProfessional/api';
import EditorComponent from '@/pages/DoctorVerifyProfessional/components/Editor';
import { SaveDoctorWorkplaceData } from '@/pages/DoctorVerifyProfessional/components/Editor/api';
import SubmitComponent from '@/pages/DoctorVerifyProfessional/components/Submit';
import { verifyTypeText } from '@/utils/enum';
import { ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useAsyncEffect } from 'ahooks';
import { App, Button, Col, Divider, Drawer, Image, Row, Space } from 'antd';
import { useState } from 'react';

interface Props {
  detail: number | undefined;
  onCancel: () => void;
  reLoadPage: () => void;
}

const DetailComponent = (props: Props) => {
  const { message } = App.useApp();
  const { detail, onCancel, reLoadPage } = props;
  const [info, setInfo] = useState<DoctorVerifyProfessional.Model | undefined>();

  const getInfo = async () => {
    setInfo(detail ? await GetProfessionalModel(detail) : undefined);
  };

  useAsyncEffect(async () => getInfo(), [detail]);
  console.log(info, 'info');

  return (
    <>
      <Drawer
        title={verifyTypeText[info?.status as any] + '详情'}
        onClose={onCancel}
        open={!!detail}
        width={620}
        destroyOnClose
        extra={
          info?.status === 'SUBMITTED' ? (
            <Space size={16}>
              <DraggableModalForm
                title="请输入驳回原因并确认"
                trigger={
                  <Button key="refuse" type="primary" danger size="small">
                    审批驳回
                  </Button>
                }
                autoFocusFirstInput
                modalProps={{ destroyOnClose: true, width: 520 }}
                submitTimeout={3000}
                layout="horizontal"
                onFinish={async (values) => {
                  await RefuseProfessionalVerify(values);
                  await getInfo();
                  reLoadPage();
                  message.success('驳回成功');
                  return true;
                }}
              >
                <ProFormText hidden initialValue={detail} name="verifyId" />
                <ProFormTextArea rules={[{ required: true, message: '这是必填项' }]} name="verifyRemark" placeholder="请输入驳回原因" />
                {/* <ProFormSwitch initialValue={true} label="是否通知申请人" name="noticeSubmitter" /> */}
              </DraggableModalForm>
              <SubmitComponent
                verifyId={detail}
                key="submit"
                onFinish={async (values) => {
                  await SubmitProfessionalApproveForm(values);
                  await getInfo();
                  reLoadPage();
                  message.success('提交成功');
                  return true;
                }}
              />
            </Space>
          ) : null
        }
      >
        {info?.status === 'SUCCESSFUL' ? (
          <>
            <Space size={12} direction="vertical" style={{ width: '100%' }}>
              <Row wrap={false}>
                <Col flex="160px" className="color-text-45 font-w5 text-r">
                  审核人：
                </Col>
                <Col flex="auto">
                  {info?.approveInfo.verifyUserName} {info?.approveInfo.verifyStamp}
                </Col>
              </Row>
              <Row wrap={false}>
                <Col flex="160px" className="color-text-45 font-w5 text-r">
                  出生日期：
                </Col>
                <Col flex="auto">{info?.approveInfo.professionalInfo.birthday}</Col>
              </Row>
              <Row wrap={false}>
                <Col flex="160px" className="color-text-45 font-w5 text-r">
                  身份证号：
                </Col>
                <Col flex="auto">{info?.approveInfo.professionalInfo.indentityCode}</Col>
              </Row>
              <Row wrap={false}>
                <Col flex="160px" className="color-text-45 font-w5 text-r">
                  医师资格证书编码(红)：
                </Col>
                <Col flex="auto">{info?.approveInfo.professionalInfo.credentialCode}</Col>
              </Row>
              <Row wrap={false}>
                <Col flex="160px" className="color-text-45 font-w5 text-r">
                  资格证书签发日期：
                </Col>
                <Col flex="auto">{info?.approveInfo.professionalInfo.credentialIssueDate}</Col>
              </Row>
              <Row wrap={false}>
                <Col flex="160px" className="color-text-45 font-w5 text-r">
                  资格证书签发机关：
                </Col>
                <Col flex="auto">{info?.approveInfo.professionalInfo.credentialIssueAgency}</Col>
              </Row>
              <Row wrap={false}>
                <Col flex="160px" className="color-text-45 font-w5 text-r">
                  医师执业证书编码(绿)：
                </Col>
                <Col flex="auto">{info?.approveInfo.professionalInfo.licenseCode}</Col>
              </Row>
              <Row wrap={false}>
                <Col flex="160px" className="color-text-45 font-w5 text-r">
                  医师执业证书签发日期：
                </Col>
                <Col flex="auto">{info?.approveInfo.professionalInfo.licenseIssueDate}</Col>
              </Row>
              <Row wrap={false}>
                <Col flex="160px" className="color-text-45 font-w5 text-r">
                  医师执业证书签发机关：
                </Col>
                <Col flex="auto">{info?.approveInfo.professionalInfo.licenseIssueAgency}</Col>
              </Row>
              {/* <Row wrap={false}>
                <Col flex="160px" className="color-text-45 font-w5 text-r">
                  证书签发信息：
                </Col>
                <Col flex="auto">
                  {info?.approveInfo.professionalInfo.issueAgency} {info?.approveInfo.professionalInfo.issueDate}
                </Col>
              </Row> */}
              <Row wrap={false}>
                <Col flex="160px" className="color-text-45 font-w5 text-r">
                  毕业学校：
                </Col>
                <Col flex="auto">{info?.approveInfo.professionalInfo.graduateSchool}</Col>
              </Row>
              <Row wrap={false}>
                <Col flex="160px" className="color-text-45 font-w5 text-r">
                  最高学历：
                </Col>
                <Col flex="auto">{info?.approveInfo.professionalInfo.graduateDegree}</Col>
              </Row>
              <Row wrap={false}>
                <Col flex="160px" className="color-text-45 font-w5 text-r">
                  毕业专业：
                </Col>
                <Col flex="auto">{info?.approveInfo.professionalInfo.graduateMajor}</Col>
              </Row>
              <Row wrap={false}>
                <Col flex="160px" className="color-text-45 font-w5 text-r">
                  医师执业类别：
                </Col>
                <Col flex="auto">{info?.approveInfo.professionalInfo.licenseType}</Col>
              </Row>
              <Row wrap={false}>
                <Col flex="160px" className="color-text-45 font-w5 text-r">
                  医师执业范围：
                </Col>
                <Col flex="auto">{info?.approveInfo.professionalInfo.licenseScope}</Col>
              </Row>
              <Row wrap={false}>
                <Col flex="160px" className="color-text-45 font-w5 text-r">
                  医师执业地点：
                </Col>
                <Col flex="auto">{info?.approveInfo.professionalInfo.licenseSite}</Col>
              </Row>
              <Row wrap={false}>
                <Col flex="160px" className="color-text-45 font-w5 text-r">
                  审核意见：
                </Col>
                <Col flex="auto">{info?.approveInfo.verifyRemark}</Col>
              </Row>
            </Space>

            <Divider style={{ margin: '12px 0' }} />
          </>
        ) : null}

        <Space size={12} direction="vertical" style={{ width: '100%' }}>
          <div className="font-16 font-w6">
            医生工作信息
            <EditorComponent
              item={info?.workplaceInfo}
              onFinish={async (values) => {
                await SaveDoctorWorkplaceData(values);
                await getInfo();
                reLoadPage();
                message.success('提交成功');
                return true;
              }}
            />
          </div>
          <Row wrap={false}>
            <Col flex="160px" className="color-text-45 font-w5 text-r">
              医生：
            </Col>
            <Col flex="auto">{getGender(info?.workplaceInfo.gender, info?.workplaceInfo.doctorName, info?.workplaceInfo.doctorId)}</Col>
          </Row>

          <Row wrap={false}>
            <Col flex="160px" className="color-text-45 font-w5 text-r">
              关联医院：
            </Col>
            <Col flex="auto">
              {info?.workplaceInfo.hospitalName}({info?.workplaceInfo.hospitalId})
            </Col>
          </Row>

          <Row wrap={false}>
            <Col flex="160px" className="color-text-45 font-w5 text-r">
              关联科室：
            </Col>
            <Col flex="auto">
              {info?.workplaceInfo.deptGroupName} {info?.workplaceInfo.deptName} {info?.workplaceInfo.deptDescription}
            </Col>
          </Row>

          <Row wrap={false}>
            <Col flex="160px" className="color-text-45 font-w5 text-r">
              职称职务：
            </Col>
            <Col flex="auto">{info?.workplaceInfo.hospitalPosition}</Col>
          </Row>
        </Space>

        <Divider style={{ margin: '12px 0' }} />

        <Space size={12} direction="vertical" style={{ width: '100%' }}>
          <div className="font-16 font-w6">医生提交信息</div>
          <Row wrap={false}>
            <Col flex="160px" className="color-text-45 font-w5 text-r">
              提交人：
            </Col>
            <Col flex="auto">
              {info?.submitInfo.submitUserName} {info?.submitInfo.submitStamp}
            </Col>
          </Row>

          <Row wrap={false}>
            <Col flex="160px" className="color-text-45 font-w5 text-r">
              身份证号：
            </Col>
            <Col flex="auto">{info?.submitInfo.indentityCode}</Col>
          </Row>

          <Row wrap={false}>
            <Col flex="160px" className="color-text-45 font-w5 text-r">
              资格证书照片：
            </Col>
            <Col flex="auto">
              <Space size={16}>
                {info?.submitInfo.credentialPhotoUrl ? <Image height={80} src={info?.submitInfo.credentialPhotoUrl} /> : null}
                {info?.submitInfo.credentialPhotoUrl2 ? <Image height={80} src={info?.submitInfo.credentialPhotoUrl2} /> : null}
                {info?.submitInfo.credentialPhotoUrl3 ? <Image height={80} src={info?.submitInfo.credentialPhotoUrl3} /> : null}
              </Space>
            </Col>
          </Row>

          <Row wrap={false}>
            <Col flex="160px" className="color-text-45 font-w5 text-r">
              执业证书照片：
            </Col>
            <Col flex="auto">
              <Space size={16}>
                {info?.submitInfo.licensePhotoUrl ? <Image height={80} src={info?.submitInfo.licensePhotoUrl} /> : null}
                {info?.submitInfo.licensePhotoUrl2 ? <Image height={80} src={info?.submitInfo.licensePhotoUrl2} /> : null}
                {info?.submitInfo.licensePhotoUrl3 ? <Image height={80} src={info?.submitInfo.licensePhotoUrl3} /> : null}
              </Space>
            </Col>
          </Row>
        </Space>
      </Drawer>
    </>
  );
};

export default DetailComponent;
