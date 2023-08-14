import { getDoctorTitleList, updateDoctorInfo } from '@/pages/ClientAll/api';
import { EditOutlined } from '@ant-design/icons';
import { ModalForm, ProFormDatePicker, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Button, Col, message, Row, Space } from 'antd';
import dayjs from 'dayjs';

interface propsParams {
  doctorDetail: any;
  doctorId: string | any;
  queryGetDoctorDetail: () => void;
}

const DoctorDetailEdit = (props: propsParams) => {
  const { doctorDetail, doctorId, queryGetDoctorDetail } = props;
  return (
    <Space>
      <ModalForm
        width={960}
        title="编辑基础信息"
        trigger={
          <Button style={{ padding: 0 }} type="link" icon={<EditOutlined />}>
            编辑
          </Button>
        }
        layout="horizontal"
        modalProps={{
          destroyOnClose: true,
        }}
        initialValues={{
          doctorName: doctorDetail?.doctorName,
          doctorTypeId: doctorDetail?.doctorTypeId,
          doctorTitleId: doctorDetail?.doctorTitleId,
          gender: doctorDetail?.gender,
          birthday: doctorDetail?.birthday ? dayjs(doctorDetail?.birthday, 'YYYY-MM-DD') : null,
          email: doctorDetail?.email,
          highestDegree: doctorDetail?.highestDegree,
          graduateYear: doctorDetail?.graduateYear,
          graduateSchool: doctorDetail?.graduateSchool,
          graduateMajor: doctorDetail?.graduateMajor,
          workingYear: doctorDetail?.workingYear,
          patientCount: doctorDetail?.patientCount,
          remark: doctorDetail?.remark,
        }}
        onFinish={async (values) => {
          let obj: ClientManage.UpdateDoctorInfo = {
            doctorTypeId: values?.doctorTypeId,
            doctorTitleId: values?.doctorTitleId,
            gender: values?.gender || '',
            birthday: values?.birthday ? dayjs(values?.birthday).format('YYYY-MM-DD') : '',
            email: values?.email || '',
            highestDegree: values?.highestDegree || '',
            graduateYear: values?.graduateYear || '',
            graduateSchool: values?.graduateSchool || '',
            graduateMajor: values?.graduateMajor || '',
            workingYear: values?.workingYear || '',
            patientCount: values?.patientCount || '',
            remark: values?.remark,
            doctorId: doctorId,
            doctorName: values?.doctorName,
          };
          const res = await updateDoctorInfo(obj);
          if (res) {
            message.success('修改成功');
            queryGetDoctorDetail();
          }

          // ref.current.reset();
          return true;
        }}
        labelCol={{ span: 4 }}
        colon={false}
      >
        <Row>
          <Col span={12}>
            <ProFormText width={352} name="doctorName" label="姓名" rules={[{ required: true, message: '请填写姓名' }]} />
          </Col>
          <Col span={12}>
            <ProFormSelect
              width={352}
              name="doctorTypeId"
              label="医生类型"
              placeholder="请选择医生类型"
              fieldProps={{
                showSearch: true,
                dropdownMatchSelectWidth: false,
              }}
              debounceTime={300}
              request={async () => {
                const data = await getDoctorTitleList();
                return data.map((item: any) => ({
                  label: item.doctorTypeName,
                  value: item.doctorTypeId,
                }));
              }}
            />
          </Col>
          <Col span={12}>
            <ProFormSelect
              width={352}
              name="doctorTitleId"
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
                  value: item.doctorTitleId,
                }));
              }}
            />
          </Col>
          <Col span={12}>
            <ProFormSelect
              width={352}
              name="gender"
              label="性别"
              placeholder="请选择性别"
              options={[
                { label: '男', value: 'M' },
                { label: '女', value: 'F' },
              ]}
              fieldProps={{
                showSearch: true,
                dropdownMatchSelectWidth: false,
              }}
            />
          </Col>
          <Col span={12}>
            <ProFormDatePicker width={352} name="birthday" label="生日" placeholder="请填写生日" />
          </Col>
          <Col span={12}>
            <ProFormText
              width={352}
              name="email"
              label="邮箱"
              placeholder="请填写邮箱"
              rules={[
                {
                  pattern: /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/,
                  message: '请输入正确的数字',
                },
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormText width={352} name="highestDegree" label="最高学历" placeholder="请填写学历" />
          </Col>
          <Col span={12}>
            <ProFormText
              width={352}
              name="graduateYear"
              label="毕业年份"
              placeholder="请填写毕业年份"
              fieldProps={{ maxLength: 4 }}
              // rules={[
              //     {
              //         pattern: /^(-)?[0-9]+([.][0-9]{1,})?$/,
              //         message: '请输入正确的数字',
              //     },
              // ]}
            />
          </Col>
          <Col span={12}>
            <ProFormText width={352} name="graduateSchool" label="毕业学校" placeholder="请填写毕业学校" />
          </Col>
          <Col span={12}>
            <ProFormText width={352} name="graduateMajor" label="专业" placeholder="请填写专业" />
          </Col>
          <Col span={12}>
            <ProFormText
              width={352}
              name="workingYear"
              label="工作年数"
              placeholder="请填写工作年数"
              fieldProps={{ maxLength: 4 }}
              // rules={[
              //     {
              //         pattern: /^(-)?[0-9]+([.][0-9]{1,})?$/,
              //         message: '请输入正确的数字',
              //     },
              // ]}
            />
          </Col>
          <Col span={12}>
            <ProFormText width={352} name="patientCount" label="病人数" placeholder="请填写病人数" />
          </Col>
          <Col span={12}>
            <ProFormTextArea width={352} name="remark" label="简介" placeholder="请填写简介" />
          </Col>
        </Row>
      </ModalForm>
    </Space>
  );
};

export default DoctorDetailEdit;
