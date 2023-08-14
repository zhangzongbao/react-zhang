/**
 * 封装了 原生的onOk 加了菊花 所以 传入的函数必定是一个promise
 */

import { Button, Modal } from 'antd';
import { ButtonProps } from 'antd/es/button/button';
import { ModalProps } from 'antd/es/modal/Modal';
import { useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

interface Props extends Omit<ModalProps, 'footer'> {
  onOk?: () => Promise<any>;
  footer?: JSX.Element[] | ((dom: JSX.Element[]) => JSX.Element[]) | null;
  onDel?: () => void;
  delButtonProps?: ButtonProps;
  delText?: string;
}

const DraggableModal = (props: Props) => {
  const {
    children,
    title,
    onCancel,
    cancelButtonProps,
    cancelText = '取消',
    onOk,
    okButtonProps,
    okType = 'primary',
    okText = '保存',
    onDel,
    delButtonProps,
    delText = '删除',
    footer,
    ...others
  } = props;
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggleRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const save = async () => {
    setLoading(true);
    onOk?.().finally(() => setLoading(false));
  };

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const footerDom = [
    <Button hidden={!onDel} key="del" className="float-l" onClick={onDel} type="primary" danger {...delButtonProps}>
      {delText}
    </Button>,
    <Button key="cancel" onClick={(e: any) => onCancel?.(e)} {...cancelButtonProps}>
      {cancelText}
    </Button>,
    <Button key="save" loading={loading} type={okType as any} {...okButtonProps} onClick={save}>
      {okText}
    </Button>,
  ];

  return (
    <Modal
      {...others}
      onCancel={onCancel}
      title={
        <div
          style={{ cursor: 'move' }}
          onMouseOver={() => disabled && setDisabled(false)}
          onMouseOut={() => setDisabled(true)}
          onFocus={() => {}}
          onBlur={() => {}}
        >
          {title}
        </div>
      }
      footer={typeof footer === 'function' ? footer(footerDom) : footer === null ? null : footer || footerDom}
      modalRender={(modal) => (
        <Draggable disabled={disabled} bounds={bounds} onStart={(event, uiData) => onStart(event, uiData)}>
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
    >
      {children}
    </Modal>
  );
};

export default DraggableModal;
