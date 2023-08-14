import { EditOutlined } from '@ant-design/icons';
import { ModalForm, ProFormDatePicker, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import dayjs from 'dayjs';
import { doctorIndex, getDoctorTitleList } from '../../api';

interface propsParams {
  doctorDetail: any;
  doctorId: string | any;
  queryGetDoctorDetail: () => void;
}

<Button style={{ padding: 0 }} type="link" icon={<EditOutlined />}>
  编辑
</Button>;

const DoctorDetailEdit = (props: propsParams) => {
  const { doctorDetail, doctorId, queryGetDoctorDetail } = props;
  console.log(`doctorDetail------------16`, doctorDetail);

  return (
    <Space>
      <ModalForm
        key={1}
        width={960}
        title="编辑基础信息"
        trigger={
          <Button style={{ padding: 0 }} type="link" icon={<EditOutlined />}>
            编辑
          </Button>
        }
        // layout="horizontal"
        modalProps={{
          destroyOnClose: true,
        }}
        initialValues={{
          doctorName: doctorDetail?.doctorName || '',
          doctorType: doctorDetail?.doctorTypeName + '-' + doctorDetail?.doctorType,
          doctorTitle: doctorDetail?.doctorTitleName + '-' + doctorDetail?.doctorTitle,
          gender: doctorDetail?.gender,
          birthday: doctorDetail?.birthday || dayjs().format('YYYY-MM-DD'),
          email: doctorDetail?.email || '',
          highestDegree: doctorDetail?.highestDegree || '',
          graduateYear: doctorDetail?.graduateYear || dayjs().format('YYYY-MM-DD'),
          graduateSchool: doctorDetail?.graduateSchool || '',
          graduateMajor: doctorDetail?.graduateMajor || '',
          workingYear: doctorDetail?.workingYear || '',
          patientsCount: Number(doctorDetail?.patientsCount) || 0,
          remark: doctorDetail?.remark || '',
        }}
        onFinish={async (values: any) => {
          console.log(`------155`, values);
          const temp23 = {
            doctorTypeName: values.doctorType ? values.doctorType.split('-')[0] : '',
            doctorType: values.doctorType ? values.doctorType.split('-')[1] : '',
            doctorTitleName: values.doctorTitle ? values.doctorTitle.split('-')[0] : '',
            doctorTitle: values.doctorTitle ? values.doctorTitle.split('-')[1] : '',
          };
          const res = await doctorIndex({
            ...doctorDetail,
            ...values,
            ...temp23,
          });
          if (res) {
            message.success('修改成功');
            setTimeout(queryGetDoctorDetail, 1000);
          }
          return true;
        }}
        // labelCol={{ span: 4 }}
        colon={false} // lable不加冒号
        rowProps={{
          gutter: [0, 0],
        }}
        layout={'horizontal'}
        grid={true}
      >
        <ProFormText
          labelCol={{ span: 4 }}
          width={352}
          colProps={{ span: 12 }}
          rules={[{ required: true, message: '请输入医生姓名!' }]}
          name="doctorName"
          label={`医生姓名`}
          placeholder="请输入医生姓名"
        />
        <ProFormSelect
          labelCol={{ span: 4 }}
          width={352}
          colProps={{ span: 12 }}
          placeholder="请选择医生类型"
          name="doctorType"
          label={`医生类型`}
          options={[
            {
              label: '医疗人员',
              value: '医疗人员-ME',
            },
          ]}
          // request={async () => {
          //   const data = await dictionaryId({ dictionaryId: 'DoctorType' });
          //   return data.map((item: any) => ({
          //     label: item.text,
          //     value: item.key,
          //   }));
          // }}
        />
        <ProFormSelect
          labelCol={{ span: 4 }}
          width={352}
          colProps={{ span: 12 }}
          placeholder="请选择职称"
          name="doctorTitle"
          label={`职称`}
          request={async () => {
            const data = await getDoctorTitleList();
            return data[0].doctorTitleList.map((item: any) => ({
              label: item.doctorTitleName,
              value: `${item.doctorTitleName}-${item.doctorTitleId}`,
            }));
          }}
        />
        <ProFormSelect
          labelCol={{ span: 4 }}
          width={352}
          colProps={{ span: 12 }}
          name="gender"
          label={`性别`}
          options={[
            {
              label: '未知',
              value: '',
            },
            {
              label: '男',
              value: 'M',
            },
            {
              label: '女',
              value: 'F',
            },
          ]}
        />
        <ProFormDatePicker
          labelCol={{ span: 4 }}
          width={352}
          colProps={{ span: 12 }}
          // rules={[{ required: true, message: '请输入生日!' }]}
          name="birthday"
          label={`生日`}
          placeholder="请输入生日"
        />
        <ProFormText
          labelCol={{ span: 4 }}
          width={352}
          colProps={{ span: 12 }}
          rules={[{ pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱!' }]}
          name="email"
          label={`邮箱`}
          placeholder="请输入邮箱"
        />
        <ProFormText labelCol={{ span: 4 }} width={352} colProps={{ span: 12 }} name="highestDegree" label={`最高学历`} placeholder="请输入最高学历" />
        <ProFormText labelCol={{ span: 4 }} width={352} colProps={{ span: 12 }} name="graduateYear" label={`毕业年份`} placeholder="请输入毕业年份" />
        <ProFormText labelCol={{ span: 4 }} width={352} colProps={{ span: 12 }} name="graduateSchool" label={`毕业学校`} placeholder="请输入毕业学校" />
        <ProFormText labelCol={{ span: 4 }} width={352} colProps={{ span: 12 }} name="graduateMajor" label={`专业`} placeholder="请输入专业" />
        <ProFormText labelCol={{ span: 4 }} width={352} colProps={{ span: 12 }} name="workingYear" label={`工作年数`} placeholder="请输入工作年数" />
        <ProFormText labelCol={{ span: 4 }} width={352} colProps={{ span: 12 }} name="patientsCount" label={`病人数`} placeholder="请输入病人数" />
        <ProFormTextArea
          labelCol={{ span: 4 }}
          width={352}
          colProps={{ span: 12 }}
          // rules={[{ required: true, message: '请输入职务!' }]}
          name="remark"
          label={`备注`}
          placeholder="请输入备注"
        />
      </ModalForm>
    </Space>
  );
};

export default DoctorDetailEdit;
