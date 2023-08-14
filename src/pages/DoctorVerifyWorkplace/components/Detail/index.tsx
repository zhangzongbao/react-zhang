import DraggableModalForm from '@/components/DraggableModalForm';
import { getGender } from '@/components/util';
import { GetWorkplaceModel, RefuseWorkplaceVerify, SubmitWorkplaceApproveForm } from '@/pages/DoctorVerifyWorkplace/api';
import SubmitComponent from '@/pages/DoctorVerifyWorkplace/components/Submit';
import { verifyTypeText } from '@/utils/enum';
import { ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
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
  const [info, setInfo] = useState<DoctorVerifyWorkplace.Model | undefined>();

  const getInfo = async () => {
    setInfo(detail ? await GetWorkplaceModel(detail) : undefined);
  };

  useAsyncEffect(async () => getInfo(), [detail]);

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
                  await RefuseWorkplaceVerify(values);
                  await getInfo();
                  reLoadPage();
                  message.success('驳回成功');
                  return true;
                }}
              >
                <ProFormText hidden initialValue={detail} name="verifyId" />
                <ProFormTextArea rules={[{ required: true, message: '这是必填项' }]} name="verifyRemark" placeholder="请输入驳回原因" />
                <ProFormSwitch initialValue={true} label="是否通知申请人" name="noticeSubmitter" />
              </DraggableModalForm>
              <SubmitComponent
                verifyId={detail}
                key="submit"
                onFinish={async (values) => {
                  await SubmitWorkplaceApproveForm(values);
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
        {info?.status !== 'SUBMITTED' ? (
          <>
            <Space size={12} direction="vertical" style={{ width: '100%' }}>
              {info?.approveInfo.verifyUserName || info?.approveInfo.verifyStamp ? (
                <Row wrap={false}>
                  <Col flex="84px" className="color-text-45 font-w5 text-r">
                    审核人：
                  </Col>
                  <Col flex="auto">
                    {info?.approveInfo.verifyUserName} {info?.approveInfo.verifyStamp}
                  </Col>
                </Row>
              ) : null}
              {info?.approveInfo.verifyRemark ? (
                <Row wrap={false}>
                  <Col flex="84px" className="color-text-45 font-w5 text-r">
                    审核意见：
                  </Col>
                  <Col flex="auto">{info?.approveInfo.verifyRemark}</Col>
                </Row>
              ) : null}
            </Space>

            <Divider style={{ margin: '12px 0' }} />

            {info?.status === 'SUCCESSFUL' ? (
              <>
                <Space size={12} direction="vertical" style={{ width: '100%' }}>
                  <div className="font-16 font-w6">审核信息</div>
                  <Row wrap={false}>
                    <Col flex="84px" className="color-text-45 font-w5 text-r">
                      医院名称：
                    </Col>
                    <Col flex="auto">
                      <a target="_blank" href={`https://datawell.wingwell.cloud/HospitalInfo/${info?.approveInfo.workplaceInfo.hospitalId}`} rel="noreferrer">
                        {info?.approveInfo.workplaceInfo.hospitalName}({info?.approveInfo.workplaceInfo.hospitalId})
                      </a>
                    </Col>
                  </Row>

                  <Row wrap={false}>
                    <Col flex="84px" className="color-text-45 font-w5 text-r">
                      医生姓名：
                    </Col>
                    <Col flex="auto">
                      {getGender(info?.approveInfo.workplaceInfo.gender, info?.approveInfo.workplaceInfo.doctorName, info?.approveInfo.workplaceInfo.doctorId)}
                    </Col>
                  </Row>

                  <Row wrap={false}>
                    <Col flex="84px" className="color-text-45 font-w5 text-r">
                      关联科室：
                    </Col>
                    <Col flex="auto">
                      {info?.approveInfo.workplaceInfo.deptGroupName} {info?.approveInfo.workplaceInfo.deptName}{' '}
                      {info?.approveInfo.workplaceInfo.deptDescription}
                    </Col>
                  </Row>

                  <Row wrap={false}>
                    <Col flex="84px" className="color-text-45 font-w5 text-r">
                      职称职务：
                    </Col>
                    <Col flex="auto">
                      {info?.approveInfo.workplaceInfo.doctorTitleName} {info?.approveInfo.workplaceInfo.hospitalPosition}
                    </Col>
                  </Row>
                </Space>

                <Divider style={{ margin: '12px 0' }} />
              </>
            ) : null}
          </>
        ) : null}

        <Space size={12} direction="vertical" style={{ width: '100%' }}>
          <div className="font-16 font-w6">医职人提交信息</div>
          <Row wrap={false}>
            <Col flex="84px" className="color-text-45 font-w5 text-r">
              提交人：
            </Col>
            <Col flex="auto">
              {info?.submitInfo.submitUserName} {info?.submitInfo.submitStamp}
            </Col>
          </Row>

          <Row wrap={false}>
            <Col flex="84px" className="color-text-45 font-w5 text-r">
              医生：
            </Col>
            <Col flex="auto">
              {getGender(info?.submitInfo.workplaceInfo.gender, info?.submitInfo.workplaceInfo.doctorName, info?.submitInfo.workplaceInfo.doctorId)}
            </Col>
          </Row>

          <Row wrap={false}>
            <Col flex="84px" className="color-text-45 font-w5 text-r">
              医院：
            </Col>
            <Col flex="auto">
              {info?.submitInfo.workplaceInfo.hospitalName}
              {info?.submitInfo.workplaceInfo.hospitalId ? `(${info?.submitInfo.workplaceInfo.hospitalId})` : null}
            </Col>
          </Row>

          <Row wrap={false}>
            <Col flex="84px" className="color-text-45 font-w5 text-r">
              科室：
            </Col>
            <Col flex="auto">
              {info?.submitInfo.workplaceInfo.deptName}
              {info?.submitInfo.workplaceInfo.deptId ? `(${info?.submitInfo.workplaceInfo.deptId})` : null} {info?.submitInfo.workplaceInfo.deptDescription}
            </Col>
          </Row>

          <Row wrap={false}>
            <Col flex="84px" className="color-text-45 font-w5 text-r">
              职称：
            </Col>
            <Col flex="auto">{info?.submitInfo.workplaceInfo.doctorTitle}</Col>
          </Row>

          <Row wrap={false}>
            <Col flex="84px" className="color-text-45 font-w5 text-r">
              关联项目：
            </Col>
            <Col flex="auto">
              {info?.projectList.map((item) => (
                <div key={item.projectId}>
                  <a target="_blank" href={`/project/project-info/${item.projectId}`} rel="noreferrer">
                    {item.projectName}
                    {item.status !== 'ACTIVE' ? '' : '(待审核)'}
                  </a>
                </div>
              ))}
            </Col>
          </Row>
          <Row wrap={false}>
            <Col flex="84px" className="color-text-45 font-w5 text-r">
              认证照片：
            </Col>
            <Col flex="auto">
              <Space size={16}>
                {info?.submitInfo.verifyPhotoUrl ? <Image height={80} src={info?.submitInfo.verifyPhotoUrl} /> : null}
                {info?.submitInfo.verifyPhotoUrl2 ? <Image height={80} src={info?.submitInfo.verifyPhotoUrl2} /> : null}
                {info?.submitInfo.verifyPhotoUrl3 ? <Image height={80} src={info?.submitInfo.verifyPhotoUrl3} /> : null}
              </Space>
            </Col>
          </Row>
        </Space>

        <Divider />

        <Space size={12} direction="vertical" style={{ width: '100%' }}>
          <div className="font-16 font-w6">医生注册信息</div>
          <Row wrap={false}>
            <Col flex="84px" className="color-text-45 font-w5 text-r">
              姓名：
            </Col>
            <Col flex="auto">
              {info?.registInfo.doctorName} {info?.registInfo.registStamp}
            </Col>
          </Row>

          <Row wrap={false}>
            <Col flex="84px" className="color-text-45 font-w5 text-r">
              医院：
            </Col>
            <Col flex="auto">{info?.registInfo.hospitalName}</Col>
          </Row>

          <Row wrap={false}>
            <Col flex="84px" className="color-text-45 font-w5 text-r">
              科室：
            </Col>
            <Col flex="auto">{info?.registInfo.deptDescription}</Col>
          </Row>

          <Row wrap={false}>
            <Col flex="84px" className="color-text-45 font-w5 text-r">
              注册来源：
            </Col>
            <Col flex="auto">{info?.registInfo.wechatApp}</Col>
          </Row>

          <Row wrap={false}>
            <Col flex="84px" className="color-text-45 font-w5 text-r">
              邀请信息：
            </Col>
            <Col flex="auto">
              {info?.registInfo.registFrom} {info?.registInfo.inviteCode ? `【${info?.registInfo.inviteCode}】 ` : ''}
              {info?.registInfo.inviteInfo}
            </Col>
          </Row>
        </Space>
      </Drawer>
    </>
  );
};

export default DetailComponent;
