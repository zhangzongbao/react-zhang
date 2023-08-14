import DraggableModalForm from '@/components/DraggableModalForm';
import FormAutoCompleteHospital from '@/components/FormAutoComplete/Hospital';
import { getGender } from '@/components/util';
import { GetWorkplaceApproveForm } from '@/pages/DoctorVerifyWorkplace/api';
import { ProFormCheckbox, ProFormInstance, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Button, Col, Divider, Form, Image, Row, Space } from 'antd';
import _ from 'lodash';
import { useRef, useState } from 'react';

const SubmitComponent = (props: { verifyId: any; onFinish: (values: any) => Promise<boolean> }) => {
  const { verifyId, onFinish } = props;
  const [info, setInfo] = useState<DoctorVerifyWorkplace.Form>();
  const formRef = useRef<ProFormInstance>();

  return (
    <DraggableModalForm
      title="审核申请单据"
      formRef={formRef}
      trigger={
        <Button type="primary" size="small">
          审批通过
        </Button>
      }
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        width: 920,
      }}
      submitTimeout={3000}
      onFinish={onFinish}
      layout="horizontal"
      labelCol={{ span: 4 }}
      params={{ verifyId }}
      request={async () => {
        const res = await GetWorkplaceApproveForm(verifyId);
        await setInfo(res);
        return _.pickBy(res.formData, (v) => v !== '');
      }}
    >
      <Row gutter={24}>
        <Col span={14}>
          <ProFormText name="verifyId" hidden />
          <ProFormText label="医生编码" name="doctorId" placeholder="请填写医生编码" />
          <ProFormText rules={[{ required: true, message: '这是必填项' }]} label="医生姓名" name="doctorName" placeholder="请填写医生姓名" />
          <ProFormRadio.Group
            initialValue=""
            rules={[{ required: true, type: 'enum', enum: ['', 'M', 'F'], message: '这是必填项' }]}
            label="性别"
            name="gender"
            request={async () => [
              { label: '未知', value: '' },
              { label: '男', value: 'M' },
              { label: '女', value: 'F' },
            ]}
          />
          <Form.Item label="医院" name="hospitalId" rules={[{ required: true, message: '请在下拉框中选择！' }]}>
            {verifyId && info ? <FormAutoCompleteHospital defaultValue={info?.formData.hospitalId} /> : null}
          </Form.Item>
          <ProFormSelect
            rules={[{ required: true, message: '请在下拉框中选择！' }]}
            showSearch
            options={info?.deptOptions.map((item) => ({ value: item.key, label: item.text }))}
            label="标准科室"
            name="deptId"
            placeholder="请选择标准科室"
          />
          <ProFormText label="挂牌科室" name="deptDescription" placeholder="请填写挂牌科室" />
          <ProFormSelect
            options={info?.doctorTitleOptions.map((item) => ({ value: item.key, label: item.text }))}
            label="职称"
            name="doctorTitle"
            placeholder="请选择职称"
          />
          <ProFormCheckbox.Group
            label="关联项目"
            name="projectIds"
            layout="vertical"
            options={info?.repProjectList.map((item) => ({ value: item.projectId, label: item.projectName }))}
          />
          <ProFormText label="审批意见" name="verifyRemark" placeholder="请填写审核备注" />
        </Col>

        <Col span={10}>
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

          <Divider style={{ margin: '12px 0' }} />

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
        </Col>
      </Row>
    </DraggableModalForm>
  );
};

export default SubmitComponent;
