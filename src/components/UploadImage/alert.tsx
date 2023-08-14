import DraggableModal from '@/components/DraggableModal';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { App, Image, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useState } from 'react';
import styles from './index.less';

interface Props {
  open: boolean;
  value: string | undefined;
  onCancel: () => void;
  onChange: (form: FormData) => Promise<void>;
  onDel?: () => void;
  width?: number;
  height?: number;
  title?: string;
}

const UploadImageAlert = (props: Props) => {
  const { message } = App.useApp();
  const { open, value, onCancel, onChange, onDel, width = 320, height = 320, title = '编辑' } = props;
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const upload = async (file: RcFile) => {
    if (!onChange) return;

    setLoading(true);
    const form = new FormData();
    form.append('file', file);
    await onChange(form).finally(() => setLoading(false));
    message.success('保存成功');
    return false;
  };

  const uploadButton = (
    <div className={styles.uploadButton} style={{ width, height }}>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>点击或拖拽上传</div>
    </div>
  );

  return (
    <DraggableModal
      destroyOnClose
      open={open}
      title={title}
      width={width + 50}
      className={styles.uploadModal}
      onCancel={onCancel}
      okText="预览"
      cancelText="关闭"
      okButtonProps={{ hidden: !value }}
      onOk={async () => setVisible(true)}
      onDel={onDel}
    >
      <Upload.Dragger accept="image/*" showUploadList={false} beforeUpload={upload}>
        {value ? <img className={styles.img} width={width} height={height} src={value} /> : uploadButton}
      </Upload.Dragger>

      <Image style={{ display: 'none' }} preview={{ visible, src: value, onVisibleChange: setVisible }} />
    </DraggableModal>
  );
};

export default UploadImageAlert;
