import DraggableModalForm from '@/components/DraggableModalForm';
import { getGender } from '@/components/util';
import { GetProfessionalApproveForm } from '@/pages/DoctorVerifyProfessional/api';
import { ProFormDatePicker, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Button, Col, Divider, Image, Row, Space } from 'antd';
import _ from 'lodash';
import { useState } from 'react';
import styles from './index.less';

const SubmitComponent = (props: { verifyId: any; onFinish: (values: any) => Promise<boolean> }) => {
  const { verifyId, onFinish } = props;
  const [info, setInfo] = useState<DoctorVerifyProfessional.Form>();

  return (
    <DraggableModalForm
      className={styles.content}
      title="审核申请单据"
      trigger={
        <Button type="primary" size="small">
          审批通过
        </Button>
      }
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        width: 920,
        style: {
          top: 'calc(50vh - 326px)',
        },
      }}
      submitTimeout={3000}
      onFinish={onFinish}
      layout="horizontal"
      labelCol={{ span: 7 }}
      params={{ verifyId }}
      request={async () => {
        const res = await GetProfessionalApproveForm(verifyId);
        await setInfo(res);
        return _.pickBy(res.formData, (v) => v !== '');
      }}
    >
      <Row gutter={24}>
        <Col span={14}>
          <ProFormText name="verifyId" hidden />
          <ProFormText name="doctorId" hidden />
          <ProFormDatePicker label="出生日期" name="birthday" placeholder="请填写出生日期" width="xl" />
          <ProFormText
            rules={[
              {
                pattern:
                  /(^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$)/,
                message: '身份证号格式错误！',
              },
            ]}
            label="身份证号"
            name="indentityCode"
            placeholder="请填写身份证号"
          />
          {/* pattern: /^\d{24}$|^\d{27}$/, message: '医师资格证书编码格式错误！' */}
          <ProFormText
            // rules={[{ pattern: /^\d{24}$|^\d{27}$/, message: '医师资格证书编码格式错误！' }]}
            label="医师资格证书编码(红)"
            name="credentialCode"
            placeholder="请输入"
            fieldProps={{
              maxLength: 50,
            }}
          />
          <ProFormDatePicker label="资格证书签发日期" name="credentialIssueDate" placeholder="请填写资格证书签发日期" width="xl" />
          <ProFormText label="资格证书签发机关" name="credentialIssueAgency" placeholder="请填写证书签发机关(示例：北京市丰台区卫生局)" />
          {/* pattern: /^\d{15}$/, message: '医师执业证书编码格式错误！'  */}
          <ProFormText
            // rules={[{ pattern: /^\d{15}$/, message: '医师执业证书编码格式错误！' }]}
            label="医师执业证书编码(绿)"
            name="licenseCode"
            placeholder="请输入"
            fieldProps={{
              maxLength: 50,
            }}
          />
          <ProFormDatePicker label="医师执业证书签发日期" name="licenseIssueDate" placeholder="请填写证书签发日期" width="xl" />
          <ProFormText label="医师执业证书签发机关" name="licenseIssueAgency" placeholder="请填写证书签发机关(示例：北京市丰台区卫生局)" />
          <ProFormText label="毕业学校" name="graduateSchool" placeholder="请填写毕业学校" />
          <ProFormText label="最高学历" name="graduateDegree" placeholder="请填写最高学历" />
          <ProFormText label="毕业专业" name="graduateMajor" placeholder="请填写毕业专业" />
          <ProFormSelect label="医师执业类别" name="licenseType" placeholder="请选择医师执业类别" options={['临床', '中医', '口腔', '公共卫生']} />
          {/* 执业范围 */}
          <ProFormText label="医师执业范围" name="licenseScope" placeholder="请填写医师执业范围" />
          <ProFormText label="医师执业地点" name="licenseSite" placeholder="请填写医师执业地点" />
          <ProFormText label="审批意见" name="verifyRemark" placeholder="请填写审核备注" />
        </Col>

        <Col span={10}>
          <Space size={12} direction="vertical" style={{ width: '100%' }}>
            <div className="font-16 font-w6">医生工作信息</div>
            <Row wrap={false}>
              <Col flex="70px" className="color-text-45 font-w5 text-r">
                医生：
              </Col>
              <Col flex="auto">{getGender(info?.workplaceInfo.gender, info?.workplaceInfo.doctorName, info?.workplaceInfo.doctorId)}</Col>
            </Row>

            <Row wrap={false}>
              <Col flex="70px" className="color-text-45 font-w5 text-r">
                关联医院：
              </Col>
              <Col flex="auto">
                {info?.workplaceInfo.hospitalName}({info?.workplaceInfo.hospitalId})
              </Col>
            </Row>

            <Row wrap={false}>
              <Col flex="70px" className="color-text-45 font-w5 text-r">
                关联科室：
              </Col>
              <Col flex="auto">
                {info?.workplaceInfo.deptGroupName} {info?.workplaceInfo.deptName} {info?.workplaceInfo.deptDescription}
              </Col>
            </Row>

            <Row wrap={false}>
              <Col flex="70px" className="color-text-45 font-w5 text-r">
                职称职务：
              </Col>
              <Col flex="auto">{info?.workplaceInfo.hospitalPosition}</Col>
            </Row>
          </Space>

          <Divider style={{ margin: '12px 0' }} />

          <Space size={12} direction="vertical" style={{ width: '100%' }}>
            <div className="font-16 font-w6">医生提交信息</div>
            <Row wrap={false}>
              <Col flex="70px" className="color-text-45 font-w5 text-r">
                提交人：
              </Col>
              <Col flex="auto">
                {info?.submitInfo.submitUserName} {info?.submitInfo.submitStamp}
              </Col>
            </Row>

            <Row wrap={false}>
              <Col flex="70px" className="color-text-45 font-w5 text-r">
                身份证号：
              </Col>
              <Col flex="auto">{info?.submitInfo.indentityCode}</Col>
            </Row>

            <Row wrap={false}>
              <Col flex="70px" className="color-text-45 font-w5 text-r">
                资格证书：
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
              <Col flex="70px" className="color-text-45 font-w5 text-r">
                执业证书：
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
        </Col>
      </Row>
    </DraggableModalForm>
  );
};

export default SubmitComponent;
