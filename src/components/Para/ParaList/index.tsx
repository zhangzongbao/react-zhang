import { ProForm, ProFormInstance } from '@ant-design/pro-components';
import { App, Empty } from 'antd';
import { useRef } from 'react';
import { SaveParaItem } from '../api';
import ParaItemComponent from '../ParaItem';
import styles from './index.less';

const ParaListComponent = (props: { list: Parameter.ParaSetting | undefined; width?: number }) => {
  const { list, width } = props;
  const { message, modal } = App.useApp();
  const formRef = useRef<ProFormInstance>();

  const save = async (para: Parameter.ParaList, e: any, err?: string) => {
    para.paraValue = e;

    if (err) {
      message.error(err);
      const newObj: any = {};
      newObj[para.paraId] = para.paraValue;
      formRef?.current?.setFieldsValue?.(newObj);
      return;
    }

    await SaveParaItem(para);
    message.success('修改成功');
  };

  return list?.groupList?.length ? (
    <ProForm layout="horizontal" formRef={formRef} submitter={false}>
      {list?.groupList.map((group) => (
        <div key={group.gropupName} className={styles.group}>
          {group.gropupName ? <div className={styles.title}>{group.gropupName}</div> : null}
          {group.paraList.map((para) => (
            <ParaItemComponent width={width} para={para} key={para.paraId} save={(e, err?: string) => save(para, e, err)} />
          ))}
        </div>
      ))}
    </ProForm>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  );
};

export default ParaListComponent;
