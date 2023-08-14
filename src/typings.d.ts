declare namespace Home {
  type site = {
    pageIds: string[];
    siteId: string;
    siteName: string;
    sort: number;
    systemId: string;
  };

  interface login_res {
    showHomeKpi: boolean;
    siteList: site[];
    token: {
      expireTime: number;
      value: string;
    };
    user: {
      avatarUrl: string;
      gender: string;
      isDeveloper: boolean;
      mobile: string;
      nickName: string;
      unionId: string;
      userAccount: string;
      userId: string;
      userName: string;
      repId: string;
    };
    userId: string;
  }
}
