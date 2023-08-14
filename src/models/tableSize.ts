// 设置全部表格的大小
import { SizeType } from '@ant-design/pro-form/lib/BaseForm';
import { useEffect, useState } from 'react';

const TableSize = () => {
  const [tableSize, setTableSize] = useState<SizeType>('small');

  const changeTableSize = (size: any) => {
    if (size === tableSize) return;

    const result = ['large', 'middle', 'small'].includes(size) ? size : 'small';
    setTableSize(result);
    localStorage.setItem('tableSize', result);
  };

  useEffect(() => {
    changeTableSize(localStorage.getItem('tableSize'));
  }, []);

  return { tableSize, changeTableSize };
};

export default TableSize;
