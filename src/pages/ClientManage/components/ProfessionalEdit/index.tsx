import { updateDoctorProfessional } from '@/pages/ClientManage/api';
import { EditOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormDatePicker, ProFormText } from '@ant-design/pro-components';
import { request, useSearchParams } from '@umijs/max';
import { Button, Col, Form, Image, message, Row, Space, Upload } from 'antd';
import dayjs from 'dayjs';
import { Fragment, useState } from 'react';

interface propsParams {
  specialtyInfo: any;
  queryGetDoctorProfessional: () => void;
}

const ProfessionalEdit = (props: propsParams) => {
  const { specialtyInfo, queryGetDoctorProfessional } = props;
  const [getParams, setParams] = useSearchParams();
  const [imageUrl, setImageUrl] = useState<any>([]);
  const [imageUrlCertified, setImageUrlCertified] = useState<any>([]);
  const [imgPreview, setImgPreview] = useState<string>();
  const [visible, setVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCertified, setLoadingCertified] = useState<boolean>(false);

  const handleOnRemove = (uid: string, key?: string) => {
    if (key === 'certified') {
      imageUrlCertified.splice(
        imageUrlCertified.findIndex((item: any) => item.uid === uid),
        1,
      );
      setImageUrl([...imageUrlCertified]);
    } else {
      imageUrl.splice(
        imageUrl.findIndex((item: any) => item.uid === uid),
        1,
      );
      setImageUrl([...imageUrl]);
    }
  };

  const handleOnPreview = (uid: string, key?: string) => {
    if (key === 'certified') {
      setImgPreview(imageUrlCertified.find((item: any) => item.uid === uid).url);
      setVisible(true);
    } else {
      setImgPreview(imageUrl.find((item: any) => item.uid === uid).url);
      setVisible(true);
    }
  };

  const handleUpload = (info: any, key?: string) => {
    if (key === 'certified') {
      setLoadingCertified(true);
    } else {
      setLoading(true);
    }
    let formData = new FormData();
    formData.append('file', info.file, 'file.png');
    request(`/api/xiaoai/client/uploadPic`, {
      method: 'POST',
      data: formData,
    }).then((res) => {
      if (key === 'certified') {
        setLoadingCertified(false);
      } else {
        setLoading(false);
      }
      if (key === 'certified') {
        setImageUrlCertified([
          ...imageUrlCertified,
          {
            uid: (Math.random() * 10).toFixed(4),
            name: 'image.png',
            status: 'done',
            url: res,
          },
        ]);
      } else {
        setImageUrl([
          ...imageUrl,
          {
            uid: (Math.random() * 10).toFixed(4),
            name: 'image.png',
            status: 'done',
            url: res,
          },
        ]);
      }
    });
  };

  const handleImg = () => {
    console.log(specialtyInfo, 'specialtyInfo---img图片赋值');
    let arr = [];
    let arrNew = [];

    if (specialtyInfo?.credentialPhotoUrl) {
      arr.push({
        uid: (Math.random() * 10).toFixed(4),
        name: 'image.png',
        status: 'done',
        url: specialtyInfo.credentialPhotoUrl,
      });
    }
    if (specialtyInfo?.credentialPhotoUrl2) {
      arr.push({
        uid: (Math.random() * 10).toFixed(4),
        name: 'image.png',
        status: 'done',
        url: specialtyInfo.credentialPhotoUrl2,
      });
    }
    if (specialtyInfo?.credentialPhotoUrl3) {
      arr.push({
        uid: (Math.random() * 10).toFixed(4),
        name: 'image.png',
        status: 'done',
        url: specialtyInfo.credentialPhotoUrl3,
      });
    }
    setImageUrl([...arr]);
    if (specialtyInfo?.licensePhotoUrl) {
      arrNew.push({
        uid: (Math.random() * 10).toFixed(4),
        name: 'image.png',
        status: 'done',
        url: specialtyInfo.licensePhotoUrl,
      });
    }
    if (specialtyInfo?.licensePhotoUrl2) {
      arrNew.push({
        uid: (Math.random() * 10).toFixed(4),
        name: 'image.png',
        status: 'done',
        url: specialtyInfo.licensePhotoUrl2,
      });
    }
    if (specialtyInfo?.licensePhotoUrl3) {
      arrNew.push({
        uid: (Math.random() * 10).toFixed(4),
        name: 'image.png',
        status: 'done',
        url: specialtyInfo.licensePhotoUrl3,
      });
    }
    setImageUrlCertified([...arrNew]);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传照片</div>
    </div>
  );
  const uploadButtonCertified = (
    <div>
      {loadingCertified ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传照片</div>
    </div>
  );

  return (
    <Fragment>
      <Space>
        <ModalForm
          width={960}
          title="编辑专业信息"
          trigger={
            <Button style={{ padding: 0 }} type="link" onClick={handleImg} icon={<EditOutlined />}>
              编辑
            </Button>
          }
          layout="horizontal"
          colon={false}
          modalProps={{
            destroyOnClose: true,
            onCancel: () => {
              setImageUrl([]);
              setImageUrlCertified([]);
            },
          }}
          initialValues={{
            indentityCode: specialtyInfo?.indentityCode,
            credentialCode: specialtyInfo?.credentialCode,
            credentialIssueDate: specialtyInfo?.credentialIssueDate ? dayjs(specialtyInfo?.credentialIssueDate, 'YYYY-MM-DD') : null,
            credentialIssueAgency: specialtyInfo?.credentialIssueAgency,
            licenseCode: specialtyInfo?.licenseCode,
            licenseIssueDate: specialtyInfo?.licenseIssueDate ? dayjs(specialtyInfo?.licenseIssueDate, 'YYYY-MM-DD') : null,
            licenseIssueAgency: specialtyInfo?.licenseIssueAgency,
            licenseScope: specialtyInfo?.licenseScope,
            licenseSite: specialtyInfo?.licenseSite,
            licenseType: specialtyInfo?.licenseType,
            fileListCertified: imageUrlCertified,
            fileList: imageUrl,
          }}
          onFinish={async (values) => {
            let obj: ClientManage.UpdateDoctorProfessional = {
              indentityCode: values.indentityCode || '',
              credentialCode: values.credentialCode || '',
              credentialPhotoUrl: imageUrl[0]?.url || '',
              credentialPhotoUrl2: imageUrl[1]?.url || '',
              credentialPhotoUrl3: imageUrl[2]?.url || '',
              credentialIssueDate: dayjs(values.credentialIssueDate).format('YYYY-MM-DD') || '',
              credentialIssueAgency: values.credentialIssueAgency || '',
              licenseCode: values.licenseCode || '',
              licenseIssueDate: dayjs(values.licenseIssueDate).format('YYYY-MM-DD') || '',
              licenseIssueAgency: values.licenseIssueAgency || '',
              licenseScope: values.licenseScope || '',
              licenseSite: values.licenseSite || '',
              licenseType: values.licenseType || '',
              licensePhotoUrl: imageUrlCertified[0]?.url || '',
              licensePhotoUrl2: imageUrlCertified[1]?.url || '',
              licensePhotoUrl3: imageUrlCertified[2]?.url || '',
              doctorId: getParams.get('doctorId'),
            };
            const res = await updateDoctorProfessional(obj);
            if (res) {
              message.success('修改成功');
              queryGetDoctorProfessional();
              setImageUrl([]);
              setImageUrlCertified([]);
            }
            return true;
          }}
        >
          <ProFormText
            name="indentityCode"
            label="身份证号"
            placeholder="请输入身份证号"
            rules={[
              {
                pattern:
                  /(^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$)/,
                message: '身份证号格式错误！',
              },
            ]}
          />
          <Row>
            <Col span={12}>
              <Col>
                <Form.Item label={<div className="color-error font-w5">资格证书</div>}></Form.Item>
              </Col>
              <Col>
                <ProFormText
                  width={352}
                  name="credentialCode"
                  label="证书编码"
                  placeholder="请输证书编码"
                  // rules={[{ pattern: /^\d{24}$|^\d{27}$/, message: '医师资格证书编码格式错误！' }]}
                />
                <ProFormDatePicker width={352} name="credentialIssueDate" label="发证日期" placeholder="请输发证日期" />
                <ProFormText width={352} name="credentialIssueAgency" label="签发机关" placeholder="请输签发机关" />
                <Form.Item name="fileList" label="证书照片" extra="只支持.jpg/.png 格式">
                  <Upload
                    name="avatar"
                    accept=".jpg,.png"
                    listType="picture-card"
                    className="avatar-uploader"
                    fileList={imageUrl?.length > 0 ? imageUrl : []}
                    maxCount={3}
                    customRequest={(info) => handleUpload(info)}
                    onRemove={(file) => handleOnRemove(file.uid)}
                    onPreview={(file) => handleOnPreview(file.uid)}
                  >
                    {imageUrl?.length === 3 ? null : uploadButton}
                  </Upload>
                </Form.Item>
              </Col>
            </Col>
            <Col span={12}>
              <Col>
                <Form.Item label={<div className="color-success font-w5">执业证书</div>}></Form.Item>
              </Col>
              <Col>
                <ProFormText
                  width={352}
                  name="licenseCode"
                  label="证书编码"
                  placeholder="请输证书编码"
                  // rules={[{ pattern: /^\d{15}$/, message: '医师执业证书编码格式错误！' }]}
                />
                <ProFormDatePicker width={352} name="licenseIssueDate" label="发证日期" placeholder="请输发证日期" />
                <ProFormText width={352} name="licenseIssueAgency" label="签发机关" placeholder="请输签发机关" />
                <ProFormText width={352} name="licenseType" label="执业类别" placeholder="请输执业类别" />
                <ProFormText width={352} name="licenseScope" label="执业范围" placeholder="请输执业范围" />
                <ProFormText width={352} name="licenseSite" label="执业地点" placeholder="请输执业地点" />
                <Form.Item name="fileListCertified" label="证书照片" extra="只支持.jpg/.png 格式">
                  <Upload
                    name="avatar"
                    accept=".jpg,.png"
                    listType="picture-card"
                    className="avatar-uploader"
                    fileList={imageUrlCertified?.length > 0 ? imageUrlCertified : []}
                    maxCount={3}
                    customRequest={(info) => handleUpload(info, 'certified')}
                    onRemove={(file) => handleOnRemove(file.uid, 'certified')}
                    onPreview={(file) => handleOnPreview(file.uid, 'certified')}
                  >
                    {imageUrlCertified?.length === 3 ? null : uploadButtonCertified}
                  </Upload>
                </Form.Item>
              </Col>
            </Col>
          </Row>
        </ModalForm>
      </Space>
      {imgPreview && <Image src={imgPreview} style={{ display: 'none' }} preview={{ visible, src: imgPreview, onVisibleChange: setVisible }}></Image>}
    </Fragment>
  );
};

export default ProfessionalEdit;
