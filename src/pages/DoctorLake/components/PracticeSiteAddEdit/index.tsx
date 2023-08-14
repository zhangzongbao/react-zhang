import { EditOutlined } from '@ant-design/icons';
import { ModalForm, ProFormCascader, ProFormText } from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import { doctorIndex, getProvinceCityDistrictList } from '../../api';
// import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

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
  const [districtList, setDistrictList] = useState<any>([]);

  const queryDistrictList = async () => {
    const res = await getProvinceCityDistrictList({});
    const tempList: any = [];
    res.map((val31: any) => {
      const tempList31: any = [];
      val31.cityList.map((val32: any) => {
        const tempList32: any = [];
        val32.districtList.map((val33: any) => {
          tempList32.push({
            label: val33.districtName,
            value: val33.districtName + '-' + val33.districtId,
          });
          return null;
        });
        tempList31.push({
          label: val32.cityName,
          value: val32.cityName + '-' + val32.cityId,
          children: tempList32,
        });
        return null;
      });

      tempList.push({
        label: val31.provinceName,
        value: val31.provinceName + '-' + val31.provinceId,
        children: tempList31,
      });
      return null;
    });
    setDistrictList(tempList);
    console.log(`--------`, tempList);
  };

  useEffect(() => {
    queryDistrictList();
  }, []);

  return (
    <Space>
      <ModalForm
        key={1}
        width={960}
        title="编辑执业点"
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
          hospitalName: doctorDetail?.hospitalName || '',
          area:
            doctorDetail?.provinceId && doctorDetail?.cityId && doctorDetail?.districtId
              ? [
                  `${doctorDetail?.provinceName}-${doctorDetail?.provinceId}`,
                  `${doctorDetail?.cityName}-${doctorDetail?.cityId}`,
                  `${doctorDetail?.districtName}-${doctorDetail?.districtId}`,
                ]
              : [],
          deptName: doctorDetail?.deptName || '',
          hospitalPosition: doctorDetail?.hospitalPosition || '',
          deptDescription: doctorDetail?.deptDescription || '',
        }}
        onFinish={async (values: any) => {
          console.log(`------155`, values);
          const temp23 =
            values.area && values.area[0]
              ? {
                  provinceName: values.area[0].split('-')[0],
                  provinceId: values.area[0].split('-')[1],
                  cityName: values.area[1].split('-')[0],
                  cityId: values.area[1].split('-')[1],
                  districtName: values.area[2].split('-')[0],
                  districtId: values.area[2].split('-')[1],
                }
              : {};
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
          gutter: [16, 0],
        }}
        layout={'horizontal'}
        grid={true}
      >
        <ProFormText
          labelCol={{ span: 4 }}
          width={352}
          colProps={{ span: 12 }}
          rules={[{ required: true, message: '请输入医院!' }]}
          name="hospitalName"
          label={`医院`}
          placeholder="请输入医院"
          disabled={true}
        />
        <ProFormCascader
          label={`省市区县`}
          labelCol={{ span: 4 }}
          width={352}
          colProps={{ span: 12 }}
          placeholder="请输入区域名称检索"
          name="area"
          fieldProps={{
            showSearch: true,
            options: districtList,
          }}
          debounceTime={300}
          // options={districtList}
        />
        <ProFormText
          labelCol={{ span: 4 }}
          width={352}
          colProps={{ span: 12 }}
          rules={[{ required: true, message: '请输入科室!' }]}
          name="deptName"
          label={`科室`}
          placeholder="请输入科室"
        />
        <ProFormText
          labelCol={{ span: 4 }}
          width={352}
          colProps={{ span: 12 }}
          // rules={[{ required: true, message: '请输入挂牌科室!' }]}
          name="deptDescription"
          label={`挂牌科室`}
          placeholder="请输入挂牌科室"
        />
        <ProFormText
          labelCol={{ span: 4 }}
          width={352}
          colProps={{ span: 12 }}
          // rules={[{ required: true, message: '请输入职务!' }]}
          name="hospitalPosition"
          label={`职务`}
          placeholder="请输入职务"
        />
      </ModalForm>
    </Space>
  );
};

export default DoctorDetailEdit;
