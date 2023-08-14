// import wingwell from '@/assets/logo.png';
import { WingWellLogoBlack } from '@/constants';
import { goHomePage } from '@/services/UserController';
import { HeaderViewProps } from '@ant-design/pro-layout/es/components/Header';
import { useModel } from '@umijs/max';
import React from 'react';
import styles from './index.less';

const HeaderTitleComponent = (logo: React.ReactNode, title: React.ReactNode, props: HeaderViewProps) => {
  const { open, setOpen } = useModel('navigation');
  return (
    <div className={styles.headerTitle} onClick={(e) => e.preventDefault()}>
      <div className={styles.logo} onClick={() => setOpen(!open)}>
        {logo}
      </div>
      <img className={styles.title} src={WingWellLogoBlack} onClick={goHomePage} />
    </div>
  );
};

export default HeaderTitleComponent;
