import dayjs from 'dayjs';

export default {
  // 本地模拟登录
  'POST api/basic/WebAppLogin/ByPassword': (req: any, res: any) => {
    setTimeout(() => {
      res.json({
        data: {
          showHomeKpi: true,
          siteList: [
            {
              pageIds: [],
              siteId: 'WingWell.Platform.WebSite',
              siteName: '小爱中心',
              sort: 8007,
              systemId: 'Platform',
            },
            {
              pageIds: [],
              siteId: 'WingWell.XiaoAi.WebSite',
              siteName: '小爱中心',
              sort: 8011,
              systemId: 'XiaoAi',
            },
          ],
          token: {
            value: 'aa21229122104228b3c496d79b98abf5',
            expireTime: dayjs().unix() + 259200,
          },
          user: {
            avatarUrl: 'https://data.oss.wingwell.cloud/516f/20220918060403/vj9oum8jhh0k?x-oss-process=style/avatar',
            gender: '',
            isDeveloper: true,
            mobile: '17621752886',
            nickName: '黄小梦',
            unionId: 'oK_8h6fyfu_0ik8atkS0',
            userAccount: 'luke',
            userId: 'B484D5F5E3884981BDBE55CAA930FD4F',
            userName: '陆维',
            repId: 'RP29AGH5',
          },
          userId: 'B484D5F5E3884981BDBE55CAA930FD4F',
        },
        status: 1,
      });
    }, 300);
  },
};
