declare namespace Parameter {
  interface Options {
    key: string;
    text: string;
    sort: number;
  }

  interface ParaList {
    options: Options[];
    paraId: string;
    paraName: string;
    paraType: string;
    paraValue: string;
    remark: string;
  }

  interface GroupList {
    gropupName: string;
    paraList: ParaList[];
  }

  interface ParaSetting {
    campaignId: string;
    campaignType: string;
    groupList: GroupList[];
  }
}
