import { ExclamationCircleOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { App, Button, Image, Space, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useState } from 'react';
import styles from './index.less';

interface Props {
  value: string | undefined;
  onChange: (form: FormData) => Promise<void>;
  del?: () => void;
  height: number;
}

const UploadImageInline = (props: Props) => {
  const { value, onChange, del, height } = props;
  const { modal } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const upload = async (file: RcFile) => {
    if (!onChange) return;

    setLoading(true);
    const form = new FormData();
    form.append('file', file);
    await onChange(form).finally(() => setLoading(false));
    return false;
  };

  const delImage = () => {
    if (!del) return;

    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定要删除该数据？',
      onOk: del,
    });
  };

  const uploadButton = (
    <div className={styles.uploadButton} style={{ height: height }}>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>点击或拖拽上传</div>
    </div>
  );

  return (
    <>
      <div className={styles.uploadModal}>
        <Upload.Dragger disabled={!onChange} accept="image/*" showUploadList={false} beforeUpload={upload}>
          {value ? <img className={styles.img} width="100%" height={height} src={value} /> : uploadButton}
        </Upload.Dragger>

        <Space hidden={!value} style={{ paddingTop: '15px' }}>
          <Button hidden={!del} size="small" loading={loading} key="delete" type="primary" danger style={{ float: 'left' }} onClick={delImage}>
            删除
          </Button>
          <Button size="small" loading={loading} key="preview" type="primary" style={{ float: 'left' }} onClick={() => setVisible(true)}>
            预览
          </Button>
        </Space>
      </div>

      <Image hidden preview={{ visible, src: value, onVisibleChange: setVisible }} />
    </>
  );
};

export default UploadImageInline;
