import DraggableModalForm from '@/components/DraggableModalForm';
import FormAutoCompleteDept from '@/components/FormAutoComplete/Dept';
import FormAutoCompleteHospital from '@/components/FormAutoComplete/Hospital';
import { FormOutlined } from '@ant-design/icons';
import { ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Button, Form } from 'antd';
import { GetDoctorTitleList, GetDoctorWorkplaceInfo } from './api';

const EditorComponent = (props: { item: DoctorVerifyProfessional.Model['workplaceInfo'] | undefined; onFinish: (values: any) => Promise<boolean> }) => {
  const { item, onFinish } = props;

  return (
    <DraggableModalForm
      title="编辑医生工作信息"
      trigger={
        <Button type="link" className="float-r" size="small" icon={<FormOutlined />}>
          编辑
        </Button>
      }
      autoFocusFirstInput
      modalProps={{ destroyOnClose: true }}
      submitTimeout={3000}
      onFinish={onFinish}
      layout="horizontal"
      labelCol={{ span: 4 }}
      params={{ doctorId: item?.doctorId }}
      request={async () => (item?.doctorId ? await GetDoctorWorkplaceInfo(item.doctorId) : null)}
    >
      <ProFormText label="医生编码" name="doctorId" readonly />
      <ProFormText rules={[{ required: true, message: '这是必填项' }]} label="医生姓名" name="doctorName" placeholder="请填写医生姓名" />
      <ProFormRadio.Group
        rules={[{ required: true, message: '这是必填项' }]}
        label="性别"
        name="gender"
        request={async () => [
          { label: '未知', value: '' },
          { label: '男', value: 'M' },
          { label: '女', value: 'F' },
        ]}
      />
      <Form.Item label="医院" name="hospitalId" rules={[{ required: true, message: '请在下拉框中选择！' }]}>
        <FormAutoCompleteHospital defaultValue={item?.hospitalId ? `【${item?.hospitalId}】${item?.hospitalName}` : undefined} />
      </Form.Item>
      <Form.Item label="标准科室" name="deptId" rules={[{ required: true, message: '请在下拉框中选择！' }]}>
        <FormAutoCompleteDept defaultValue={item?.deptId ? `【${item?.deptId}】${item?.deptName}` : undefined} />
      </Form.Item>
      <ProFormText label="挂牌科室" name="deptDescription" placeholder="请填写挂牌科室" />
      <ProFormText label="任职职务" name="hospitalPosition" placeholder="请填写任职职务" />
      <ProFormSelect
        label="职称"
        name="doctorTitle"
        placeholder="请选择职称"
        request={async () => {
          const res = await GetDoctorTitleList();
          return res.map((item: any) => ({ label: `【${item.key}】${item.text}`, value: item.key }));
        }}
      />
    </DraggableModalForm>
  );
};

export default EditorComponent;
