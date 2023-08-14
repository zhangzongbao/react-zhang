import { ProFormRadio, ProFormSwitch, ProFormText } from '@ant-design/pro-components';

interface Props {
  para: Parameter.ParaList;
  save: (e: any, err?: string) => void;
  width?: number;
}

const ParaItemComponent = (props: Props) => {
  const { para, save, width = 154 } = props;

  switch (para.paraType) {
    case 'BOOL':
      return (
        <ProFormSwitch
          label={<div style={{ width }}>{para.paraName}</div>}
          name={para.paraId}
          fieldProps={{
            onChange: (e) => save(e ? '1' : ''),
          }}
          initialValue={para.paraValue}
          addonAfter={<span className="color-text-45">{para.paraId}</span>}
        />
      );

    case 'RADIO':
      return (
        <ProFormRadio.Group
          label={<div style={{ width }}>{para.paraName}</div>}
          name={para.paraId}
          fieldProps={{
            onChange: (e) => save(e.target.value),
          }}
          options={para.options.map((item) => ({ label: item.text, value: item.key }))}
          initialValue={para.paraValue}
          addonAfter={<span className="color-text-45">{para.paraId}</span>}
        />
      );

    case 'URL':
      return (
        <ProFormText
          label={<div style={{ width }}>{para.paraName}</div>}
          name={para.paraId}
          fieldProps={{
            onBlur: async (e) => {
              if (e.target.value === para.paraValue) return;

              let reg = new RegExp('(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]');
              if (!e.target.value || reg.test(e.target.value)) {
                save(e.target.value);
              } else {
                save(para.paraValue, `${para.paraName}：不符合URL规范`);
              }
            },
          }}
          width={600}
          placeholder="https://"
          initialValue={para.paraValue}
          addonAfter={<span className="color-text-45">{para.paraId}</span>}
        />
      );

    case 'TEXT':
      return (
        <ProFormText
          label={<div style={{ width }}>{para.paraName}</div>}
          name={para.paraId}
          fieldProps={{
            onBlur: (e) => {
              if (e.target.value === para.paraValue) return;

              save(e.target.value);
            },
          }}
          width={600}
          placeholder="请输入"
          initialValue={para.paraValue}
          addonAfter={<span className="color-text-45">{para.paraId}</span>}
        />
      );

    default:
      return <div>{`${para.paraType} 该类型尚未实现`}</div>;
  }
};

export default ParaItemComponent;
