import { addDoctorWorkplace, getDeptList, getDoctorWorkplace, searchHospitalName, updateDoctorWorkplace } from '@/pages/ClientAll/api';
import { EditOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DrawerForm, ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { request } from '@umijs/max';
import { Button, Col, Divider, Empty, Form, Image, message, Row, Space, Switch, Tag, Tooltip, Upload } from 'antd';
import { Fragment, useState } from 'react';
import styles from './index.less';

interface propsParams {
  workplaceCount?: string;
  btnFlag?: string;
  doctorId: string | any;
}

const PracticeSiteAddEdit = (props: propsParams) => {
  const { btnFlag, workplaceCount, doctorId } = props;
  const [practiceSiteItem, setpracticeSiteItem] = useState<any>(undefined); //执业
  const [practiceSite, setpracticeSite] = useState<any>(undefined); //执业
  const [practiceSiteIndex, setPracticeSiteIndex] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<any>([]);
  const [imgPreview, setImgPreview] = useState<string>();
  const [visible, setVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // 执业点
  const queryGetDoctorWorkplace = async () => {
    const res = await getDoctorWorkplace(doctorId);
    setpracticeSite(res);
    setpracticeSiteItem(res[0]);
    setPracticeSiteIndex(0);
  };

  const handleOnRemove = (uid: string) => {
    imageUrl.splice(
      imageUrl.findIndex((item: any) => item.uid === uid),
      1,
    );
    setImageUrl([...imageUrl]);
  };

  const handleOnPreview = (uid: string) => {
    setImgPreview(imageUrl.find((item: any) => item.uid === uid).url);
    setVisible(true);
  };

  const handleUpload = (info: any) => {
    setLoading(true);
    let formData = new FormData();
    formData.append('file', info.file, 'file.png');
    request(`/api/xiaoai/client/uploadPic`, {
      method: 'POST',
      data: formData,
    }).then((res) => {
      setLoading(false);
      setImageUrl([
        ...imageUrl,
        {
          uid: (Math.random() * 10).toFixed(4),
          name: 'image.png',
          status: 'done',
          url: res,
        },
      ]);
    });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传照片</div>
    </div>
  );

  const handleEdit = () => {
    let arr: any = [];
    if (practiceSiteItem?.workplacePhotoUrl) {
      arr.push({
        uid: (Math.random() * 10).toFixed(4),
        name: 'image.png',
        status: 'done',
        url: practiceSiteItem?.workplacePhotoUrl,
      });
    }
    if (practiceSiteItem?.workplacePhotoUrl2) {
      arr.push({
        uid: (Math.random() * 10).toFixed(4),
        name: 'image.png',
        status: 'done',
        url: practiceSiteItem?.workplacePhotoUrl2,
      });
    }
    if (practiceSiteItem?.workplacePhotoUrl3) {
      arr.push({
        uid: (Math.random() * 10).toFixed(4),
        name: 'image.png',
        status: 'done',
        url: practiceSiteItem?.workplacePhotoUrl3,
      });
    }
    setImageUrl([...arr]);
  };

  // 执业点
  const handlePracticeSiteAddEdit = (key: string) => {
    return (
      <Space>
        <ModalForm
          width={480}
          title={key === 'add' ? '添加执业点' : '编辑执业点'}
          trigger={
            key === 'add' ? (
              <Button type="primary" onClick={() => setImageUrl([])}>
                添加
              </Button>
            ) : (
              <Button onClick={handleEdit} type="link" icon={<EditOutlined />}>
                编辑
              </Button>
            )
          }
          layout="horizontal"
          modalProps={{
            destroyOnClose: true,
          }}
          initialValues={
            key === 'add'
              ? {}
              : {
                  hospitalId: practiceSiteItem?.hospitalName,
                  deptId: practiceSiteItem?.deptId,
                  isFirst: practiceSiteItem?.isFirst ? true : false,
                  isVerified: practiceSiteItem?.isVerified ? true : false,
                  deptDescription: practiceSiteItem?.deptDescription,
                  hospitalPosition: practiceSiteItem?.hospitalPosition,
                  workplacePhoto: imageUrl,
                }
          }
          onFinish={async (values) => {
            if (key === 'add') {
              if (values.isFirst === undefined) values.isFirst = true;
              if (values.isVerified === undefined) values.isVerified = true;
            } else {
              if (values.isFirst === undefined) values.isFirst = practiceSiteItem?.isFirst;
              if (values.isVerified === undefined) values.isVerified = practiceSiteItem?.isVerified;
            }
            let obj: ClientManage.AddDoctorWorkplace = {
              workplacePhotoUrl: imageUrl[0]?.url || '',
              workplacePhotoUrl2: imageUrl[1]?.url || '',
              workplacePhotoUrl3: imageUrl[2]?.url || '',
              doctorId: practiceSiteItem?.doctorId || '',
              deptId: values.deptId || '',
              hospitalId: key === 'add' ? values.hospitalId : practiceSiteItem?.hospitalId,
              isFirst: values.isFirst,
              isVerified: values.isVerified,
              deptDescription: values.deptDescription || '',
              hospitalPosition: values.hospitalPosition || '',
            };
            if (key === 'add') {
              const res = await addDoctorWorkplace(obj);
              if (res) {
                message.success('新增医生执业点成功');
                queryGetDoctorWorkplace();
              }
            } else {
              const res = await updateDoctorWorkplace(obj);
              if (res) {
                message.success('更新医生执业点成功');
                queryGetDoctorWorkplace();
              }
            }
            // ref.current.reset();
            return true;
          }}
          labelCol={{ span: 4 }}
          colon={false}
        >
          {key === 'add' ? (
            <ProFormSelect
              width={352}
              name="hospitalId"
              label="医院"
              rules={[{ required: true, message: '请选择医院!' }]}
              placeholder="请选择医院"
              fieldProps={{
                showSearch: true,
                dropdownMatchSelectWidth: false,
              }}
              debounceTime={300}
              request={async (e: any) => {
                const { data } = await searchHospitalName({ name: e.keyWords, pageIndex: 1, pageSize: 200 });
                return data.map((item: any) => ({
                  label: item.hospitalName,
                  value: item.hospitalId,
                }));
              }}
            />
          ) : (
            <ProFormText width={352} name="hospitalId" label="医院" disabled />
          )}
          <ProFormSelect
            width={352}
            name="deptId"
            label="科室"
            placeholder="请选择科室"
            rules={[{ required: true, message: '请选择科室!' }]}
            fieldProps={{
              showSearch: true,
              dropdownMatchSelectWidth: false,
            }}
            debounceTime={300}
            request={async () => {
              const data = await getDeptList();
              return data.map((item: any) => ({
                label: item.deptName,
                value: item.deptId,
              }));
            }}
          />
          <ProFormText width={352} name="deptDescription" label="挂牌科室" placeholder="请输入挂牌科室" />
          <ProFormText width={352} name="hospitalPosition" label="职务" placeholder="请输入职务" />
          <Form.Item name="workplacePhoto" label="工作证明" rules={[{ required: true, message: '请上传工作证明!' }]} extra="只支持.jpg/.png 格式">
            <Upload
              name="avatar"
              accept=".jpg,.png"
              listType="picture-card"
              className="avatar-uploader"
              fileList={imageUrl?.length > 0 ? imageUrl : []}
              maxCount={3}
              customRequest={handleUpload}
              onRemove={(file) => handleOnRemove(file.uid)}
              onPreview={(file) => handleOnPreview(file.uid)}
            >
              {imageUrl?.length === 3 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Row>
            <Col>
              <Form.Item label="设为首要执业点" name="isFirst" valuePropName="checked" labelCol={{ span: 18 }}>
                <Switch defaultChecked />
              </Form.Item>
            </Col>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Col>
              <Form.Item label="是否有效" name="isVerified" valuePropName="checked" labelCol={{ span: 16 }}>
                <Switch defaultChecked />
              </Form.Item>
            </Col>
          </Row>
        </ModalForm>
      </Space>
    );
  };

  const handelPracticeSiteData = (index: number, item: any) => {
    setPracticeSiteIndex(index);
    setpracticeSiteItem(item);
  };

  return (
    <Fragment>
      <Space>
        <DrawerForm
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>执业点</span>
              {handlePracticeSiteAddEdit('add')}
            </div>
          }
          width={680}
          trigger={
            btnFlag === 'list' ? (
              <a style={{ color: 'var(--color-primary)' }} onClick={() => queryGetDoctorWorkplace()}>
                {workplaceCount}
              </a>
            ) : (
              <Button style={{ padding: 0 }} type="link" icon={<EditOutlined />} onClick={() => queryGetDoctorWorkplace()}>
                编辑
              </Button>
            )
          }
          layout="horizontal"
          submitter={false}
        >
          <div style={{ display: 'flex' }}>
            <div style={{ width: 254, paddingRight: 14 }}>
              {practiceSite?.length > 0 ? (
                practiceSite?.map((item: any, index: number) => (
                  <div
                    className={`${practiceSiteIndex === index ? styles.wechatBorderItem : styles.wechatBorderActiveItem}`}
                    key={index}
                    onClick={() => handelPracticeSiteData(index, item)}
                  >
                    <div style={{ display: 'flex' }}>
                      {item.isFirst && <Tag color="success">{'首要'}</Tag>}
                      <Tooltip title={item.hospitalName}>
                        <div
                          style={{ width: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                          className={`${practiceSiteIndex === index ? 'font-w5 color-primary' : 'font-w5 color-text-45'}`}
                        >
                          {item.hospitalName}
                        </div>
                      </Tooltip>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ color: practiceSiteIndex === index ? 'var(--color-primary)' : 'var(--color-text-45)' }} className="font-12">
                        {item.doctorId}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            background: item.isVerified ? 'var(--color-success)' : 'var(--color-error)',
                            borderRadius: '50%',
                            marginRight: 4,
                          }}
                        ></div>
                        <div>{item.isVerified ? '有效' : '无效'}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Empty />
                </div>
              )}
            </div>
            <Divider type="vertical" style={{ height: 'calc(100vh - 116px)' }} />
            <div style={{ width: 384, paddingLeft: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, alignItems: 'center' }}>
                <div className="font-14 font-w5 color-text-85">详情</div>
                {handlePracticeSiteAddEdit('edit')}
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ minWidth: 70 }} className="text-r font-14 color-text-45">
                  省市区县：
                </div>
                <div className="color-text-88 font-14">{practiceSiteItem?.areaName}</div>
              </div>
              <div style={{ display: 'flex', margin: '12px 0' }}>
                <div style={{ minWidth: 70 }} className="text-r font-14 color-text-45 margin">
                  科室：
                </div>
                <div className="color-text-88 font-14">{practiceSiteItem?.deptName}</div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ minWidth: 70 }} className="text-r font-14 color-text-45">
                  挂牌科室：
                </div>
                <div className="color-text-88 font-14">{practiceSiteItem?.deptDescription}</div>
              </div>
              <div style={{ display: 'flex', margin: '12px 0' }}>
                <div style={{ minWidth: 70 }} className="text-r font-14 color-text-45">
                  职务：
                </div>
                <div className="color-text-88 font-14">{practiceSiteItem?.hospitalPosition}</div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ minWidth: 70 }} className="text-r font-14 color-text-45">
                  工作证明：
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {practiceSiteItem?.workplacePhotoUrl && (
                    <div className={`${styles.imgBox} padding6  border-r-8`}>
                      <Image height={82} width={116} src={practiceSiteItem?.workplacePhotoUrl} preview={{ src: practiceSiteItem?.workplacePhotoUrl }} />
                    </div>
                  )}
                  {practiceSiteItem?.workplacePhotoUrl2 && (
                    <div className={`${styles.imgBox} padding6  border-r-8 margin-left12`}>
                      <Image height={82} width={116} src={practiceSiteItem?.workplacePhotoUrl2} preview={{ src: practiceSiteItem?.workplacePhotoUrl2 }} />
                    </div>
                  )}
                  {practiceSiteItem?.workplacePhotoUrl3 && (
                    <div className={`${styles.imgBox} padding6  border-r-8 margin-top8`}>
                      <Image height={82} width={116} src={practiceSiteItem?.workplacePhotoUrl3} preview={{ src: practiceSiteItem?.workplacePhotoUrl3 }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DrawerForm>
      </Space>
      {imgPreview && <Image src={imgPreview} style={{ display: 'none' }} preview={{ visible, src: imgPreview, onVisibleChange: setVisible }}></Image>}
    </Fragment>
  );
};

export default PracticeSiteAddEdit;
