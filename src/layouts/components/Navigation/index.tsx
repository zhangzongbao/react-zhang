// import logoWhite from '@/assets/logo-white.png';
import { RemoveQuickLink } from '@/components/MenuItem/api';
import { CampaignLogoUrl, WingWellLogoWhite } from '@/constants';
import { clearUserDetail, goHomePage } from '@/services/UserController';
import { AppstoreAddOutlined, CloseOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { useAsyncEffect } from 'ahooks';
import { App, Avatar, Col, Empty, Image, Input, Popconfirm, Row, Space, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import QuickLinkSortComponent from '../QuickLinkSort';
import { CreateCampaignQuickLink, CreateProjectQuickLink, GetFunctionPanelData } from './api';
import styles from './index.less';

const NavigationComponent = () => {
  const { open, setOpen } = useModel('navigation');
  const { message } = App.useApp();
  const { initialState, setInitialState } = useModel('@@initialState');
  const [showPanelData, setShowPanelData] = useState(false);
  const [panelData, setPanelData] = useState<Navigation.PanelData>();
  const { quickLinkList, initQuickLinkList } = useModel('quickLinkList');

  useAsyncEffect(async () => setPanelData(await GetFunctionPanelData()), []);

  const logout = () => {
    clearUserDetail();
    goHomePage();
  };

  const changeProjectQuickLink = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, projectId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const result = quickLinkList.find((link) => link.linkType === 'Project' && link.linkCode === projectId);
    if (result) {
      await RemoveQuickLink(result.linkId);
      message.success('已从快速访问中移除');
    } else {
      await CreateProjectQuickLink(projectId);
      message.success('已添加快速访问');
    }

    initQuickLinkList();
  };

  const changeCampaignQuickLink = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, projectId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const result = quickLinkList.find((link) => link.linkType === 'Campaign' && link.linkCode === projectId);
    if (result) {
      await RemoveQuickLink(result.linkId);
      message.success('已从快速访问中移除');
    } else {
      await CreateCampaignQuickLink(projectId);
      message.success('已添加快速访问');
    }

    initQuickLinkList();
  };

  return (
    <div hidden={!open} className={styles.navigation} onClick={() => setOpen(!open)}>
      <div className={styles.header} onClick={(e) => e.stopPropagation()}>
        <div className={styles.menus}>
          <a href={location.origin}>
            <Image src={WingWellLogoWhite} preview={false} width={152} height={96} />
          </a>
          <Space size={28}>
            {initialState?.siteList.map((site: Navigation.site) => (
              <a key={site.siteId} className={styles.siteName} href={`/${site.systemId.toLowerCase()}`}>
                {site.siteName}
              </a>
            ))}
            <AppstoreAddOutlined
              onClick={() => setShowPanelData(!showPanelData)}
              className={showPanelData ? `${styles.siteName} ${styles.active}` : styles.siteName}
              style={{ fontSize: 18, padding: 6 }}
            />
            <div>
              <span className={styles.nickName}>{initialState?.user.nickName || initialState?.user.userName}</span>
              <Tooltip
                destroyTooltipOnHide
                title={
                  <>
                    <Space size={8}>
                      <Avatar alt="A" shape="square" size={48} src={initialState?.user.avatarUrl} />
                      <div>
                        <div className="font-16 font-w5 color-text-65">
                          {initialState?.user.userName} <span className="font-12 color-text-45">{initialState?.user.nickName}</span>
                        </div>
                        <div className="color-text-65 margin-top4">{initialState?.user.mobile}</div>
                      </div>
                    </Space>
                    <div className="margin-top10 font-12 color-text-45">{initialState?.user.unionId || '-'}</div>
                    <div className="margin-top2 font-12 color-text-45">{initialState?.user.userId || '-'}</div>
                    <div className="margin-top2 font-12 color-text-45">{initialState?.user.repId || '-'}</div>
                    <div className="text-r margin-top2">
                      <Space>
                        <a className={styles.action} onClick={() => alert('如需修改密码，请联系管理员')}>
                          修改密码
                        </a>
                        <Popconfirm zIndex={1100} title="您确定要退出登录么？" onConfirm={logout} placement="topRight">
                          <a className={styles.action}>退出登录</a>
                        </Popconfirm>
                      </Space>
                    </div>
                  </>
                }
                color="var(--color-white"
                placement="bottomRight"
              >
                <Avatar style={{ cursor: 'pointer' }} alt="A" size={36} src={initialState?.user.avatarUrl} />
              </Tooltip>
            </div>
          </Space>
        </div>

        <div style={{ margin: '24px auto 36px', width: 800 }}>
          <Input.Search
            size="large"
            allowClear
            onSearch={(q) => {
              if (q.replace(/\s/g, '')) window.open(`/search?q=${q.trim()}`, '_blank');
            }}
          />
        </div>

        {quickLinkList?.length ? (
          <>
            <div className={styles.quickAccess}>
              <span className="margin-right4">快速访问</span>
              <QuickLinkSortComponent />
            </div>

            <Space wrap size={[10, 10]}>
              {quickLinkList.map((item) => (
                <Tooltip title={item.linkType} key={item.linkId} placement="bottom">
                  <a className={styles.quickLink} href={item.linkUrl}>
                    {item.linkName}
                  </a>
                </Tooltip>
              ))}
            </Space>
          </>
        ) : null}
      </div>

      <div className={styles.panelData} hidden={!showPanelData} onClick={(e) => e.stopPropagation()}>
        <div className={styles.box}>
          <div className={styles.title}>项目</div>
          {panelData?.projectList.length ? (
            <Row className={styles.list} gutter={[16, 16]} wrap>
              {panelData?.projectList.map((item) => (
                <Col span={6} key={item.projectId}>
                  <a className={styles.item} href={`/platform/project-center/project-info/${item.projectId}`}>
                    <Avatar alt="项" shape="square" className={styles.logo} src={item.logoUrl} />
                    <div className={styles.container}>
                      <div className={styles.name}>
                        <Typography.Text ellipsis>{item.projectName}</Typography.Text>
                      </div>
                      <div className={styles.id}>{item.projectId}</div>
                    </div>
                    {quickLinkList.some((link) => link.linkType === 'Project' && link.linkCode === item.projectId) ? (
                      <StarFilled className={styles.favorite} onClick={(e) => changeProjectQuickLink(e, item.projectId)} />
                    ) : (
                      <StarOutlined className={`${styles.favorite} ${styles.unActive}`} onClick={(e) => changeProjectQuickLink(e, item.projectId)} />
                    )}
                  </a>
                </Col>
              ))}
            </Row>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
          <div className={styles.title}>任务</div>
          {panelData?.campaignList.length ? (
            <Row className={styles.list} gutter={[16, 16]} wrap>
              {panelData?.campaignList.map((item) => (
                <Col span={6} key={item.campaignId}>
                  <a className={styles.item} href={item.campaignPath}>
                    <Avatar alt="任" shape="square" className={styles.logo} src={item.logoUrl || CampaignLogoUrl} />
                    <div className={styles.container}>
                      <div className={styles.name}>
                        <Typography.Text ellipsis>
                          {item.campaignName} <span className={styles.id}>{item.campaignId}</span>
                        </Typography.Text>
                      </div>
                      <Typography.Text ellipsis>
                        <span className={styles.id}>{item.projectName}</span>
                      </Typography.Text>
                    </div>
                    {quickLinkList.some((link) => link.linkType === 'Campaign' && link.linkCode === item.campaignId) ? (
                      <StarFilled className={styles.favorite} onClick={(e) => changeCampaignQuickLink(e, item.campaignId)} />
                    ) : (
                      <StarOutlined className={`${styles.favorite} ${styles.unActive}`} onClick={(e) => changeCampaignQuickLink(e, item.campaignId)} />
                    )}
                  </a>
                </Col>
              ))}
            </Row>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}

          <CloseOutlined className={styles.close} onClick={() => setShowPanelData(false)} />
        </div>

        <div className={styles.mask} onClick={() => setShowPanelData(false)} />
      </div>
    </div>
  );
};

export default NavigationComponent;
