import { CreateSitePageQuickLink, RemoveQuickLink } from '@/components/MenuItem/api';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Link, useModel } from '@umijs/max';
import { message } from 'antd';
import React from 'react';
import styles from './index.less';

const MenuItemComponent = (props: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { quickLinkList, initQuickLinkList } = useModel('quickLinkList');
  const { itemProps, defaultDom } = props;

  const changeQuickLink = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, pageId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const result = quickLinkList.find((link) => link.linkType === 'WingWell.XiaoAi.WebApp' && link.linkCode === pageId);
    if (result) {
      await RemoveQuickLink(result.linkId);
      messageApi.success('已从快速访问中移除');
    } else {
      await CreateSitePageQuickLink(pageId);
      messageApi.success('已添加快速访问');
    }

    initQuickLinkList();
  };

  return (
    <>
      {contextHolder}

      <div className={styles.item}>
        <Link to={itemProps.title || itemProps.path}>{defaultDom}</Link>

        {itemProps.access && !itemProps.path.includes('/project-center/') ? (
          quickLinkList.some((link) => link.linkType === 'WingWell.XiaoAi.WebApp' && link.linkCode === itemProps.access) ? (
            <StarFilled className={styles.favorite} onClick={(e) => changeQuickLink(e, itemProps.access)} />
          ) : (
            <StarOutlined className={`${styles.favorite} ${styles.unActive}`} onClick={(e) => changeQuickLink(e, itemProps.access)} />
          )
        ) : null}
      </div>
    </>
  );
};

export default MenuItemComponent;
