import { useEffect, useState } from 'react';

const PaginationSize = () => {
  const [paginationSize, setPaginationSize] = useState<number>(10);

  const changePaginationSize = (size: any) => {
    if (size === paginationSize) return;
    console.log(size, 'size');
    const result = Number(size) || 10;
    setPaginationSize(result);
    localStorage.setItem('paginationSize', String(result));
  };

  useEffect(() => {
    changePaginationSize(localStorage.getItem('paginationSize'));
  }, []);

  return { paginationSize, changePaginationSize };
};

export default PaginationSize;
