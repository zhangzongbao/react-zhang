import { Link } from '@@/exports';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProColumns,
  ProFormCascader,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
  ProTable,
} from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import { useModel } from '@umijs/max';
import { Button, Input, message, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import {
  doctorFuzzyList,
  doctorIndex,
  getAreaList,
  getDeptList,
  getDoctorTitleList,
  getProvinceCityDistrictList,
  professionalImport,
  searchHospitalName,
} from './api';
import styles from './index.less';

const App = () => {
  const { paginationSize, changePaginationSize } = useModel('paginationSize');
  const { tableSize, changeTableSize } = useModel('tableSize');
  const ref = useRef<any>();
  const [listParams, setListParams] = useState<number | any>({
    keyword: '',
    hospital: '',
    areaId: '',
    deptId: '',
    doctorTitleId: '',
    orderParam: {
      field: '',
      orderType: 0,
    },
  });
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
    // console.log(`--------`, tempList);
  };

  const columns: ProColumns<DoctorLake.DoctorItem>[] = [
    {
      title: '医生编码',
      dataIndex: 'id',
      align: 'left',
      width: 80,
      sorter: true,
      render: (_, record) =>
        record.doctorId ? (
          <Link target="_blank" to={`/physician-management/client-manage/detail?doctorId=${record.doctorId}`}>
            {record.doctorId}
          </Link>
        ) : (
          <Link target="_blank" to={`/physician-management/doctor-lake/detail?id=${record.id}`}>
            {record.id}
          </Link>
        ),
    },
    {
      title: '姓名',
      sorter: true,
      dataIndex: 'doctorName',
      align: 'left',
      width: 80,
      render: (_, record) =>
        record.doctorId ? (
          <Link target="_blank" to={`/physician-management/client-manage/detail?doctorId=${record.doctorId}`}>
            {record.doctorName}
            {record.gender ? (
              record.gender === 'M' ? (
                <ManOutlined style={{ fontSize: 14, color: '#81A5E3' }} />
              ) : (
                <WomanOutlined style={{ fontSize: 14, color: '#F58CAB' }} />
              )
            ) : null}
          </Link>
        ) : (
          <Link target="_blank" to={`/physician-management/doctor-lake/detail?id=${record.id}`}>
            {record.doctorName}
            {record.gender ? (
              record.gender === 'M' ? (
                <ManOutlined style={{ fontSize: 14, color: '#81A5E3' }} />
              ) : (
                <WomanOutlined style={{ fontSize: 14, color: '#F58CAB' }} />
              )
            ) : null}
          </Link>
        ),
        // <a
        //   onClick={() => {
        //     history.push(
        //       '_banlk',
        //       record.doctorId
        //         ? `/physician-management/client-manage/detail?doctorId=${record.doctorId}`
        //         : `/physician-management/doctor-lake/detail?id=${record.id}`,
        //     );
        //   }}
        // >
        //   {record.doctorName}
        //   {record.gender ? (
        //     record.gender === 'M' ? (
        //       <ManOutlined style={{ fontSize: 14, color: '#81A5E3' }} />
        //     ) : (
        //       <WomanOutlined style={{ fontSize: 14, color: '#F58CAB' }} />
        //     )
        //   ) : null}
        // </a>
    },
    {
      title: '手机号码',
      sorter: true,
      dataIndex: 'mobile',
      align: 'left',
      width: 80,
      render: (_, record) => {
        return <div>{record?.mobile && `${record?.mobile.substr(0, 3)}****${record?.mobile.substr(7)}`}</div>;
      },
    },
    {
      title: '职称',
      sorter: true,
      dataIndex: 'doctorTitleName',
      align: 'left',
      width: 120,
    },
    {
      title: '首要任职医院',
      sorter: true,
      dataIndex: 'hospitalName',
      align: 'left',
      width: 80,
    },
    {
      title: '科室',
      sorter: true,
      dataIndex: 'deptName',
      align: 'left',
      width: 80,
    },
    {
      title: '职务',
      sorter: true,
      dataIndex: 'hospitalPosition',
      align: 'left',
      width: 80,
    },
    {
      title: '省市区县',
      sorter: true,
      dataIndex: 'provinceName',
      align: 'left',
      width: 80,
      render: (_, temp: any) => <>{`${temp.provinceName}-${temp.cityName}-${temp.districtName}`}</>,
    },
  ];

  const addDom = () => {
    return [
      <ModalForm
        submitter={{
          resetButtonProps: { style: { display: 'none' } },
          submitButtonProps: { style: { display: 'none' } },
        }}
        key={0}
        // width={960}
        title="导入"
        trigger={<Button>导入</Button>}
        // layout="horizontal"
        modalProps={{
          destroyOnClose: true,
        }}
        initialValues={{}}
        onFinish={async (values: any) => {
          // console.log(`------151`, values);
          // let formData = new FormData();
          // formData.append('file', values.dragger[0].originFileObj, 'file.png');
          // const res = await professionalImport(formData);
          // // console.log(res, 'res');
          // message.success(res);
          // ref.current.reset();
          // return true;
        }}
        // labelCol={{ span: 4 }}
        colon={false} // lable不加冒号
        rowProps={{
          gutter: [16, 0],
        }}
        layout={'horizontal'}
        grid={true}
      >
        <ProFormUploadDragger
          max={4}
          name="dragger"
          description={``}
          fieldProps={{
            accept: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            maxCount: 1,
            customRequest: async (options: any) => {
              console.log(`----------options`, options);
              let formData = new FormData();
              formData.append('file', options.file, 'file.png');
              try {
                const res = await professionalImport(formData);
                console.log('res--------------------------', res);
                message.success(res);
                options.onSuccess(res, options.file);
              } catch (error) {
                console.log('error--------------------------', error);
                options.onError(error, options.file);
              }
            },
          }}
        />
      </ModalForm>,
      //--------------------------
      <ModalForm
        key={1}
        width={960}
        title="建档"
        trigger={<Button type="primary">新增</Button>}
        // layout="horizontal"
        modalProps={{
          destroyOnClose: true,
        }}
        initialValues={{
          gender: '',
          professionalVerified: 1,
        }}
        onFinish={async (values: any) => {
          // console.log(`------155`, values);
          const temp23 = values.area
            ? {
                provinceName: values.area[0].split('-')[0],
                provinceId: values.area[0].split('-')[1],
                cityName: values.area[1].split('-')[0],
                cityId: values.area[1].split('-')[1],
                districtName: values.area[2].split('-')[0],
                districtId: values.area[2].split('-')[1],
              }
            : {};
          const temp24 = {
            doctorTypeName: values.doctorType ? values.doctorType.split('-')[0] : '',
            doctorType: values.doctorType ? values.doctorType.split('-')[1] : '',
            doctorTitleName: values.doctorTitle ? values.doctorTitle.split('-')[0] : '',
            doctorTitle: values.doctorTitle ? values.doctorTitle.split('-')[1] : '',
          };
          const res = await doctorIndex({
            ...values,
            ...temp23,
            ...temp24,
          });
          // console.log(res, 'res');
          message.success(`添加成功！`);
          ref.current.reset();
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
          labelCol={{ span: 6 }}
          // width={200}
          colProps={{ span: 12 }}
          rules={[{ required: true, message: '请输入医生姓名!' }]}
          name="doctorName"
          label={`医生姓名`}
          placeholder="请输入医生姓名"
        />
        <ProFormSelect
          labelCol={{ span: 6 }}
          // width={200}
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
        <ProFormSelect
          labelCol={{ span: 6 }}
          // width={200}
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
          labelCol={{ span: 6 }}
          // width={200}
          colProps={{ span: 12 }}
          placeholder="请选择职称"
          name="doctorTitle"
          label={`职称`}
          request={async () => {
            const data = await getDoctorTitleList();
            return data[0].doctorTitleList.map((item: any) => ({
              label: item.doctorTitleName,
              value: item.doctorTitleName + '-' + item.doctorTitleId,
            }));
          }}
        />
        <ProFormCascader
          label={`省市区县`}
          labelCol={{ span: 6 }}
          // width={200}
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
          labelCol={{ span: 6 }}
          // width={200}
          colProps={{ span: 12 }}
          rules={[{ required: true, message: '请输入首要任职医院!' }]}
          name="hospitalName"
          label={`首要任职医院`}
          placeholder="请输入首任任职医院"
        />
        <ProFormText
          labelCol={{ span: 6 }}
          // width={200}
          colProps={{ span: 12 }}
          rules={[{ required: true, message: '请输入科室!' }]}
          name="deptName"
          label={`科室`}
          placeholder="请输入科室"
        />
        <ProFormText
          labelCol={{ span: 6 }}
          // width={200}
          colProps={{ span: 12 }}
          // rules={[{ required: true, message: '请输入职务!' }]}
          name="hospitalPosition"
          label={`职务`}
          placeholder="请输入职务"
        />
        <ProFormText
          labelCol={{ span: 6 }}
          // width={200}
          colProps={{ span: 12 }}
          rules={[{ pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码!' }]}
          name="mobile"
          label={`手机号`}
          placeholder="请输入手机号"
        />

        <ProFormText
          labelCol={{ span: 6 }}
          // width={200}
          colProps={{ span: 12 }}
          rules={[{ pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱!' }]}
          name="email"
          label={`邮箱`}
          placeholder="请输入邮箱"
        />
        <ProFormTextArea
          labelCol={{ span: 6 }}
          // width={200}
          colProps={{ span: 12 }}
          // rules={[{ required: true, message: '请输入职务!' }]}
          name="remark"
          label={`备注`}
          placeholder="请输入备注"
        />
        <ProFormRadio.Group
          labelCol={{ span: 6 }}
          // width={200}
          colProps={{ span: 12 }}
          name="professionalVerified"
          label={`状态`}
          options={[
            {
              label: '有效的',
              value: 1,
            },
            {
              label: '无效的',
              value: 0,
            },
          ]}
        />
      </ModalForm>,
    ];
  };

  useEffect(() => {
    queryDistrictList();
  }, []);

  return (
    <PageContainer header={{ breadcrumb: {} }}>
      <ProTable<DoctorLake.DoctorItem>
        actionRef={ref}
        rowKey="id"
        search={false}
        columnEmptyText={false}
        className={styles.doctorLake}
        columns={columns}
        columnsState={{
          persistenceKey: 'Xiaoai-ProTable-ColumnsState-App',
          persistenceType: 'localStorage',
        }}
        params={{ ...listParams }}
        request={async (params, sort = {}) => {
          const areaId2 = params.areaId.split('-')[params.areaId.split('-').length - 1];
          const res8 = await doctorFuzzyList({
            pageIndex: params.current,
            pageSize: params.pageSize,
            keyword: params.keyword,
            hospitalName: params.hospital,
            areaId: areaId2,
            deptName: params.deptId.split('-')[1],
            doctorTitleName: params.doctorTitleId.split('-')[1],
            isHeiglight: false,
            orderParam: {
              field: (JSON.stringify(sort) !== '{}' && Object.keys(sort)[0]) || '',
              orderType: JSON.stringify(sort) !== '{}' && sort[`${Object.keys(sort)}`] === 'ascend' ? 0 : sort[`${Object.keys(sort)}`] === 'descend' ? 1 : 0,
            },
          });
          return {
            data: res8.data,
            total: res8.dataCount,
          };
        }}
        pagination={{
          defaultPageSize: paginationSize,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: (v1, v2) => changePaginationSize(v2),
        }}
        onSizeChange={changeTableSize}
        defaultSize={tableSize}
        scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
        toolBarRender={addDom}
        toolbar={{
          multipleLine: true,
          filter: (
            <div
              style={{ background: '#EDF1FF', width: '100%', display: 'flex', alignItems: 'center', minHeight: 44, padding: '4px 0' }}
              className="margin-bottom16"
            >
              <Space>
                <ProFormSelect
                  placeholder="请输入医院编码或名称"
                  name="hospital"
                  style={{ width: 231, marginLeft: 8 }}
                  fieldProps={{
                    showSearch: true,
                    dropdownMatchSelectWidth: false,
                    onClear: () => {
                      setListParams({ ...listParams, hospital: '' });
                    },
                    onSelect: (value) => {
                      setListParams({ ...listParams, hospital: value });
                    },
                  }}
                  debounceTime={300}
                  request={async (e: any) => {
                    const { data } = await searchHospitalName({ name: e.keyWords, pageSize: 200, pageIndex: 1 });
                    return data.map((item: any) => ({
                      label: item.hospitalName,
                      value: item.hospitalName,
                    }));
                  }}
                />
                <ProFormSelect
                  placeholder="请输入区域名称检索"
                  name="areaId"
                  style={{ width: 231, marginLeft: 8 }}
                  fieldProps={{
                    showSearch: true,
                    dropdownMatchSelectWidth: false,
                    onClear: () => {
                      setListParams({ ...listParams, areaId: '' });
                    },
                    onSelect: (value) => {
                      setListParams({ ...listParams, areaId: value });
                    },
                  }}
                  debounceTime={300}
                  request={async (e: any) => {
                    const data = await getAreaList({ name: e.keyWords ? e.keyWords : '', maxData: 200 });
                    return data.map((item: any) => ({
                      label: item.displayName,
                      value: item.displayName,
                    }));
                  }}
                />
                <ProFormSelect
                  placeholder="请选择科室"
                  name="deptId"
                  style={{ width: 231, marginLeft: 8 }}
                  fieldProps={{
                    showSearch: true,
                    dropdownMatchSelectWidth: false,
                    onClear: () => {
                      setListParams({ ...listParams, deptId: '' });
                    },
                    onSelect: (value) => {
                      setListParams({ ...listParams, deptId: value });
                    },
                  }}
                  debounceTime={300}
                  request={async () => {
                    const data = await getDeptList();
                    return data.map((item: any) => ({
                      label: item.deptName,
                      value: item.deptId + '-' + item.deptName,
                    }));
                  }}
                />
                <ProFormSelect
                  placeholder="请选择职称"
                  name="doctorTitleId"
                  style={{ width: 231, marginLeft: 8 }}
                  fieldProps={{
                    onClear: () => {
                      setListParams({ ...listParams, doctorTitleId: '' });
                    },
                    onSelect: (value) => {
                      setListParams({ ...listParams, doctorTitleId: value });
                    },
                  }}
                  request={async () => {
                    const data = await getDoctorTitleList();
                    return data[0].doctorTitleList.map((item: any) => ({
                      label: item.doctorTitleName,
                      value: item.doctorTitleId + '-' + item.doctorTitleName,
                    }));
                  }}
                />
              </Space>
            </div>
          ),
          subTitle: (
            <div>
              <Space style={{ marginLeft: -8 }}>
                <Input.Search style={{ width: 231 }} placeholder="综合查询" allowClear onSearch={(e) => setListParams({ ...listParams, keyword: e })} />
                {/* <Checkbox onChange={(e: CheckboxChangeEvent) => setListParams({ ...listParams, checked: e.target.checked })}>仅显示注册用户</Checkbox> */}
              </Space>
            </div>
          ),
        }}
      />
    </PageContainer>
  );
};

export default App;
